// ============================================
// Technical Debt Simulator - Interactive MicroSim
// Chapter 9: Quality Assurance and Technical Debt
// ============================================

// --- Model Parameters ---
var BASE_VELOCITY = 10;
var RUSH_BONUS = 2;
var DEBT_PER_SHIP = 15;
var REFACTOR_PRODUCTIVITY = 0.5;
var DEBT_PAYDOWN = 20;
var DEBT_FACTOR = 0.008;
var MIN_MODIFIER = 0.2;
var TOTAL_SPRINTS = 12;

// --- Game State ---
var currentSprint = 0; // 0 = not started yet, 1-12 = sprint just completed
var currentDebt = 0;
var totalFeatures = 0;
var playerHistory = [];   // { velocity, debt, action, modifier }
var balancedHistory = [];  // pre-computed balanced team
var alwaysShipHistory = []; // pre-computed always-ship team
var gameOver = false;

var canvasH = 380;

// --- Pre-computed Reference Teams ---

function velocityMod(debt) {
    return Math.max(MIN_MODIFIER, 1 - debt * DEBT_FACTOR);
}

function precomputeTeams() {
    // Balanced team: Ship, Ship, Refactor pattern
    var bDebt = 0;
    var bTotal = 0;
    balancedHistory = [];
    for (var i = 0; i < TOTAL_SPRINTS; i++) {
        var mod = velocityMod(bDebt);
        if ((i + 1) % 3 === 0) {
            var feat = Math.round(BASE_VELOCITY * mod * REFACTOR_PRODUCTIVITY);
            bDebt = Math.max(0, bDebt - DEBT_PAYDOWN);
            bTotal += feat;
            balancedHistory.push({ velocity: feat, debt: bDebt, action: 'refactor' });
        } else {
            var feat2 = Math.round(BASE_VELOCITY * mod + RUSH_BONUS);
            bDebt += DEBT_PER_SHIP;
            bTotal += feat2;
            balancedHistory.push({ velocity: feat2, debt: bDebt, action: 'ship' });
        }
    }

    // Always-ship team
    var sDebt = 0;
    var sTotal = 0;
    alwaysShipHistory = [];
    for (var j = 0; j < TOTAL_SPRINTS; j++) {
        var sMod = velocityMod(sDebt);
        var sFeat = Math.round(BASE_VELOCITY * sMod + RUSH_BONUS);
        sDebt += DEBT_PER_SHIP;
        sTotal += sFeat;
        alwaysShipHistory.push({ velocity: sFeat, debt: sDebt, action: 'ship' });
    }
}

function balancedTotal() {
    var sum = 0;
    for (var i = 0; i < balancedHistory.length; i++) sum += balancedHistory[i].velocity;
    return sum;
}

function alwaysShipTotal() {
    var sum = 0;
    for (var i = 0; i < alwaysShipHistory.length; i++) sum += alwaysShipHistory[i].velocity;
    return sum;
}

// --- p5.js ---

function setup() {
    var container = document.getElementById('canvas-container');
    var canvas = createCanvas(container.offsetWidth, canvasH);
    canvas.parent('canvas-container');
    textFont('system-ui, sans-serif');
    precomputeTeams();
    initControls();
    updatePrediction();
}

function windowResized() {
    var container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, canvasH);
}

function draw() {
    background(245, 247, 250);
    drawProgressDots();
    drawVelocityChart();
    drawDebtMeter();
}

// --- Drawing ---

function drawProgressDots() {
    var y = 20;
    var dotR = 10;
    var spacing = 28;
    var totalW = TOTAL_SPRINTS * spacing;
    var startX = (width - 130 - totalW) / 2 + 15;

    push();
    for (var i = 0; i < TOTAL_SPRINTS; i++) {
        var dx = startX + i * spacing;
        if (i < currentSprint) {
            // Completed: colored by action
            var act = playerHistory[i].action;
            if (act === 'ship') {
                fill(230, 126, 34);
            } else {
                fill(52, 152, 219);
            }
            noStroke();
            circle(dx, y, dotR);
        } else if (i === currentSprint && !gameOver) {
            // Current sprint: highlighted ring
            noFill();
            stroke(30, 75, 105);
            strokeWeight(2);
            circle(dx, y, dotR + 2);
            fill(30, 75, 105);
            noStroke();
            circle(dx, y, 4);
        } else {
            // Future: empty
            fill(220, 225, 230);
            noStroke();
            circle(dx, y, dotR);
        }

        // Sprint number
        fill(160, 170, 180);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(8);
        text(i + 1, dx, y + 9);
    }
    pop();
}

