// ============================================
// Scaling Under Load Simulator
// Chapter 5: Cloud Computing, Scaling, and Infrastructure
// ============================================

// --- Configuration ---
var CANVAS_H = 380;
var REQUEST_COLORS = [
    [70, 180, 200],   // teal
    [100, 160, 220],  // light blue
    [130, 190, 180],  // sea green
    [90, 170, 210]    // sky
];

// Traffic levels: req/s at each slider position (1-10)
var TRAFFIC_LEVELS = [100, 500, 1000, 2500, 5000, 10000, 20000, 30000, 40000, 50000];
var TRAFFIC_LABELS = ['100', '500', '1K', '2.5K', '5K', '10K', '20K', '30K', '40K', '50K'];

// Vertical scaling: server gets bigger, eventually maxes out
var V_CONFIGS = [
    { cpu: 2,  ram: 8,   cost: 100,  lat: 30,   capPct: 10 },
    { cpu: 4,  ram: 16,  cost: 200,  lat: 45,   capPct: 20 },
    { cpu: 8,  ram: 32,  cost: 450,  lat: 65,   capPct: 35 },
    { cpu: 16, ram: 64,  cost: 900,  lat: 90,   capPct: 50 },
    { cpu: 32, ram: 128, cost: 1800, lat: 140,  capPct: 65 },
    { cpu: 64, ram: 256, cost: 3500, lat: 220,  capPct: 80 },
    { cpu: 96, ram: 384, cost: 5500, lat: 450,  capPct: 92 },
    { cpu: 96, ram: 384, cost: 5500, lat: 1200, capPct: 100 },
    { cpu: 96, ram: 384, cost: 5500, lat: 5000, capPct: 100 },
    { cpu: 96, ram: 384, cost: 5500, lat: 9999, capPct: 100 }
];

// Horizontal scaling: add more servers
var H_CONFIGS = [
    { count: 1,  cost: 150,  lat: 35,  capPct: 15 },
    { count: 2,  cost: 300,  lat: 38,  capPct: 20 },
    { count: 3,  cost: 450,  lat: 40,  capPct: 28 },
    { count: 4,  cost: 600,  lat: 42,  capPct: 35 },
    { count: 5,  cost: 750,  lat: 44,  capPct: 42 },
    { count: 7,  cost: 1050, lat: 46,  capPct: 50 },
    { count: 10, cost: 1500, lat: 50,  capPct: 58 },
    { count: 14, cost: 2100, lat: 54,  capPct: 65 },
    { count: 18, cost: 2700, lat: 58,  capPct: 72 },
    { count: 24, cost: 3600, lat: 62,  capPct: 78 }
];

// --- State ---
var strategy = 'vertical';
var trafficLevel = 0;
var requests = [];
var spawnTimer = 0;
var servers = [];
var animServerW = 80;
var animServerH = 60;
var targetServerW = 80;
var targetServerH = 60;
var serverColor = [245, 158, 11];
var targetServerColor = [245, 158, 11];
var overloaded = false;
var droppedRequests = [];

// --- p5.js ---

function setup() {
    var container = document.getElementById('canvas-container');
    var canvas = createCanvas(container.offsetWidth, CANVAS_H);
    canvas.parent('canvas-container');
    textFont('Segoe UI, system-ui, sans-serif');

    document.getElementById('traffic-slider').addEventListener('input', onTrafficChange);
    onTrafficChange();
    initServers();
}

function windowResized() {
    var container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, CANVAS_H);
}

// --- Controls ---

function setStrategy(s) {
    strategy = s;
    document.getElementById('btn-vertical').classList.toggle('active', s === 'vertical');
    document.getElementById('btn-horizontal').classList.toggle('active', s === 'horizontal');
    requests = [];
    droppedRequests = [];
    initServers();
    updateMetrics();
}

function onTrafficChange() {
    var slider = document.getElementById('traffic-slider');
    trafficLevel = parseInt(slider.value) - 1;
    document.getElementById('traffic-value').textContent = TRAFFIC_LABELS[trafficLevel] + ' req/s';
    initServers();
    updateMetrics();
}

