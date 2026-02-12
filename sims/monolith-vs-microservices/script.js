// ============================================
// Monolith vs. Microservices Explorer
// Chapter 4: System Architecture Fundamentals
// ============================================

// --- Configuration ---
var WEIGHTS = { team: 0.35, complexity: 0.30, scale: 0.35 };
var CANVAS_H = 380;

// --- State ---
var currentScore = 0;
var targetScore = 0;
var animatedElements = [];

// --- Slider References ---
var teamSlider, complexitySlider, usersSlider;

// --- p5.js Setup ---

function setup() {
    var container = document.getElementById('canvas-container');
    var canvas = createCanvas(container.offsetWidth, CANVAS_H);
    canvas.parent('canvas-container');
    textFont('Segoe UI, system-ui, sans-serif');

    teamSlider = document.getElementById('team-slider');
    complexitySlider = document.getElementById('complexity-slider');
    usersSlider = document.getElementById('users-slider');

    teamSlider.addEventListener('input', onSliderChange);
    complexitySlider.addEventListener('input', onSliderChange);
    usersSlider.addEventListener('input', onSliderChange);

    initAnimatedElements();
    onSliderChange();
}

function windowResized() {
    var container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, CANVAS_H);
}

// --- Score Computation ---

function computeScore() {
    var teamSize = parseInt(teamSlider.value);
    var complexity = parseInt(complexitySlider.value);
    var usersLog = parseFloat(usersSlider.value);

    var teamFactor = map(teamSize, 2, 50, 0, 1);
    var complexityFactor = map(complexity, 1, 3, 0, 1);
    var scaleFactor = map(usersLog, 3, 7, 0, 1);

    return constrain(
        WEIGHTS.team * teamFactor +
        WEIGHTS.complexity * complexityFactor +
        WEIGHTS.scale * scaleFactor,
        0, 1
    );
}

// --- Slider Change Handler ---

function onSliderChange() {
    targetScore = computeScore();

    var teamSize = parseInt(teamSlider.value);
    var complexity = parseInt(complexitySlider.value);
    var usersLog = parseFloat(usersSlider.value);

    // Update slider display values
    document.getElementById('team-value').textContent = teamSize + ' developers';

    var complexityLabels = ['Low', 'Medium', 'High'];
    document.getElementById('complexity-value').textContent = complexityLabels[complexity - 1];

    document.getElementById('users-value').textContent = formatUsers(usersLog);

    updateUI(targetScore, teamSize, complexity, usersLog);
}

function formatUsers(logVal) {
    var val = Math.pow(10, logVal);
    if (val >= 1000000) return Math.round(val / 1000000) + 'M';
    if (val >= 1000) return Math.round(val / 1000) + 'K';
    return Math.round(val).toString();
}

// --- UI Updates ---

function updateUI(score, teamSize, complexity, usersLog) {
    // Architecture badge
    var badge = document.getElementById('arch-badge');
    var scoreText = document.getElementById('score-text');

    if (score < 0.35) {
        badge.textContent = 'Monolith';
        badge.style.background = '#3b82f6';
    } else if (score < 0.65) {
        badge.textContent = 'Modular Monolith';
        badge.style.background = '#14b8a6';
    } else {
        badge.textContent = 'Microservices';
        badge.style.background = '#22c55e';
    }
    scoreText.textContent = 'Score: ' + score.toFixed(2);

    // Score marker
    var marker = document.getElementById('score-marker');
    marker.style.left = (score * 100) + '%';

    // Trade-off cards
    updateTradeoffs(score);

    // Recommendation text
    updateRecommendation(score, teamSize, complexity, usersLog);
}

