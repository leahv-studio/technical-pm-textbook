// ============================================
// A/B Test Calculator - Interactive MicroSim
// Chapter 12: Advanced Analytics and Experimentation
// ============================================

// --- Simulation State ---
var baselineRate = 0.05;
var mde = 0.01;
var dailyTraffic = 2000;

var animState = 'IDLE'; // IDLE, RUNNING, STOPPED, COMPLETE
var currentDay = 0;
var maxDays = 0;
var lastDayTime = 0;
var msPerDay = 400;

var controlVisitors = 0;
var controlConversions = 0;
var variantVisitors = 0;
var variantConversions = 0;

var observedControlRate = 0;
var observedVariantRate = 0;
var currentConfidence = 0;
var currentPValue = 1;
var confidenceHistory = [];

var requiredN = 0;
var estimatedDays = 0;

var significanceReachedDay = -1;

var canvasH = 420;

// --- Colors ---
var COL_CONTROL = [52, 152, 219];
var COL_VARIANT = [39, 174, 96];
var COL_THRESHOLD = [220, 60, 60];

// --- p5.js ---

function setup() {
    var container = document.getElementById('canvas-container');
    var canvas = createCanvas(container.offsetWidth, canvasH);
    canvas.parent('canvas-container');
    textFont('system-ui, sans-serif');
    initControls();
    calculateEstimate();
}

function windowResized() {
    var container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, canvasH);
}

function draw() {
    background(245, 247, 250);

    if (animState === 'RUNNING') {
        var now = millis();
        if (now - lastDayTime > msPerDay) {
            simulateDay();
            lastDayTime = now;
        }
    }

    drawProgressBar();
    drawConversionBars();
    drawConfidenceGauge();
    drawSparkline();

    if (animState === 'IDLE' && currentDay === 0) {
        drawIdleOverlay();
    }
}

// --- Simulation Logic ---

function simulateDay() {
    currentDay++;
    var nPerGroup = Math.floor(dailyTraffic / 2);

    // Control group conversions (normal approximation of binomial)
    var cMean = nPerGroup * baselineRate;
    var cStd = Math.sqrt(nPerGroup * baselineRate * (1 - baselineRate));
    var cConv = Math.round(randomGaussian(cMean, Math.max(cStd, 0.5)));
    cConv = constrain(cConv, 0, nPerGroup);

    // Variant group conversions
    var vRate = baselineRate + mde;
    var vMean = nPerGroup * vRate;
    var vStd = Math.sqrt(nPerGroup * vRate * (1 - vRate));
    var vConv = Math.round(randomGaussian(vMean, Math.max(vStd, 0.5)));
    vConv = constrain(vConv, 0, nPerGroup);

    controlVisitors += nPerGroup;
    controlConversions += cConv;
    variantVisitors += nPerGroup;
    variantConversions += vConv;

    // Observed rates
    observedControlRate = controlConversions / controlVisitors;
    observedVariantRate = variantConversions / variantVisitors;

    // Z-test for two proportions
    if (controlVisitors >= 10 && variantVisitors >= 10) {
        var p1 = observedControlRate;
        var p2 = observedVariantRate;
        var pPooled = (controlConversions + variantConversions) /
                      (controlVisitors + variantVisitors);
        var se = Math.sqrt(pPooled * (1 - pPooled) *
                 (1 / controlVisitors + 1 / variantVisitors));

        if (se > 0.0001) {
            var z = (p2 - p1) / se;
            currentPValue = 2 * (1 - normalCDF(Math.abs(z)));
            currentConfidence = Math.min(99.9, (1 - currentPValue) * 100);
        }
    }

    confidenceHistory.push(currentConfidence);

    if (significanceReachedDay < 0 && currentConfidence >= 95) {
        significanceReachedDay = currentDay;
    }

    updateStats();

    if (currentDay >= maxDays) {
        animState = 'COMPLETE';
        showComplete();
    }
}