function initServers() {
    servers = [];
    if (strategy === 'vertical') {
        servers.push({ x: 0, y: 0, load: 0 });
    } else {
        var count = H_CONFIGS[trafficLevel].count;
        for (var i = 0; i < count; i++) {
            servers.push({ x: 0, y: 0, load: 0 });
        }
    }
}

// --- Metrics ---

function updateMetrics() {
    var conf = strategy === 'vertical' ? V_CONFIGS[trafficLevel] : H_CONFIGS[trafficLevel];

    // Latency
    var latEl = document.getElementById('metric-latency');
    if (strategy === 'vertical' && trafficLevel >= 8) {
        latEl.textContent = 'TIMEOUT';
        latEl.className = 'metric-value danger';
    } else if (strategy === 'vertical' && trafficLevel >= 7) {
        latEl.textContent = conf.lat + ' ms';
        latEl.className = 'metric-value danger';
    } else if (conf.lat > 200) {
        latEl.textContent = conf.lat + ' ms';
        latEl.className = 'metric-value warning';
    } else {
        latEl.textContent = conf.lat + ' ms';
        latEl.className = 'metric-value';
    }

    // Cost
    var costEl = document.getElementById('metric-cost');
    costEl.textContent = '$' + conf.cost.toLocaleString();
    if (strategy === 'vertical' && trafficLevel >= 5) {
        costEl.className = 'metric-value warning';
    } else {
        costEl.className = 'metric-value';
    }

    // Risk
    var riskEl = document.getElementById('metric-risk');
    if (strategy === 'vertical') {
        riskEl.textContent = 'Single point';
        riskEl.className = 'metric-value danger';
    } else {
        var count = H_CONFIGS[trafficLevel].count;
        riskEl.textContent = count + ' nodes';
        riskEl.className = 'metric-value good';
    }

    // Capacity
    var capEl = document.getElementById('metric-capacity');
    capEl.textContent = conf.capPct + '%';
    if (conf.capPct >= 95) {
        capEl.className = 'metric-value danger';
    } else if (conf.capPct >= 75) {
        capEl.className = 'metric-value warning';
    } else {
        capEl.className = 'metric-value';
    }

    overloaded = (strategy === 'vertical' && trafficLevel >= 7);
    updateInsight();
}

function updateInsight() {
    var el = document.getElementById('insight-text');
    var load = TRAFFIC_LABELS[trafficLevel];

    if (strategy === 'vertical') {
        if (trafficLevel <= 2) {
            el.textContent = 'At ' + load + ' requests/second, vertical scaling works well. A single server handles the load comfortably with low latency. This is the simplest and most cost-effective approach for moderate traffic. No distributed systems complexity, no load balancer needed.';
        } else if (trafficLevel <= 4) {
            el.textContent = 'At ' + load + ' requests/second, you are upgrading to a larger server (' + V_CONFIGS[trafficLevel].cpu + ' CPUs, ' + V_CONFIGS[trafficLevel].ram + ' GB RAM). Cost is growing non-linearly \u2014 doubling capacity costs more than double the price. The single point of failure is a growing risk at this traffic level.';
        } else if (trafficLevel <= 6) {
            el.textContent = 'At ' + load + ' requests/second, you are approaching the hardware ceiling. The server has ' + V_CONFIGS[trafficLevel].cpu + ' CPUs and ' + V_CONFIGS[trafficLevel].ram + ' GB RAM \u2014 near the maximum available. Response times are degrading significantly. A single machine simply cannot add more CPU or RAM beyond physical limits. This is when teams should plan migration to horizontal scaling.';
        } else {
            el.textContent = 'At ' + load + ' requests/second, vertical scaling has failed. The server is at maximum hardware capacity and cannot handle the load. Requests are being dropped, response times are unacceptable, and a single server failure takes down everything. This demonstrates the fundamental limitation of vertical scaling: there is a hard ceiling to how powerful one machine can be.';
        }
    } else {
        if (trafficLevel <= 2) {
            el.textContent = 'At ' + load + ' requests/second, horizontal scaling uses ' + H_CONFIGS[trafficLevel].count + ' server(s) behind a load balancer. The added infrastructure cost ($' + H_CONFIGS[trafficLevel].cost + '/month vs. $' + V_CONFIGS[trafficLevel].cost + '/month for vertical) buys you redundancy \u2014 if one server fails, others continue serving traffic.';
        } else if (trafficLevel <= 6) {
            el.textContent = 'At ' + load + ' requests/second, the load balancer distributes traffic across ' + H_CONFIGS[trafficLevel].count + ' servers. Response time stays low (' + H_CONFIGS[trafficLevel].lat + ' ms) because each server handles only a fraction of the total load. New servers are added automatically as traffic grows. Compare this to vertical scaling where latency would be ' + V_CONFIGS[trafficLevel].lat + ' ms with a single overworked machine.';
        } else {
            el.textContent = 'At ' + load + ' requests/second, horizontal scaling runs ' + H_CONFIGS[trafficLevel].count + ' servers and keeps response time at just ' + H_CONFIGS[trafficLevel].lat + ' ms. Vertical scaling would be at $' + V_CONFIGS[trafficLevel].cost.toLocaleString() + '/month with ' + (V_CONFIGS[trafficLevel].lat >= 9999 ? 'timeouts' : V_CONFIGS[trafficLevel].lat + ' ms latency') + '. Horizontal scaling costs $' + H_CONFIGS[trafficLevel].cost.toLocaleString() + '/month \u2014 and can keep adding servers indefinitely. This is why virtually all large-scale web applications use horizontal scaling.';
        }
    }
}