function updateTradeoffs(score) {
    var deploy = document.getElementById('tradeoff-deploy');
    var team = document.getElementById('tradeoff-team');
    var scale = document.getElementById('tradeoff-scale');

    if (score < 0.35) {
        deploy.textContent = 'Simple single deploy to one server. Fast rollbacks by redeploying the whole app.';
        team.textContent = 'Single team with shared codebase. Easy code reviews and knowledge sharing.';
        scale.textContent = 'Vertical scaling: add more CPU/RAM to the server. Simple but limited.';
    } else if (score < 0.65) {
        deploy.textContent = 'Single deploy unit with modular boundaries. Feature flags enable gradual rollouts.';
        team.textContent = 'Cross-functional teams own modules within the shared codebase. Clear internal APIs.';
        scale.textContent = 'Vertical scaling with selective optimization of hot modules. Some horizontal replication.';
    } else {
        deploy.textContent = 'Independent CI/CD pipelines per service. Each team deploys on their own schedule.';
        team.textContent = 'Independent teams own individual services end-to-end. Autonomous decision-making.';
        scale.textContent = 'Independent horizontal scaling per service. Scale only what needs scaling.';
    }
}

function updateRecommendation(score, teamSize, complexity, usersLog) {
    var el = document.getElementById('recommendation-text');
    var users = Math.pow(10, usersLog);

    var teamFactor = map(teamSize, 2, 50, 0, 1);
    var scaleFactor = map(usersLog, 3, 7, 0, 1);
    var complexityFactor = map(complexity, 1, 3, 0, 1);

    var text = '';

    if (score < 0.35) {
        if (scaleFactor > 0.5) {
            text = 'With ' + teamSize + ' developers and ' + formatUsers(usersLog) +
                ' expected users, a monolith is your best starting point. Your user base suggests you may eventually need to extract performance-critical components, but premature decomposition would slow your small team. Build a well-structured monolith now and plan extraction points for later.';
        } else {
            text = 'A monolith is the clear choice for your scenario. With ' + teamSize +
                ' developers, ' + formatUsers(usersLog) +
                ' users, and straightforward complexity, a single codebase keeps development fast and debugging simple. Your team can share knowledge easily and ship features without coordination overhead.';
        }
    } else if (score < 0.50) {
        text = 'A modular monolith is recommended. With ' + teamSize +
            ' developers, define clear module boundaries within a single deployable unit. This gives you the organizational benefits of service thinking without the operational complexity of distributed systems. Enforce module APIs internally so extraction to services is possible later if ' +
            formatUsers(usersLog) + ' users grows significantly.';
    } else if (score < 0.65) {
        if (teamFactor > 0.5 && complexityFactor < 0.5) {
            text = 'Your team of ' + teamSize +
                ' developers is large enough that a modular monolith with very clear boundaries makes sense. The system complexity does not yet justify full microservices, but strong internal APIs and module ownership will help your teams work independently. Consider extracting specific modules to services only when they become bottlenecks.';
        } else {
            text = 'You are in the transitional zone. With ' + teamSize + ' developers, ' +
                formatUsers(usersLog) +
                ' users, and growing complexity, consider starting with a modular monolith and extracting the highest-traffic or most-changed components into independent services first. This incremental approach reduces risk while building operational maturity.';
        }
    } else if (score < 0.80) {
        text = 'Microservices are appropriate for your scenario. With ' + teamSize +
            ' developers and ' + formatUsers(usersLog) +
            ' expected users, independent services will allow teams to deploy and scale autonomously. Invest in CI/CD pipelines, monitoring, and service mesh infrastructure before decomposing. Start with 3-5 core services along natural business boundaries rather than creating dozens of tiny services.';
    } else {
        text = 'A full microservices architecture is strongly recommended. Your combination of ' +
            teamSize + ' developers, high system complexity, and ' + formatUsers(usersLog) +
            ' expected users demands independent deployment, per-service scaling, and team autonomy. Ensure you invest heavily in DevOps infrastructure: centralized logging, distributed tracing, container orchestration, and automated testing. The operational overhead is significant but necessary at this scale.';
    }

    el.textContent = text;
}

// --- Animated Elements ---

