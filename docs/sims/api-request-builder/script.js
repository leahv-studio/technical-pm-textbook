// ============================================
// API Request Builder - Interactive MicroSim
// Chapter 6: APIs and Integrations
// ============================================

// --- Method Colors ---
var METHOD_COLORS = {
    GET: [52, 152, 219],
    POST: [39, 174, 96],
    PUT: [243, 156, 18],
    DELETE: [231, 76, 60]
};

// --- Simulated API Responses ---
var responseData = {
    'GET /users': {
        status: 200, statusText: 'OK',
        body: [
            { id: 1, name: "Alice Chen", role: "PM" },
            { id: 2, name: "Bob Smith", role: "Engineer" },
            { id: 3, name: "Carol Wu", role: "Designer" }
        ],
        time: 87,
        explain: "The server found the requested users and returned them as a JSON array."
    },
    'GET /orders': {
        status: 200, statusText: 'OK',
        body: [
            { orderId: 1001, product: "Widget", status: "shipped", total: 59.98 },
            { orderId: 1002, product: "Gadget", status: "pending", total: 49.99 }
        ],
        time: 124,
        explain: "The server returned all orders. Each order includes its current status."
    },
    'GET /products': {
        status: 200, statusText: 'OK',
        body: [
            { id: 1, name: "Widget", price: 29.99, inStock: true },
            { id: 2, name: "Gadget", price: 49.99, inStock: false }
        ],
        time: 63,
        explain: "The server returned the product catalog with pricing and availability."
    },
    'POST /users': {
        status: 201, statusText: 'Created',
        body: { id: 4, name: "Dana Lee", role: "Analyst", created: "2026-02-11T10:30:00Z" },
        time: 203,
        explain: "A new user was created successfully. The server returned the new record with its assigned ID."
    },
    'POST /orders': {
        status: 201, statusText: 'Created',
        body: { orderId: 1003, product: "Widget", quantity: 2, status: "pending", total: 59.98 },
        time: 189,
        explain: "A new order was placed. The server confirmed it with a status of 'pending'."
    },
    'POST /products': {
        status: 400, statusText: 'Bad Request',
        body: { error: "Validation failed", message: "Required field 'price' is missing", field: "price" },
        time: 42,
        explain: "The request body was missing a required field. The server tells you exactly what to fix."
    },
    'PUT /users': {
        status: 200, statusText: 'OK',
        body: { id: 1, name: "Alice Chen", role: "Senior PM", updated: "2026-02-11T10:31:00Z" },
        time: 156,
        explain: "The user record was updated. The response shows the new values after the change."
    },
    'PUT /orders': {
        status: 404, statusText: 'Not Found',
        body: { error: "Not found", message: "Order #9999 does not exist" },
        time: 38,
        explain: "The order you tried to update doesn't exist. Double-check the order ID."
    },
    'PUT /products': {
        status: 200, statusText: 'OK',
        body: { id: 1, name: "Widget Pro", price: 39.99, updated: "2026-02-11T10:32:00Z" },
        time: 178,
        explain: "The product was updated with new name and price. The server confirms the changes."
    },
    'DELETE /users': {
        status: 401, statusText: 'Unauthorized',
        body: { error: "Unauthorized", message: "Admin privileges required to delete users" },
        time: 29,
        explain: "You don't have permission to delete users. This endpoint requires admin-level authentication."
    },
    'DELETE /orders': {
        status: 200, statusText: 'OK',
        body: { deleted: true, orderId: 1001, message: "Order successfully cancelled" },
        time: 95,
        explain: "The order was deleted (cancelled). The server confirms which order was removed."
    },
    'DELETE /products': {
        status: 500, statusText: 'Internal Server Error',
        body: { error: "Internal server error", message: "Database connection timed out" },
        time: 5023,
        explain: "The server encountered an unexpected error. This is a server-side problem, not a client issue. Notice the long response time."
    }
};

// --- Request Bodies for POST and PUT ---
var requestBodies = {
    'POST /users': { name: "Dana Lee", role: "Analyst", email: "dana@example.com" },
    'POST /orders': { product: "Widget", quantity: 2, shippingAddress: "123 Main St" },
    'POST /products': { name: "New Gadget", category: "Electronics" },
    'PUT /users': { id: 1, role: "Senior PM" },
    'PUT /orders': { orderId: 9999, status: "cancelled" },
    'PUT /products': { id: 1, name: "Widget Pro", price: 39.99 }
};