// --- Drawing ---

function draw() {
    background(245, 247, 250);

    // Spawn requests
    var spawnRate = map(trafficLevel, 0, 9, 0.3, 4);
    spawnTimer += spawnRate;
    while (spawnTimer >= 1) {
        spawnRequest();
        spawnTimer -= 1;
    }

    // Update and draw
    updateRequests();
    drawServerArea();
    drawRequests();
    drawDroppedRequests();
    drawLabels();
}

function spawnRequest() {
    var colorIdx = Math.floor(Math.random() * REQUEST_COLORS.length);
    requests.push({
        x: 40 + Math.random() * 20,
        y: CANVAS_H / 2 + (Math.random() - 0.5) * 80,
        targetX: 0,
        targetY: 0,
        phase: 'traveling', // traveling -> processing -> done
        speed: 2 + Math.random() * 1.5,
        color: REQUEST_COLORS[colorIdx],
        size: 6,
        serverIdx: 0,
        processTimer: 0,
        opacity: 255
    });
}

function updateRequests() {
    var serverZoneX = getServerZoneX();

    for (var i = requests.length - 1; i >= 0; i--) {
        var r = requests[i];

        if (r.phase === 'traveling') {
            // Assign a target server
            if (strategy === 'vertical') {
                r.serverIdx = 0;
                r.targetX = serverZoneX;
                r.targetY = CANVAS_H / 2;
            } else {
                if (r.serverIdx === 0 && servers.length > 1) {
                    // Round-robin assignment
                    var minLoad = Infinity;
                    var minIdx = 0;
                    for (var s = 0; s < servers.length; s++) {
                        if (servers[s].load < minLoad) {
                            minLoad = servers[s].load;
                            minIdx = s;
                        }
                    }
                    r.serverIdx = minIdx;
                }
                r.targetX = serverZoneX;
                r.targetY = getServerY(r.serverIdx);
            }

            // Move toward server
            r.x += r.speed;

            // Adjust y toward target
            var dy = r.targetY - r.y;
            r.y += dy * 0.05;

            // Reached server zone?
            if (r.x >= r.targetX - 10) {
                if (overloaded && Math.random() < 0.4) {
                    // Drop request
                    droppedRequests.push({
                        x: r.x, y: r.y,
                        opacity: 255,
                        vy: -1 - Math.random() * 2
                    });
                    requests.splice(i, 1);
                    continue;
                }
                r.phase = 'processing';
                r.processTimer = 20 + Math.random() * 20;
                if (r.serverIdx < servers.length) {
                    servers[r.serverIdx].load++;
                }
            }
        } else if (r.phase === 'processing') {
            r.processTimer--;
            r.x = r.targetX;
            if (r.processTimer <= 0) {
                r.phase = 'done';
                if (r.serverIdx < servers.length) {
                    servers[r.serverIdx].load = Math.max(0, servers[r.serverIdx].load - 1);
                }
            }
        } else if (r.phase === 'done') {
            r.x += r.speed * 1.5;
            r.opacity -= 8;
            if (r.opacity <= 0 || r.x > width + 20) {
                requests.splice(i, 1);
            }
        }
    }

    // Cap max requests to prevent slowdown
    if (requests.length > 200) {
        requests.splice(0, requests.length - 200);
    }
}