function drawVelocityChart() {
    var chartX = 55;
    var chartY = 50;
    var chartW = width - 195;
    var chartH = 280;
    var chartBottom = chartY + chartH;
    var maxVel = 14;

    push();

    // Chart background
    fill(255);
    stroke(220, 225, 230);
    strokeWeight(1);
    rect(chartX, chartY, chartW, chartH, 4);

    // Title
    noStroke();
    fill(80, 100, 120);
    textAlign(LEFT, BOTTOM);
    textSize(11);
    textStyle(BOLD);
    text('Team Velocity (features per sprint)', chartX, chartY - 5);

    // Y-axis grid lines and labels
    textSize(9);
    textStyle(NORMAL);
    textAlign(RIGHT, CENTER);
    for (var v = 0; v <= maxVel; v += 2) {
        var gy = chartBottom - (v / maxVel) * chartH;
        stroke(238, 240, 244);
        strokeWeight(1);
        line(chartX + 1, gy, chartX + chartW - 1, gy);
        noStroke();
        fill(160, 170, 180);
        text(v, chartX - 6, gy);
    }

    // X-axis labels
    textAlign(CENTER, TOP);
    var sprintSpacing = chartW / (TOTAL_SPRINTS + 1);
    for (var s = 1; s <= TOTAL_SPRINTS; s++) {
        var sx = chartX + s * sprintSpacing;
        fill(160, 170, 180);
        text(s, sx, chartBottom + 5);
    }
    fill(160, 170, 180);
    textSize(10);
    text('Sprint', chartX + chartW / 2, chartBottom + 18);

    // --- Balanced reference line (dashed gray, all 12 sprints) ---
    stroke(180, 190, 200);
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    noFill();
    beginShape();
    for (var b = 0; b < balancedHistory.length; b++) {
        var bx = chartX + (b + 1) * sprintSpacing;
        var by = chartBottom - (balancedHistory[b].velocity / maxVel) * chartH;
        vertex(bx, constrain(by, chartY, chartBottom));
    }
    endShape();
    drawingContext.setLineDash([]);

    // Balanced data points
    noStroke();
    for (var b2 = 0; b2 < balancedHistory.length; b2++) {
        var bx2 = chartX + (b2 + 1) * sprintSpacing;
        var by2 = chartBottom - (balancedHistory[b2].velocity / maxVel) * chartH;
        fill(200, 208, 216);
        circle(bx2, constrain(by2, chartY, chartBottom), 6);
    }

    // Balanced label
    if (balancedHistory.length > 0) {
        var labelX = chartX + TOTAL_SPRINTS * sprintSpacing + 8;
        var labelY = chartBottom - (balancedHistory[TOTAL_SPRINTS - 1].velocity / maxVel) * chartH;
        fill(180, 190, 200);
        textAlign(LEFT, CENTER);
        textSize(9);
        text('Balanced', labelX, constrain(labelY, chartY + 10, chartBottom - 10));
    }

    // --- Player line (solid, grows as they play) ---
    if (playerHistory.length > 0) {
        stroke(30, 75, 105);
        strokeWeight(2.5);
        drawingContext.setLineDash([]);
        noFill();
        beginShape();
        for (var p = 0; p < playerHistory.length; p++) {
            var px = chartX + (p + 1) * sprintSpacing;
            var py = chartBottom - (playerHistory[p].velocity / maxVel) * chartH;
            vertex(px, constrain(py, chartY, chartBottom));
        }
        endShape();

        // Player data points (colored by action)
        noStroke();
        for (var p2 = 0; p2 < playerHistory.length; p2++) {
            var px2 = chartX + (p2 + 1) * sprintSpacing;
            var py2 = chartBottom - (playerHistory[p2].velocity / maxVel) * chartH;
            py2 = constrain(py2, chartY, chartBottom);
            if (playerHistory[p2].action === 'ship') {
                fill(230, 126, 34);
            } else {
                fill(52, 152, 219);
            }
            circle(px2, py2, 9);
            fill(255);
            circle(px2, py2, 4);
        }

        // Your Team label
        var lastPY = chartBottom - (playerHistory[playerHistory.length - 1].velocity / maxVel) * chartH;
        fill(30, 75, 105);
        textAlign(LEFT, CENTER);
        textSize(9);
        textStyle(BOLD);
        text('You', labelX, constrain(lastPY, chartY + 10, chartBottom - 10));
        textStyle(NORMAL);
    }

    // Legend
    var legX = chartX + 8;
    var legY = chartY + 12;
    noStroke();
    fill(230, 126, 34);
    circle(legX, legY, 8);
    fill(100, 110, 120);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Ship Fast', legX + 8, legY);

    fill(52, 152, 219);
    circle(legX + 72, legY, 8);
    fill(100, 110, 120);
    text('Refactor', legX + 80, legY);

    fill(200, 208, 216);
    circle(legX + 145, legY, 8);
    fill(100, 110, 120);
    text('Balanced team', legX + 153, legY);

    pop();
}