function normalCDF(x) {
    var t = 1 / (1 + 0.2316419 * Math.abs(x));
    var d = 0.3989422804014327;
    var poly = t * (0.319381530 + t * (-0.356563782 +
               t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    var p = d * Math.exp(-x * x / 2) * poly;
    return x > 0 ? 1 - p : p;
}

function calculateEstimate() {
    var p1 = baselineRate;
    var p2 = baselineRate + mde;
    var zAlpha = 1.96;
    var zBeta = 0.84;
    requiredN = Math.ceil(
        Math.pow(zAlpha + zBeta, 2) *
        (p1 * (1 - p1) + p2 * (1 - p2)) /
        Math.pow(mde, 2)
    );
    var perGroupPerDay = Math.floor(dailyTraffic / 2);
    estimatedDays = Math.ceil(requiredN / perGroupPerDay);
    maxDays = Math.min(120, Math.max(10, Math.ceil(estimatedDays * 1.4)));

    // Adaptive animation speed: target ~16 seconds total
    msPerDay = constrain(Math.round(16000 / maxDays), 120, 600);

    updateEstimateDisplay();
}

// --- Canvas Drawing ---

function drawIdleOverlay() {
    push();
    fill(245, 247, 250, 180);
    noStroke();
    rect(0, 0, width, canvasH);
    fill(100, 120, 140);
    textAlign(CENTER, CENTER);
    textSize(15);
    text('Adjust parameters above, then click "Run Experiment"', width / 2, canvasH / 2);
    pop();
}

function drawProgressBar() {
    var x = 15;
    var y = 12;
    var barX = 220;
    var barW = width - barX - 20;

    push();
    fill(80, 100, 120);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(BOLD);
    if (currentDay > 0) {
        text('Day ' + currentDay + ' / ~' + estimatedDays + ' estimated', x, y + 10);
    } else {
        text('Experiment not started', x, y + 10);
    }

    // Progress bar background
    fill(220, 225, 230);
    rect(barX, y + 2, barW, 16, 8);

    // Progress bar fill
    if (currentDay > 0) {
        var progress = constrain(currentDay / maxDays, 0, 1);
        var fillColor = currentConfidence >= 95 ?
            color(39, 174, 96) : color(52, 152, 219);
        fill(fillColor);
        rect(barX, y + 2, barW * progress, 16, 8);
    }
    pop();
}

function drawConversionBars() {
    var sectionY = 48;
    var barStartX = 120;
    var barEndX = width - 150;
    var barW = barEndX - barStartX;
    var barH = 32;

    // Scale: max of expected rates * 2, at least 2%
    var maxScale = Math.max(
        (baselineRate + mde) * 2.2,
        observedControlRate * 1.5,
        observedVariantRate * 1.5,
        0.02
    );

    push();
    textSize(12);
    noStroke();

    // --- Control A ---
    var cy = sectionY + 12;
    fill(80, 100, 120);
    textAlign(RIGHT, CENTER);
    textStyle(BOLD);
    text('Control A', barStartX - 12, cy + barH / 2);

    // Bar background
    fill(230, 235, 240);
    rect(barStartX, cy, barW, barH, 4);

    // Bar fill
    if (currentDay > 0) {
        var cw = constrain(observedControlRate / maxScale, 0, 1) * barW;
        fill(COL_CONTROL[0], COL_CONTROL[1], COL_CONTROL[2]);
        rect(barStartX, cy, cw, barH, 4);

        // Rate label
        fill(80, 100, 120);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(13);
        text((observedControlRate * 100).toFixed(2) + '%', barStartX + cw + 8, cy + barH / 2);
    }

    // --- Variant B ---
    var vy = sectionY + 60;
    fill(80, 100, 120);
    textAlign(RIGHT, CENTER);
    textStyle(BOLD);
    textSize(12);
    text('Variant B', barStartX - 12, vy + barH / 2);

    // Bar background
    fill(230, 235, 240);
    rect(barStartX, vy, barW, barH, 4);

    // Bar fill
    if (currentDay > 0) {
        var vw = constrain(observedVariantRate / maxScale, 0, 1) * barW;
        fill(COL_VARIANT[0], COL_VARIANT[1], COL_VARIANT[2]);
        rect(barStartX, vy, vw, barH, 4);

        // Rate label
        fill(80, 100, 120);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(13);
        text((observedVariantRate * 100).toFixed(2) + '%', barStartX + vw + 8, vy + barH / 2);
    }

    // Baseline reference line
    if (currentDay > 0) {
        var refX = barStartX + constrain(baselineRate / maxScale, 0, 1) * barW;
        stroke(150, 160, 170);
        strokeWeight(1);
        drawingContext.setLineDash([4, 3]);
        line(refX, sectionY + 6, refX, sectionY + 98);
        drawingContext.setLineDash([]);
        noStroke();
        fill(150, 160, 170);
        textAlign(CENTER, TOP);
        textSize(10);
        textStyle(NORMAL);
        text('baseline', refX, sectionY + 100);
    }

    pop();
}

function drawConfidenceGauge() {
    var gx = width - 110;
    var gy = 48;
    var gw = 44;
    var gh = 108;

    push();
    // Gauge background
    fill(230, 235, 240);
    noStroke();
    rect(gx, gy, gw, gh, 6);

    // Gauge fill
    if (currentDay > 0) {
        var fillH = constrain(currentConfidence / 100, 0, 1) * gh;
        var gc;
        if (currentConfidence >= 95) {
            gc = color(39, 174, 96);
        } else if (currentConfidence >= 80) {
            gc = color(243, 156, 18);
        } else {
            gc = color(200, 210, 220);
        }
        fill(gc);
        rect(gx, gy + gh - fillH, gw, fillH, 0, 0, 6, 6);
        if (fillH > gh - 6) {
            rect(gx, gy, gw, fillH - (gh - 6), 6, 6, 0, 0);
        }
    }

    // 95% threshold line
    var threshY = gy + gh - (0.95 * gh);
    stroke(COL_THRESHOLD[0], COL_THRESHOLD[1], COL_THRESHOLD[2]);
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    line(gx - 6, threshY, gx + gw + 6, threshY);
    drawingContext.setLineDash([]);

    // 95% label
    noStroke();
    fill(COL_THRESHOLD[0], COL_THRESHOLD[1], COL_THRESHOLD[2]);
    textAlign(LEFT, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('95%', gx + gw + 8, threshY);

    // Current confidence label
    fill(80, 100, 120);
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    if (currentDay > 0) {
        text(Math.round(currentConfidence) + '%', gx + gw / 2, gy + gh + 6);
    }
    textStyle(NORMAL);
    textSize(10);
    fill(130, 140, 150);
    text('Confidence', gx + gw / 2, gy + gh + 20);
    pop();
}

function drawSparkline() {
    var chartX = 55;
    var chartY = 195;
    var chartW = width - chartX - 25;
    var chartH = 180;
    var chartBottom = chartY + chartH;

    push();
    // Title
    fill(80, 100, 120);
    noStroke();
    textAlign(LEFT, BOTTOM);
    textSize(12);
    textStyle(BOLD);
    text('Confidence Over Time', chartX, chartY - 6);

    // Chart background
    fill(255);
    stroke(220, 225, 230);
    strokeWeight(1);
    rect(chartX, chartY, chartW, chartH, 4);

    // Grid lines and Y labels
    textSize(9);
    textStyle(NORMAL);
    fill(160, 170, 180);
    textAlign(RIGHT, CENTER);
    var yLevels = [0, 25, 50, 75, 95, 100];
    for (var i = 0; i < yLevels.length; i++) {
        var ly = chartBottom - (yLevels[i] / 100) * chartH;
        stroke(235, 238, 242);
        strokeWeight(1);
        if (yLevels[i] === 95) {
            stroke(COL_THRESHOLD[0], COL_THRESHOLD[1], COL_THRESHOLD[2], 100);
            strokeWeight(2);
            drawingContext.setLineDash([6, 4]);
        }
        line(chartX + 1, ly, chartX + chartW - 1, ly);
        drawingContext.setLineDash([]);
        noStroke();
        if (yLevels[i] === 95) {
            fill(COL_THRESHOLD[0], COL_THRESHOLD[1], COL_THRESHOLD[2]);
        } else {
            fill(160, 170, 180);
        }
        text(yLevels[i] + '%', chartX - 5, ly);
    }

    // X axis label
    fill(160, 170, 180);
    textAlign(CENTER, TOP);
    textSize(10);
    text('Days', chartX + chartW / 2, chartBottom + 8);

    // Confidence line
    if (confidenceHistory.length > 1) {
        var xScale = chartW / Math.max(maxDays - 1, 1);

        // Fill under curve
        noStroke();
        fill(70, 180, 200, 25);
        beginShape();
        vertex(chartX, chartBottom);
        for (var j = 0; j < confidenceHistory.length; j++) {
            var px = chartX + j * xScale;
            var py = chartBottom - (confidenceHistory[j] / 100) * chartH;
            vertex(px, constrain(py, chartY, chartBottom));
        }
        vertex(chartX + (confidenceHistory.length - 1) * xScale, chartBottom);
        endShape(CLOSE);

        // Line
        noFill();
        stroke(30, 75, 105);
        strokeWeight(2);
        beginShape();
        for (var k = 0; k < confidenceHistory.length; k++) {
            var lx = chartX + k * xScale;
            var ly2 = chartBottom - (confidenceHistory[k] / 100) * chartH;
            vertex(lx, constrain(ly2, chartY, chartBottom));
        }
        endShape();

        // Current point
        var lastX = chartX + (confidenceHistory.length - 1) * xScale;
        var lastY = chartBottom - (currentConfidence / 100) * chartH;
        lastY = constrain(lastY, chartY, chartBottom);
        noStroke();
        fill(30, 75, 105);
        circle(lastX, lastY, 8);
        fill(255);
        circle(lastX, lastY, 4);
    }

    pop();
}

// --- UI Updates ---

function updateStats() {
    document.getElementById('stat-days').textContent = currentDay;
    document.getElementById('stat-sample').textContent = formatNumber(controlVisitors);
    document.getElementById('stat-control').textContent =
        (observedControlRate * 100).toFixed(2) + '%';
    document.getElementById('stat-variant').textContent =
        (observedVariantRate * 100).toFixed(2) + '%';

    var liftPP = (observedVariantRate - observedControlRate) * 100;
    var liftEl = document.getElementById('stat-lift');
    liftEl.textContent = (liftPP >= 0 ? '+' : '') + liftPP.toFixed(2) + ' pp';

    var confEl = document.getElementById('stat-confidence');
    confEl.textContent = Math.round(currentConfidence) + '%';

    var interpEl = document.getElementById('stat-interpretation');
    interpEl.textContent = pValueExplanation(currentConfidence);
    interpEl.className = 'stat-interpretation' +
        (currentConfidence >= 95 ? ' significant' : ' inconclusive');
}

function pValueExplanation(confidence) {
    if (confidence >= 99) {
        return 'Very strong evidence \u2014 the difference between groups is almost certainly real.';
    }
    if (confidence >= 95) {
        return 'Statistically significant \u2014 you can be confident the variant performs differently.';
    }
    if (confidence >= 90) {
        return 'Approaching significance \u2014 suggestive but not yet conclusive. Keep collecting.';
    }
    if (confidence >= 80) {
        return 'Some signal emerging, but too early to call. The result could still be noise.';
    }
    if (confidence >= 50) {
        return 'Inconclusive \u2014 the observed difference could easily be random chance.';
    }
    return 'No evidence of a difference yet \u2014 results are indistinguishable from random noise.';
}

function updateEstimateDisplay() {
    document.getElementById('est-n').textContent = formatNumber(requiredN);
    document.getElementById('est-days').textContent = estimatedDays;
}

function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showComplete() {
    document.getElementById('stats-panel').style.display = 'grid';
    document.getElementById('complete-panel').style.display = 'block';
    document.getElementById('warning-panel').style.display = 'none';

    var titleEl = document.getElementById('complete-title');
    var textEl = document.getElementById('complete-text');

    if (currentConfidence >= 95) {
        titleEl.textContent = 'Experiment Complete \u2014 Significant Result';
        textEl.textContent =
            'After ' + currentDay + ' days and ' + formatNumber(controlVisitors) +
            ' visitors per group, the experiment reached ' +
            Math.round(currentConfidence) + '% confidence. ' +
            'Variant B converted at ' + (observedVariantRate * 100).toFixed(2) +
            '% compared to Control A at ' + (observedControlRate * 100).toFixed(2) +
            '%. This difference is statistically significant and unlikely due to chance.';
    } else {
        titleEl.textContent = 'Experiment Complete \u2014 No Significant Difference';
        textEl.textContent =
            'After ' + currentDay + ' days, the experiment reached only ' +
            Math.round(currentConfidence) + '% confidence. ' +
            'The observed difference between groups is not statistically significant. ' +
            'This could mean the true effect is smaller than expected, or random ' +
            'variation obscured a real difference. Consider running longer or increasing traffic.';
        var panel = document.getElementById('complete-panel');
        panel.style.background = '#f0f3f6';
        panel.style.borderColor = '#a0a8b4';
        var h4 = panel.querySelector('h4');
        h4.style.color = '#4a5568';
        var p = panel.querySelector('p');
        p.style.color = '#4a5568';
    }

    document.getElementById('run-btn').disabled = true;
    document.getElementById('stop-btn').disabled = true;
}

function showEarlyStopWarning() {
    var pctComplete = Math.round((controlVisitors / requiredN) * 100);
    var warningText =
        'You stopped after ' + currentDay + ' day' + (currentDay !== 1 ? 's' : '') +
        ' with ' + formatNumber(controlVisitors) + ' visitors per group (' +
        pctComplete + '% of the ' + formatNumber(requiredN) + ' needed).\n\n' +
        'At ' + Math.round(currentConfidence) + '% confidence, there is a ' +
        Math.round(100 - currentConfidence) + '% chance this result is just noise. ' +
        'Early in an experiment, conversion rates swing wildly due to small samples. ' +
        'Results that look promising on day 3 often vanish by day 15.\n\n' +
        'Recommendation: Run experiments to their full calculated sample size (' +
        '~' + estimatedDays + ' days) before making product decisions.';

    document.getElementById('warning-text').textContent = warningText;
    document.getElementById('warning-panel').style.display = 'block';
}

// --- Controls ---

function initControls() {
    var baselineSlider = document.getElementById('baseline');
    var mdeSlider = document.getElementById('mde');
    var trafficSlider = document.getElementById('traffic');

    baselineSlider.addEventListener('input', function() {
        baselineRate = parseFloat(this.value) / 100;
        document.getElementById('baseline-val').textContent = this.value + '%';
        calculateEstimate();
    });

    mdeSlider.addEventListener('input', function() {
        mde = parseFloat(this.value) / 100;
        document.getElementById('mde-val').textContent = this.value + ' pp';
        calculateEstimate();
    });

    trafficSlider.addEventListener('input', function() {
        dailyTraffic = parseInt(this.value);
        document.getElementById('traffic-val').textContent = formatNumber(dailyTraffic);
        calculateEstimate();
    });

    document.getElementById('run-btn').addEventListener('click', startExperiment);
    document.getElementById('stop-btn').addEventListener('click', stopEarly);
    document.getElementById('reset-btn').addEventListener('click', resetExperiment);
}

function startExperiment() {
    if (animState === 'RUNNING') return;

    resetSimData();
    animState = 'RUNNING';
    lastDayTime = millis();

    document.getElementById('run-btn').disabled = true;
    document.getElementById('stop-btn').disabled = false;
    document.getElementById('stats-panel').style.display = 'grid';
    document.getElementById('warning-panel').style.display = 'none';
    document.getElementById('complete-panel').style.display = 'none';

    disableSliders(true);
}

function stopEarly() {
    if (animState !== 'RUNNING') return;

    animState = 'STOPPED';
    document.getElementById('stop-btn').disabled = true;
    document.getElementById('run-btn').disabled = true;
    showEarlyStopWarning();
}

function resetExperiment() {
    animState = 'IDLE';
    resetSimData();
    calculateEstimate();

    document.getElementById('run-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;
    document.getElementById('stats-panel').style.display = 'none';
    document.getElementById('warning-panel').style.display = 'none';
    document.getElementById('complete-panel').style.display = 'none';

    // Reset complete panel styling
    var panel = document.getElementById('complete-panel');
    panel.style.background = '';
    panel.style.borderColor = '';
    var h4 = panel.querySelector('h4');
    h4.style.color = '';
    var p = panel.querySelector('p');
    p.style.color = '';

    disableSliders(false);
}

function resetSimData() {
    currentDay = 0;
    controlVisitors = 0;
    controlConversions = 0;
    variantVisitors = 0;
    variantConversions = 0;
    observedControlRate = 0;
    observedVariantRate = 0;
    currentConfidence = 0;
    currentPValue = 1;
    confidenceHistory = [];
    significanceReachedDay = -1;
}

function disableSliders(disabled) {
    document.getElementById('baseline').disabled = disabled;
    document.getElementById('mde').disabled = disabled;
    document.getElementById('traffic').disabled = disabled;
}