function initAnimatedElements() {
    animatedElements = [];
    for (var i = 0; i < 6; i++) {
        animatedElements.push({
            x: 0, y: 0, w: 0, h: 0,
            targetX: 0, targetY: 0, targetW: 0, targetH: 0,
            r: 59, g: 130, b: 246,
            targetR: 59, targetG: 130, targetB: 246,
            opacity: 255, targetOpacity: 255,
            dbY: 0, targetDbY: 0,
            dbOpacity: 0, targetDbOpacity: 0
        });
    }
}

// --- Drawing ---

function draw() {
    background(245, 247, 250);

    // Smoothly animate score
    currentScore = lerp(currentScore, targetScore, 0.08);

    // Compute layout targets
    computeLayoutTargets(currentScore);

    // Animate elements toward targets
    for (var i = 0; i < animatedElements.length; i++) {
        var el = animatedElements[i];
        el.x = lerp(el.x, el.targetX, 0.1);
        el.y = lerp(el.y, el.targetY, 0.1);
        el.w = lerp(el.w, el.targetW, 0.1);
        el.h = lerp(el.h, el.targetH, 0.1);
        el.r = lerp(el.r, el.targetR, 0.1);
        el.g = lerp(el.g, el.targetG, 0.1);
        el.b = lerp(el.b, el.targetB, 0.1);
        el.opacity = lerp(el.opacity, el.targetOpacity, 0.1);
        el.dbY = lerp(el.dbY, el.targetDbY, 0.1);
        el.dbOpacity = lerp(el.dbOpacity, el.targetDbOpacity, 0.1);
    }

    drawArchitecture(currentScore);
}

function computeLayoutTargets(score) {
    var cx = width / 2;
    var cy = 155;
    var maxW = Math.min(width - 80, 650);

    if (score < 0.35) {
        // Monolith: single large block
        var monoW = maxW * 0.5;
        var monoH = 180;
        animatedElements[0].targetX = cx - monoW / 2;
        animatedElements[0].targetY = cy - monoH / 2;
        animatedElements[0].targetW = monoW;
        animatedElements[0].targetH = monoH;
        animatedElements[0].targetR = 59; animatedElements[0].targetG = 130; animatedElements[0].targetB = 246;
        animatedElements[0].targetOpacity = 255;
        animatedElements[0].targetDbY = cy + monoH / 2 + 30;
        animatedElements[0].targetDbOpacity = 255;

        // Hide other elements
        for (var i = 1; i < 6; i++) {
            animatedElements[i].targetX = cx - monoW / 2 + (monoW / 6) * i;
            animatedElements[i].targetY = cy - monoH / 2;
            animatedElements[i].targetW = 0;
            animatedElements[i].targetH = 0;
            animatedElements[i].targetOpacity = 0;
            animatedElements[i].targetDbOpacity = 0;
        }
    } else if (score < 0.65) {
        // Modular monolith: 3 modules inside a boundary
        var modCount = 3;
        var totalW = maxW * 0.6;
        var modW = (totalW - 20) / modCount;
        var modH = 160;
        var startX = cx - totalW / 2 + 10;

        for (var j = 0; j < 6; j++) {
            if (j < modCount) {
                animatedElements[j].targetX = startX + j * (modW + 10);
                animatedElements[j].targetY = cy - modH / 2;
                animatedElements[j].targetW = modW;
                animatedElements[j].targetH = modH;
                animatedElements[j].targetR = 20; animatedElements[j].targetG = 184; animatedElements[j].targetB = 166;
                animatedElements[j].targetOpacity = 255;
                animatedElements[j].targetDbY = cy + modH / 2 + 30;
                animatedElements[j].targetDbOpacity = (j === 1) ? 255 : 0; // shared DB under middle
            } else {
                animatedElements[j].targetX = cx;
                animatedElements[j].targetY = cy;
                animatedElements[j].targetW = 0;
                animatedElements[j].targetH = 0;
                animatedElements[j].targetOpacity = 0;
                animatedElements[j].targetDbOpacity = 0;
            }
        }
        // Shared DB centered
        animatedElements[1].targetDbOpacity = 255;
    } else {
        // Microservices: 4-6 independent blocks
        var svcCount = score > 0.82 ? 6 : (score > 0.72 ? 5 : 4);
        var svcW = 80;
        var svcH = 70;
        var gap = 16;
        var cols = Math.min(svcCount, 3);
        var rows = Math.ceil(svcCount / cols);
        var gridW = cols * svcW + (cols - 1) * gap;
        var gridH = rows * (svcH + 45) + (rows - 1) * gap;
        var gridStartX = cx - gridW / 2;
        var gridStartY = cy - gridH / 2 + 15;

        for (var k = 0; k < 6; k++) {
            if (k < svcCount) {
                var col = k % cols;
                var row = Math.floor(k / cols);
                animatedElements[k].targetX = gridStartX + col * (svcW + gap);
                animatedElements[k].targetY = gridStartY + row * (svcH + 45 + gap);
                animatedElements[k].targetW = svcW;
                animatedElements[k].targetH = svcH;
                animatedElements[k].targetR = 34; animatedElements[k].targetG = 197; animatedElements[k].targetB = 94;
                animatedElements[k].targetOpacity = 255;
                animatedElements[k].targetDbY = gridStartY + row * (svcH + 45 + gap) + svcH + 8;
                animatedElements[k].targetDbOpacity = 255;
            } else {
                animatedElements[k].targetW = 0;
                animatedElements[k].targetH = 0;
                animatedElements[k].targetOpacity = 0;
                animatedElements[k].targetDbOpacity = 0;
            }
        }
    }
}