function drawDebtMeter() {
    var mx = width - 110;
    var my = 50;
    var mw = 50;
    var mh = 280;
    var maxDebt = 180;

    push();

    // Title
    noStroke();
    fill(80, 100, 120);
    textAlign(CENTER, BOTTOM);
    textSize(11);
    textStyle(BOLD);
    text('Tech Debt', mx + mw / 2, my - 5);
    textStyle(NORMAL);

    // Meter background
    fill(240, 242, 245);
    stroke(220, 225, 230);
    strokeWeight(1);
    rect(mx, my, mw, mh, 6);

    // Debt fill (red gradient from bottom)
    if (currentDebt > 0) {
        var fillH = constrain(currentDebt / maxDebt, 0, 1) * mh;
        noStroke();

        // Gradient effect: darker at bottom
        var steps = Math.ceil(fillH / 4);
        for (var i = 0; i < steps; i++) {
            var fy = my + mh - (i + 1) * 4;
            var ratio = i / Math.max(steps, 1);
            var r = lerp(200, 231, ratio);
            var g = lerp(60, 76, ratio);
            var b = lerp(60, 60, ratio);
            fill(r, g, b, 200);
            var rh = Math.min(4, my + mh - fy);
            rect(mx + 2, fy, mw - 4, rh);
        }
    }

    // Danger zone markers
    noStroke();
    fill(180, 185, 190);
    textAlign(RIGHT, CENTER);
    textSize(8);
    for (var d = 0; d <= maxDebt; d += 30) {
        var dy = my + mh - (d / maxDebt) * mh;
        text(d, mx - 4, dy);
        stroke(210, 215, 220);
        strokeWeight(1);
        line(mx, dy, mx + 5, dy);
        noStroke();
    }

    // Current debt value
    fill(currentDebt > 60 ? color(200, 60, 60) : color(80, 100, 120));
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text(currentDebt, mx + mw / 2, my + mh + 8);
    textStyle(NORMAL);
    textSize(9);
    fill(140, 150, 160);
    text('points', mx + mw / 2, my + mh + 27);

    pop();
}

// --- Game Actions ---

function shipFast() {
    if (gameOver || currentSprint >= TOTAL_SPRINTS) return;

    var mod = velocityMod(currentDebt);
    var features = Math.round(BASE_VELOCITY * mod + RUSH_BONUS);
    currentDebt += DEBT_PER_SHIP;
    totalFeatures += features;
    currentSprint++;

    playerHistory.push({
        velocity: features,
        debt: currentDebt,
        action: 'ship',
        modifier: mod
    });

    showSprintResult(currentSprint, features, 'ship', mod);
    checkGameEnd();
}

function refactor() {
    if (gameOver || currentSprint >= TOTAL_SPRINTS) return;

    var mod = velocityMod(currentDebt);
    var features = Math.round(BASE_VELOCITY * mod * REFACTOR_PRODUCTIVITY);
    var oldDebt = currentDebt;
    currentDebt = Math.max(0, currentDebt - DEBT_PAYDOWN);
    totalFeatures += features;
    currentSprint++;

    playerHistory.push({
        velocity: features,
        debt: currentDebt,
        action: 'refactor',
        modifier: mod
    });

    showSprintResult(currentSprint, features, 'refactor', mod);
    checkGameEnd();
}

function showSprintResult(sprint, features, action, mod) {
    var el = document.getElementById('sprint-result');
    el.style.display = 'block';

    var pct = Math.round((1 - mod) * 100);
    if (action === 'ship') {
        el.innerHTML = '<strong>Sprint ' + sprint + ':</strong> Shipped <strong>' +
            features + ' features</strong> (velocity at ' + Math.round(mod * 100) +
            '% due to ' + pct + '% debt drag). Debt rose to <strong>' +
            currentDebt + '</strong>.';
    } else {
        el.innerHTML = '<strong>Sprint ' + sprint + ':</strong> Shipped <strong>' +
            features + ' features</strong> while refactoring. Debt reduced to <strong>' +
            currentDebt + '</strong>. Velocity will improve next sprint.';
    }

    // Update sprint info
    if (currentSprint < TOTAL_SPRINTS) {
        document.getElementById('sprint-info').innerHTML =
            'Sprint ' + (currentSprint + 1) + ' of 12 &mdash; Choose your action:';
        updatePrediction();
    }

    document.getElementById('feature-total').innerHTML =
        'Features shipped: <strong>' + totalFeatures + '</strong>';
}