function drawRequests() {
    noStroke();
    for (var i = 0; i < requests.length; i++) {
        var r = requests[i];
        var c = r.color;
        if (r.phase === 'processing') {
            // Pulse effect
            var pulse = sin(frameCount * 0.2 + i) * 0.3 + 0.7;
            fill(c[0], c[1], c[2], r.opacity * pulse);
            circle(r.x, r.y, r.size + 2);
        } else {
            fill(c[0], c[1], c[2], r.opacity);
            circle(r.x, r.y, r.size);
        }
    }
}

function drawDroppedRequests() {
    noStroke();
    for (var i = droppedRequests.length - 1; i >= 0; i--) {
        var d = droppedRequests[i];
        d.y += d.vy;
        d.opacity -= 5;
        fill(239, 68, 68, d.opacity);
        textAlign(CENTER, CENTER);
        textSize(12);
        text('\u2717', d.x, d.y);
        if (d.opacity <= 0) {
            droppedRequests.splice(i, 1);
        }
    }
}

function getServerZoneX() {
    return width * 0.6;
}

function getServerY(idx) {
    if (servers.length <= 1) return CANVAS_H / 2;
    var totalH = servers.length * 40 + (servers.length - 1) * 8;
    var startY = CANVAS_H / 2 - totalH / 2 + 20;
    return startY + idx * 48;
}

function drawServerArea() {
    var zoneX = getServerZoneX();

    if (strategy === 'vertical') {
        drawVerticalServer(zoneX);
    } else {
        drawHorizontalServers(zoneX);
    }
}

function drawVerticalServer(zoneX) {
    // Animate server size based on traffic level
    var sizeScale = map(trafficLevel, 0, 9, 1, 2.2);
    sizeScale = Math.min(sizeScale, 2.2);
    targetServerW = 80 * sizeScale;
    targetServerH = 60 * sizeScale;
    animServerW = lerp(animServerW, targetServerW, 0.1);
    animServerH = lerp(animServerH, targetServerH, 0.1);

    // Color: yellow -> orange -> red as load increases
    if (trafficLevel >= 7) {
        targetServerColor = [239, 68, 68]; // red
    } else if (trafficLevel >= 5) {
        targetServerColor = [234, 88, 12]; // dark orange
    } else {
        targetServerColor = [245, 158, 11]; // amber
    }
    serverColor[0] = lerp(serverColor[0], targetServerColor[0], 0.08);
    serverColor[1] = lerp(serverColor[1], targetServerColor[1], 0.08);
    serverColor[2] = lerp(serverColor[2], targetServerColor[2], 0.08);

    var cx = zoneX + 40;
    var cy = CANVAS_H / 2;

    push();
    // Server shadow
    noStroke();
    fill(0, 0, 0, 15);
    rect(cx - animServerW / 2 + 3, cy - animServerH / 2 + 3, animServerW, animServerH, 10);

    // Server body
    fill(serverColor[0], serverColor[1], serverColor[2]);
    rect(cx - animServerW / 2, cy - animServerH / 2, animServerW, animServerH, 10);

    // Server label
    fill(255, 255, 255, 230);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text('Server', cx, cy - 10);
    textStyle(NORMAL);
    textSize(9);
    var conf = V_CONFIGS[trafficLevel];
    text(conf.cpu + ' CPU / ' + conf.ram + ' GB', cx, cy + 8);

    // Overloaded indicator
    if (overloaded) {
        var flashAlpha = (sin(frameCount * 0.15) + 1) * 0.5;
        fill(239, 68, 68, 80 * flashAlpha);
        rect(cx - animServerW / 2, cy - animServerH / 2, animServerW, animServerH, 10);

        // Warning text
        fill(239, 68, 68);
        textAlign(CENTER, TOP);
        textSize(11);
        textStyle(BOLD);
        text('OVERLOADED', cx, cy + animServerH / 2 + 8);
        textStyle(NORMAL);
    }

    // Hardware ceiling line
    if (trafficLevel >= 6) {
        var ceilingAlpha = map(trafficLevel, 6, 9, 80, 200);
        stroke(239, 68, 68, ceilingAlpha);
        strokeWeight(2);
        drawingContext.setLineDash([6, 4]);
        var ceilY = cy - animServerH / 2 - 20;
        line(cx - 80, ceilY, cx + 80, ceilY);
        drawingContext.setLineDash([]);
        noStroke();
        fill(239, 68, 68, ceilingAlpha);
        textAlign(CENTER, BOTTOM);
        textSize(9);
        text('Hardware Ceiling', cx, ceilY - 3);
    }

    pop();
}