// --- State ---
var currentMethod = 'GET';
var currentEndpoint = '/users';
var animState = 'IDLE';
var animProgress = 0;
var animStartTime = 0;

var SEND_DURATION = 1200;
var PROCESS_DURATION = 500;
var RECEIVE_DURATION = 1200;

// --- Canvas Layout ---
var clientCenterX, serverCenterX, pathY;
var canvasH = 180;

// --- p5.js ---

function setup() {
    var container = document.getElementById('canvas-container');
    var canvas = createCanvas(container.offsetWidth, canvasH);
    canvas.parent('canvas-container');
    updateLayout();
    initControls();
}

function updateLayout() {
    clientCenterX = 70;
    serverCenterX = width - 70;
    pathY = height / 2;
}

function windowResized() {
    var container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, canvasH);
    updateLayout();
}

function draw() {
    background(245, 247, 250);

    drawConnectionLine();
    drawClient();
    drawServer();

    if (animState === 'SENDING' || animState === 'RECEIVING') {
        updateAnimation();
        drawPacket();
    } else if (animState === 'PROCESSING') {
        updateAnimation();
    }
}

function drawClient() {
    push();
    translate(clientCenterX, pathY);

    // Monitor body
    fill(50, 70, 90);
    noStroke();
    rectMode(CENTER);
    rect(0, -12, 52, 36, 4);

    // Screen
    fill(210, 225, 240);
    rect(0, -12, 44, 28, 2);

    // Screen content - shows method color indicator
    var mc = METHOD_COLORS[currentMethod];
    if (animState !== 'IDLE') {
        fill(mc[0], mc[1], mc[2], 60);
        rect(0, -12, 44, 28, 2);
    }

    // Stand
    fill(50, 70, 90);
    rect(0, 10, 16, 8, 1);
    rect(0, 16, 28, 4, 2);

    // Label
    fill(100, 115, 130);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textFont('system-ui, sans-serif');
    text('Client', 0, 28);
    pop();
}

function drawServer() {
    push();
    translate(serverCenterX, pathY);

    var isProcessing = (animState === 'PROCESSING');

    // Glow when processing
    if (isProcessing) {
        noStroke();
        fill(70, 180, 200, 30);
        ellipse(0, 0, 100, 100);
        fill(70, 180, 200, 15);
        ellipse(0, 0, 120, 120);
    }

    // Server rack
    fill(50, 70, 90);
    noStroke();
    rectMode(CENTER);
    rect(0, -2, 48, 52, 4);

    // Rack panels
    fill(70, 90, 110);
    rect(0, -18, 40, 10, 2);
    rect(0, -4, 40, 10, 2);
    rect(0, 10, 40, 10, 2);

    // LED indicators
    noStroke();
    if (isProcessing) {
        fill(80, 220, 120);
    } else {
        fill(100, 120, 140);
    }
    circle(-14, -22, 4);
    circle(-8, -22, 4);

    if (isProcessing) {
        fill(255, 180, 50);
    } else {
        fill(100, 120, 140);
    }
    circle(-2, -22, 4);

    // Label
    fill(100, 115, 130);
    textAlign(CENTER, TOP);
    textSize(12);
    textFont('system-ui, sans-serif');
    text('Server', 0, 30);
    pop();
}

function drawConnectionLine() {
    push();
    stroke(190, 200, 210);
    strokeWeight(2);
    drawingContext.setLineDash([8, 6]);
    var startX = clientCenterX + 36;
    var endX = serverCenterX - 36;
    line(startX, pathY, endX, pathY);
    drawingContext.setLineDash([]);

    // Arrow hints
    fill(190, 200, 210);
    noStroke();
    var midX = (startX + endX) / 2;
    triangle(midX + 6, pathY, midX - 2, pathY - 4, midX - 2, pathY + 4);
    pop();
}