function checkGameEnd() {
    if (currentSprint >= TOTAL_SPRINTS) {
        gameOver = true;
        document.getElementById('ship-btn').disabled = true;
        document.getElementById('refactor-btn').disabled = true;
        document.getElementById('action-area').style.display = 'none';
        showSummary();
    }
}

function showSummary() {
    var bTotal = balancedTotal();
    var sTotal = alwaysShipTotal();

    var statsEl = document.getElementById('summary-stats');
    statsEl.innerHTML =
        '<div class="summary-stat yours">' +
            '<span class="stat-number">' + totalFeatures + '</span>' +
            '<span class="stat-desc">Your strategy</span>' +
        '</div>' +
        '<div class="summary-stat balanced">' +
            '<span class="stat-number">' + bTotal + '</span>' +
            '<span class="stat-desc">Balanced team (2:1 ship:refactor)</span>' +
        '</div>' +
        '<div class="summary-stat rush">' +
            '<span class="stat-number">' + sTotal + '</span>' +
            '<span class="stat-desc">Always-rush team</span>' +
        '</div>';

    var titleEl = document.getElementById('summary-title');
    var textEl = document.getElementById('summary-text');

    var shipCount = 0;
    var refactorCount = 0;
    for (var i = 0; i < playerHistory.length; i++) {
        if (playerHistory[i].action === 'ship') shipCount++;
        else refactorCount++;
    }

    titleEl.textContent = 'Experiment Complete \u2014 12 Sprints Played';

    var diff = totalFeatures - bTotal;
    var diffText = '';
    if (diff > 3) {
        diffText = 'You shipped ' + diff + ' more features than the balanced team. ';
    } else if (diff < -3) {
        diffText = 'The balanced team shipped ' + Math.abs(diff) + ' more features than you. ';
    } else {
        diffText = 'You matched the balanced team\'s output. ';
    }

    var debtWarning = '';
    if (currentDebt > 80) {
        debtWarning = 'Your team ended with ' + currentDebt +
            ' debt points \u2014 future sprints would continue slowing down. ';
    } else if (currentDebt > 30) {
        debtWarning = 'Your team has ' + currentDebt +
            ' debt remaining, which would moderately slow future work. ';
    } else {
        debtWarning = 'Your team ended with low debt (' + currentDebt +
            '), leaving them well-positioned for future sprints. ';
    }

    var lastVelocity = playerHistory[playerHistory.length - 1].velocity;
    var balancedLastVel = balancedHistory[balancedHistory.length - 1].velocity;

    textEl.textContent = 'You chose to ship fast ' + shipCount + ' times and refactor ' +
        refactorCount + ' times. ' + diffText + debtWarning +
        'Your ending velocity was ' + lastVelocity +
        ' features/sprint vs. the balanced team\'s ' + balancedLastVel +
        '. The key insight: teams that never refactor ship more early on, ' +
        'but the compounding drag of technical debt means they deliver less total ' +
        'over time \u2014 and leave behind a codebase that slows every future sprint.';

    document.getElementById('summary-panel').style.display = 'block';
    document.getElementById('sprint-result').style.display = 'none';
}

function updatePrediction() {
    var mod = velocityMod(currentDebt);
    var shipFeat = Math.round(BASE_VELOCITY * mod + RUSH_BONUS);
    var shipDebtAfter = currentDebt + DEBT_PER_SHIP;
    var refFeat = Math.round(BASE_VELOCITY * mod * REFACTOR_PRODUCTIVITY);
    var refDebtAfter = Math.max(0, currentDebt - DEBT_PAYDOWN);

    document.getElementById('prediction').innerHTML =
        '<span class="pred-ship">Ship \u2192 ~' + shipFeat +
        ' features, debt \u2192 ' + shipDebtAfter + '</span>' +
        '<span class="pred-refactor">Refactor \u2192 ~' + refFeat +
        ' features, debt \u2192 ' + refDebtAfter + '</span>';
}

// --- Controls ---

function initControls() {
    document.getElementById('ship-btn').addEventListener('click', shipFast);
    document.getElementById('refactor-btn').addEventListener('click', refactor);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
}

function resetGame() {
    currentSprint = 0;
    currentDebt = 0;
    totalFeatures = 0;
    playerHistory = [];
    gameOver = false;

    precomputeTeams();

    document.getElementById('ship-btn').disabled = false;
    document.getElementById('refactor-btn').disabled = false;
    document.getElementById('action-area').style.display = 'block';
    document.getElementById('sprint-info').innerHTML =
        'Sprint 1 of 12 &mdash; Choose your action:';
    document.getElementById('sprint-result').style.display = 'none';
    document.getElementById('summary-panel').style.display = 'none';
    document.getElementById('feature-total').innerHTML =
        'Features shipped: <strong>0</strong>';

    updatePrediction();
}