function drawArchitecture(score) {
    push();

    // Title label
    noStroke();
    fill(80, 100, 120);
    textAlign(CENTER, TOP);
    textSize(13);
    textStyle(BOLD);
    if (score < 0.35) {
        text('Monolith', width / 2, 12);
    } else if (score < 0.65) {
        text('Modular Monolith', width / 2, 12);
    } else {
        text('Microservices', width / 2, 12);
    }
    textStyle(NORMAL);

    // Draw API Gateway for microservices
    if (score >= 0.55) {
        var gatewayOpacity = map(score, 0.55, 0.65, 0, 255);
        gatewayOpacity = constrain(gatewayOpacity, 0, 255);
        fill(100, 116, 139, gatewayOpacity);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, 42, Math.min(width - 100, 400), 22, 6);
        fill(255, 255, 255, gatewayOpacity);
        textAlign(CENTER, CENTER);
        textSize(10);
        text('API Gateway', width / 2, 42);
        rectMode(CORNER);
    }

    // Dashed boundary for modular monolith
    if (score >= 0.30 && score < 0.65) {
        var boundaryOpacity = score < 0.35 ? map(score, 0.30, 0.35, 0, 200) : map(score, 0.60, 0.65, 200, 0);
        boundaryOpacity = constrain(boundaryOpacity, 0, 200);
        stroke(100, 116, 139, boundaryOpacity);
        strokeWeight(2);
        drawingContext.setLineDash([8, 5]);
        noFill();
        var bx = animatedElements[0].x - 10;
        var by = animatedElements[0].y - 10;
        var bw = (animatedElements[2].x + animatedElements[2].w) - animatedElements[0].x + 20;
        var bh = animatedElements[0].h + 20;
        rect(bx, by, bw, bh, 12);
        drawingContext.setLineDash([]);
    }

    // Draw service blocks
    for (var i = 0; i < 6; i++) {
        var el = animatedElements[i];
        if (el.opacity < 5 || el.w < 2) continue;

        // Service block
        fill(el.r, el.g, el.b, el.opacity);
        noStroke();
        rect(el.x, el.y, el.w, el.h, 8);

        // Internal layers for monolith
        if (score < 0.35 && i === 0) {
            drawMonolithLayers(el);
        }

        // Module labels for modular monolith
        if (score >= 0.35 && score < 0.65 && i < 3) {
            drawModuleLabel(el, i);
        }

        // Service labels for microservices
        if (score >= 0.65 && el.w > 20) {
            drawServiceLabel(el, i);
        }

        // Database cylinder
        if (el.dbOpacity > 5) {
            drawDatabase(el.x + el.w / 2, el.dbY, el.dbOpacity, el.w);
        }
    }

    // Draw API arrows for microservices
    if (score >= 0.60) {
        drawApiArrows(score);
    }

    pop();
}