function drawPacket() {
    var startX = clientCenterX + 36;
    var endX = serverCenterX - 36;
    var easedT = easeInOutCubic(animProgress);
    var x, labelText, r, g, b;

    if (animState === 'SENDING') {
        x = lerp(startX, endX, easedT);
        labelText = currentMethod;
        var mc = METHOD_COLORS[currentMethod];
        r = mc[0]; g = mc[1]; b = mc[2];
    } else if (animState === 'RECEIVING') {
        x = lerp(endX, startX, easedT);
        var key = currentMethod + ' ' + currentEndpoint;
        var resp = responseData[key];
        labelText = String(resp.status);
        var statusFamily = Math.floor(resp.status / 100);
        if (statusFamily === 2) { r = 39; g = 174; b = 96; }
        else if (statusFamily === 4) { r = 230; g = 126; b = 34; }
        else { r = 231; g = 76; b = 60; }
    }

    if (x !== undefined) {
        push();
        // Shadow
        noStroke();
        fill(0, 0, 0, 20);
        rectMode(CENTER);
        rect(x + 1, pathY + 2, 64, 28, 14);

        // Packet
        fill(r, g, b);
        rect(x, pathY, 64, 28, 14);

        // Label
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(BOLD);
        textFont('system-ui, sans-serif');
        text(labelText, x, pathY - 1);
        pop();
    }
}

function updateAnimation() {
    var elapsed = millis() - animStartTime;

    if (animState === 'SENDING') {
        animProgress = constrain(elapsed / SEND_DURATION, 0, 1);
        if (animProgress >= 1) {
            animState = 'PROCESSING';
            animStartTime = millis();
            animProgress = 0;
        }
    } else if (animState === 'PROCESSING') {
        animProgress = constrain(elapsed / PROCESS_DURATION, 0, 1);
        if (animProgress >= 1) {
            animState = 'RECEIVING';
            animStartTime = millis();
            animProgress = 0;
        }
    } else if (animState === 'RECEIVING') {
        animProgress = constrain(elapsed / RECEIVE_DURATION, 0, 1);
        if (animProgress >= 1) {
            animState = 'COMPLETE';
            showResponse();
        }
    }
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// --- UI Control Handlers ---

function initControls() {
    document.querySelectorAll('.method-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            currentMethod = btn.dataset.method;
            document.querySelectorAll('.method-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            updateRequestPanel();
        });
    });

    document.getElementById('endpoint').addEventListener('change', function(e) {
        currentEndpoint = e.target.value;
        updateRequestPanel();
    });

    document.getElementById('send-btn').addEventListener('click', sendRequest);

    updateRequestPanel();
}

function updateRequestPanel() {
    var badge = document.querySelector('.method-badge');
    badge.textContent = currentMethod;
    badge.className = 'method-badge ' + currentMethod.toLowerCase();

    document.querySelector('.url').textContent =
        'https://api.example.com' + currentEndpoint;

    var bodySection = document.querySelector('.body-section');
    var key = currentMethod + ' ' + currentEndpoint;

    if (currentMethod === 'POST' || currentMethod === 'PUT') {
        bodySection.style.display = 'block';
        var body = requestBodies[key] || {};
        document.querySelector('.request-body').textContent =
            JSON.stringify(body, null, 2);
    } else {
        bodySection.style.display = 'none';
    }

    // Hide response when changing parameters
    document.querySelector('.response-panel').style.display = 'none';
    animState = 'IDLE';
}

function sendRequest() {
    if (animState === 'SENDING' || animState === 'PROCESSING' || animState === 'RECEIVING') {
        return;
    }

    document.querySelector('.response-panel').style.display = 'none';
    animState = 'SENDING';
    animProgress = 0;
    animStartTime = millis();
    document.getElementById('send-btn').disabled = true;
}

function showResponse() {
    var key = currentMethod + ' ' + currentEndpoint;
    var resp = responseData[key];

    var badge = document.querySelector('.status-badge');
    badge.textContent = resp.status + ' ' + resp.statusText;

    var statusFamily = Math.floor(resp.status / 100);
    if (statusFamily === 2) {
        badge.className = 'status-badge success';
    } else if (statusFamily === 4) {
        badge.className = 'status-badge client-error';
    } else {
        badge.className = 'status-badge server-error';
    }

    document.querySelector('.response-time').textContent = resp.time + 'ms';
    document.querySelector('.response-json').textContent =
        JSON.stringify(resp.body, null, 2);

    var explainEl = document.querySelector('.status-explanation');
    explainEl.textContent = resp.explain;
    if (statusFamily === 2) {
        explainEl.className = 'status-explanation success';
    } else if (statusFamily === 4) {
        explainEl.className = 'status-explanation client-error';
    } else {
        explainEl.className = 'status-explanation server-error';
    }

    document.querySelector('.response-panel').style.display = 'block';
    document.getElementById('send-btn').disabled = false;
}