function drawHorizontalServers(zoneX) {
    var count = servers.length;
    var srvW = 60;
    var srvH = 34;
    var gap = 8;

    // Load balancer bar
    push();
    noStroke();
    fill(59, 130, 246);
    var lbX = zoneX - 20;
    var lbW = 30;
    var totalH = count * srvH + (count - 1) * gap;
    var startY = CANVAS_H / 2 - totalH / 2;
    var lbH = totalH + 10;
    rect(lbX, startY - 5, lbW, lbH, 6);

    fill(255, 255, 255, 230);
    textAlign(CENTER, CENTER);
    textSize(8);
    push();
    translate(lbX + lbW / 2, startY + lbH / 2);
    rotate(-HALF_PI);
    text('Load Balancer', 0, 0);
    pop();
    pop();

    // Individual servers
    push();
    for (var i = 0; i < count; i++) {
        var sy = startY + i * (srvH + gap);
        var sx = lbX + lbW + 15;
        servers[i].x = sx;
        servers[i].y = sy + srvH / 2;

        // Server box
        noStroke();
        fill(219, 234, 254);
        stroke(59, 130, 246);
        strokeWeight(2);
        rect(sx, sy, srvW, srvH, 6);

        // Load bar inside
        var loadPct = Math.min(servers[i].load / 8, 1);
        if (loadPct > 0) {
            noStroke();
            var lr = lerp(59, 239, loadPct);
            var lg = lerp(130, 68, loadPct);
            var lb = lerp(246, 68, loadPct);
            fill(lr, lg, lb, 80);
            rect(sx + 2, sy + 2, (srvW - 4) * loadPct, srvH - 4, 4);
        }

        // Label
        noStroke();
        fill(30, 75, 105);
        textAlign(CENTER, CENTER);
        textSize(9);
        text('Srv ' + (i + 1), sx + srvW / 2, sy + srvH / 2);

        // Distribution lines from LB to server
        stroke(59, 130, 246, 60);
        strokeWeight(1);
        line(lbX + lbW, startY + lbH / 2 - 5, sx, sy + srvH / 2);
    }
    pop();
}

function drawLabels() {
    push();
    noStroke();

    // "Incoming Requests" label on left
    fill(100, 116, 139);
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Incoming', 40, 18);
    text('Requests', 40, 30);

    // Arrow hint
    fill(100, 116, 139, 100);
    textSize(16);
    text('\u2192', 90, 24);

    // Strategy label on right
    textSize(10);
    fill(100, 116, 139);
    textAlign(CENTER, CENTER);
    if (strategy === 'vertical') {
        text('Scale Up', width - 50, 18);
        textSize(14);
        text('\u2191', width - 50, 34);
    } else {
        text('Scale Out', width - 50, 18);
        textSize(14);
        text('\u2194', width - 50, 34);
    }

    pop();
}