function drawMonolithLayers(el) {
    var layers = ['UI Layer', 'Business Logic', 'Data Access'];
    var layerH = el.h / layers.length;

    for (var i = 0; i < layers.length; i++) {
        // Divider lines
        if (i > 0) {
            stroke(255, 255, 255, 80);
            strokeWeight(1);
            line(el.x + 12, el.y + i * layerH, el.x + el.w - 12, el.y + i * layerH);
        }

        // Layer label
        noStroke();
        fill(255, 255, 255, 230);
        textAlign(CENTER, CENTER);
        textSize(12);
        text(layers[i], el.x + el.w / 2, el.y + i * layerH + layerH / 2);
    }
}

function drawModuleLabel(el, index) {
    var labels = ['Users', 'Orders', 'Payments'];
    noStroke();
    fill(255, 255, 255, 220);
    textAlign(CENTER, CENTER);
    textSize(11);
    text(labels[index], el.x + el.w / 2, el.y + el.h / 2);
}

function drawServiceLabel(el, index) {
    var labels = ['Auth', 'Search', 'Cart', 'Pay', 'Users', 'Notify'];
    noStroke();
    fill(255, 255, 255, 230);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(labels[index], el.x + el.w / 2, el.y + el.h / 2);
}

function drawDatabase(cx, cy, opacity, parentW) {
    var dbW = Math.min(parentW * 0.6, 50);
    var dbH = 22;
    var ovalH = 6;

    push();
    fill(100, 116, 139, opacity);
    noStroke();

    // Body
    rect(cx - dbW / 2, cy, dbW, dbH);

    // Top ellipse
    ellipse(cx, cy, dbW, ovalH);

    // Bottom ellipse
    ellipse(cx, cy + dbH, dbW, ovalH);

    // Label
    fill(255, 255, 255, opacity * 0.9);
    textAlign(CENTER, CENTER);
    textSize(8);
    text('DB', cx, cy + dbH / 2 + 1);
    pop();
}

function drawApiArrows(score) {
    var arrowOpacity = map(score, 0.60, 0.70, 0, 150);
    arrowOpacity = constrain(arrowOpacity, 0, 150);

    stroke(100, 116, 139, arrowOpacity);
    strokeWeight(1.5);
    drawingContext.setLineDash([4, 3]);

    // Connect adjacent services
    for (var i = 0; i < 5; i++) {
        var a = animatedElements[i];
        var b = animatedElements[i + 1];
        if (a.opacity < 10 || b.opacity < 10 || a.w < 5 || b.w < 5) continue;

        var ax = a.x + a.w;
        var ay = a.y + a.h / 2;
        var bx2 = b.x;
        var by2 = b.y + b.h / 2;

        // Only draw if they're roughly on the same row
        if (Math.abs(ay - by2) < 100) {
            line(ax + 2, ay, bx2 - 2, by2);
        }
    }

    // Cross-row connections
    for (var j = 0; j < 3; j++) {
        var top = animatedElements[j];
        var bottom = animatedElements[j + 3];
        if (top.opacity < 10 || bottom.opacity < 10 || top.w < 5 || bottom.w < 5) continue;

        line(top.x + top.w / 2, top.y + top.h + 2,
             bottom.x + bottom.w / 2, bottom.y - 2);
    }

    drawingContext.setLineDash([]);
}
