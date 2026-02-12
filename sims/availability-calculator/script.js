// ============================================
// Availability & Downtime Calculator
// Chapter 4: System Architecture Fundamentals
// ============================================

var CANVAS_H = 300;

// Availability tiers
var TIERS = [
    { pct: 90,     label: '90%',     nines: 'One Nine',    downYearMin: 525960, color: [239, 68, 68],   engCost: 'Minimal' },
    { pct: 99,     label: '99%',     nines: 'Two Nines',   downYearMin: 5256,   color: [234, 88, 12],   engCost: 'Low' },
    { pct: 99.9,   label: '99.9%',   nines: 'Three Nines', downYearMin: 525.6,  color: [245, 158, 11],  engCost: 'Moderate' },
    { pct: 99.95,  label: '99.95%',  nines: 'Three and a Half Nines', downYearMin: 262.8, color: [70, 180, 200], engCost: 'Significant' },
    { pct: 99.99,  label: '99.99%',  nines: 'Four Nines',  downYearMin: 52.56,  color: [34, 197, 94],   engCost: 'High' },
    { pct: 99.999, label: '99.999%', nines: 'Five Nines',  downYearMin: 5.256,  color: [22, 163, 74],   engCost: 'Very High' },
    { pct: 99.9999,label: '99.9999%',nines: 'Six Nines',   downYearMin: 0.5256, color: [21, 128, 61],   engCost: 'Extreme' }
];

var REVENUE_LEVELS = [1000, 5000, 10000, 50000, 100000, 1000000];
var REVENUE_LABELS = ['$1K', '$5K', '$10K', '$50K', '$100K', '$1M'];

var currentTier = 2;
var currentRevenue = 2;
var animatedBarHeights = [];

function setup() {
    var container = document.getElementById('canvas-container');
    var canvas = createCanvas(container.offsetWidth, CANVAS_H);
    canvas.parent('canvas-container');
    textFont('Segoe UI, system-ui, sans-serif');

    for (var i = 0; i < TIERS.length; i++) {
        animatedBarHeights.push(0);
    }

    document.getElementById('avail-slider').addEventListener('input', onSliderChange);
    document.getElementById('revenue-slider').addEventListener('input', onSliderChange);
    onSliderChange();
}

function windowResized() {
    var container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, CANVAS_H);
}

function onSliderChange() {
    currentTier = parseInt(document.getElementById('avail-slider').value);
    currentRevenue = parseInt(document.getElementById('revenue-slider').value);

    var tier = TIERS[currentTier];
    document.getElementById('avail-value').textContent = tier.label;
    document.getElementById('revenue-value').textContent = REVENUE_LABELS[currentRevenue];

    updateMetrics();
}

function updateMetrics() {
    var tier = TIERS[currentTier];
    var revenuePerHour = REVENUE_LEVELS[currentRevenue];
    var downMinYear = tier.downYearMin;
    var downMinMonth = downMinYear / 12;

    // Badge
    var badge = document.getElementById('nines-badge');
    badge.textContent = tier.nines;
    badge.style.background = 'rgb(' + tier.color[0] + ',' + tier.color[1] + ',' + tier.color[2] + ')';
    document.getElementById('nines-pct').textContent = tier.label;

    // Downtime per year
    document.getElementById('dt-year').textContent = formatDuration(downMinYear);
    var dtYearEl = document.getElementById('dt-year');
    dtYearEl.className = 'dt-value' + (downMinYear > 500 ? ' danger' : downMinYear > 50 ? ' warning' : ' good');

    // Downtime per month
    document.getElementById('dt-month').textContent = formatDuration(downMinMonth);
    var dtMonthEl = document.getElementById('dt-month');
    dtMonthEl.className = 'dt-value' + (downMinMonth > 40 ? ' danger' : downMinMonth > 5 ? ' warning' : ' good');

    // Revenue lost
    var revLost = (downMinYear / 60) * revenuePerHour;
    document.getElementById('dt-revenue').textContent = formatMoney(revLost);
    var dtRevEl = document.getElementById('dt-revenue');
    dtRevEl.className = 'dt-value' + (revLost > 500000 ? ' danger' : revLost > 50000 ? ' warning' : '');

    // Engineering cost
    document.getElementById('dt-eng-cost').textContent = tier.engCost;
    var engEl = document.getElementById('dt-eng-cost');
    engEl.className = 'dt-value' + (currentTier >= 5 ? ' warning' : '');

    // SLA text
    updateSLAText(tier, revenuePerHour, downMinYear, revLost);
}

function updateSLAText(tier, revenuePerHour, downMinYear, revLost) {
    var el = document.getElementById('sla-text');

    if (currentTier === 0) {
        el.textContent = 'At 90% availability, your system can be down for over 36 days per year \u2014 nearly an hour and a half every single day. This is unacceptable for any customer-facing product. At ' + REVENUE_LABELS[currentRevenue] + '/hour in revenue, you would lose ' + formatMoney(revLost) + ' per year to downtime alone. No enterprise customer would sign an SLA at this level. This is typical of early prototypes or internal tools with no availability requirements.';
    } else if (currentTier === 1) {
        el.textContent = 'At 99% availability (two nines), your system can be down for about 3.6 days per year or 7+ hours per month. This allows for planned maintenance windows and occasional outages. Costing ' + formatMoney(revLost) + '/year in lost revenue at ' + REVENUE_LABELS[currentRevenue] + '/hour, this tier is common for internal tools and non-critical services. Most SaaS customers expect better than this for production services.';
    } else if (currentTier === 2) {
        el.textContent = 'At 99.9% availability (three nines), downtime is limited to about 8 hours and 46 minutes per year. This is the most common SLA target for standard SaaS products. It allows for brief planned maintenance and the occasional incident, while keeping annual revenue loss to ' + formatMoney(revLost) + '. Achieving three nines requires basic redundancy, health checks, and automated failover \u2014 moderate engineering investment.';
    } else if (currentTier === 3) {
        el.textContent = 'At 99.95% availability, you have about 4.4 hours of downtime per year \u2014 roughly 22 minutes per month. This is a common target for business-critical SaaS products. Revenue impact drops to ' + formatMoney(revLost) + '/year. Reaching this level requires redundant infrastructure across availability zones, automated failover, blue-green deployments, and proactive monitoring. The jump from three nines to 99.95% typically requires dedicated site reliability engineering (SRE) investment.';
    } else if (currentTier === 4) {
        el.textContent = 'At 99.99% availability (four nines), you allow only 52 minutes of downtime per year \u2014 about 4 minutes per month. At ' + REVENUE_LABELS[currentRevenue] + '/hour, that is ' + formatMoney(revLost) + ' in annual lost revenue. Four nines is the standard for financial services, healthcare platforms, and enterprise infrastructure. It requires multi-region redundancy, zero-downtime deployments, chaos engineering practices, and 24/7 on-call rotations. The engineering cost jumps significantly here.';
    } else if (currentTier === 5) {
        el.textContent = 'At 99.999% availability (five nines), you allow only 5 minutes and 15 seconds of downtime per year \u2014 just 26 seconds per month. Revenue protection at ' + REVENUE_LABELS[currentRevenue] + '/hour means ' + formatMoney(revLost) + ' saved versus lower tiers. Five nines is the gold standard for critical infrastructure: payment processing, telecommunications, emergency services. It demands globally distributed active-active architecture, automated everything, and extraordinary engineering discipline. Very few organizations achieve this consistently.';
    } else {
        el.textContent = 'At 99.9999% availability (six nines), downtime is limited to 31.5 seconds per year. This is the domain of core internet infrastructure and safety-critical systems. The engineering cost is extreme \u2014 requiring custom hardware, multiple redundant data centers, and teams of specialized reliability engineers. At ' + REVENUE_LABELS[currentRevenue] + '/hour, the revenue protection (' + formatMoney(revLost) + ' saved) must justify the multi-million-dollar infrastructure investment. Very few systems in the world maintain six nines.';
    }
}

function formatDuration(minutes) {
    if (minutes >= 1440) {
        var days = Math.floor(minutes / 1440);
        var hrs = Math.floor((minutes % 1440) / 60);
        return days + 'd ' + hrs + 'h';
    } else if (minutes >= 60) {
        var h = Math.floor(minutes / 60);
        var m = Math.floor(minutes % 60);
        return h + 'h ' + m + 'm';
    } else if (minutes >= 1) {
        var mi = Math.floor(minutes);
        var s = Math.round((minutes - mi) * 60);
        return mi + 'm ' + s + 's';
    } else {
        return Math.round(minutes * 60) + 's';
    }
}

function formatMoney(val) {
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + Math.round(val).toLocaleString();
    return '$' + Math.round(val);
}

// --- Drawing ---

function draw() {
    background(245, 247, 250);
    drawUptimeBar();
    drawTierComparison();
}

function drawUptimeBar() {
    var tier = TIERS[currentTier];
    var barX = 50;
    var barY = 30;
    var barW = width - 100;
    var barH = 30;

    push();

    // Background bar (downtime portion)
    fill(239, 68, 68, 40);
    noStroke();
    rect(barX, barY, barW, barH, 6);

    // Uptime fill
    var uptimeFrac = tier.pct / 100;
    var fillW = barW * uptimeFrac;
    fill(tier.color[0], tier.color[1], tier.color[2]);
    rect(barX, barY, fillW, barH, 6, 0, 0, 6);

    // Labels
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    if (fillW > 60) {
        text('Uptime: ' + tier.label, barX + fillW / 2, barY + barH / 2);
    }
    textStyle(NORMAL);

    // Downtime label on right
    var downtimeW = barW - fillW;
    if (downtimeW > 40) {
        fill(239, 68, 68);
        textSize(9);
        text('Down', barX + fillW + downtimeW / 2, barY + barH / 2);
    }

    // Title
    fill(80, 100, 120);
    textAlign(LEFT, BOTTOM);
    textSize(11);
    textStyle(BOLD);
    text('Uptime vs. Downtime', barX, barY - 6);
    textStyle(NORMAL);

    pop();
}

function drawTierComparison() {
    var chartX = 50;
    var chartY = 90;
    var chartW = width - 100;
    var chartH = CANVAS_H - 110;
    var barCount = TIERS.length;
    var barGap = 12;
    var barW = (chartW - (barCount - 1) * barGap) / barCount;

    push();

    // Title
    fill(80, 100, 120);
    textAlign(LEFT, BOTTOM);
    textSize(11);
    textStyle(BOLD);
    text('Annual Downtime Comparison (log scale)', chartX, chartY - 6);
    textStyle(NORMAL);

    // Max downtime for scaling (use log)
    var maxLog = Math.log10(TIERS[0].downYearMin + 1);

    for (var i = 0; i < barCount; i++) {
        var bx = chartX + i * (barW + barGap);
        var t = TIERS[i];

        // Target height (log scale)
        var logVal = t.downYearMin > 0 ? Math.log10(t.downYearMin + 1) : 0;
        var targetH = (logVal / maxLog) * (chartH - 30);

        // Animate
        animatedBarHeights[i] = lerp(animatedBarHeights[i], targetH, 0.1);
        var h = animatedBarHeights[i];

        // Highlight current tier
        var isSelected = (i === currentTier);

        // Bar
        noStroke();
        if (isSelected) {
            fill(t.color[0], t.color[1], t.color[2]);
        } else {
            fill(t.color[0], t.color[1], t.color[2], 100);
        }
        rect(bx, chartY + chartH - h, barW, h, 4, 4, 0, 0);

        // Selection indicator
        if (isSelected) {
            stroke(t.color[0], t.color[1], t.color[2]);
            strokeWeight(2);
            noFill();
            rect(bx - 2, chartY + chartH - h - 2, barW + 4, h + 4, 6, 6, 2, 2);
        }

        // Label below
        noStroke();
        fill(isSelected ? color(t.color[0], t.color[1], t.color[2]) : color(140, 150, 160));
        textAlign(CENTER, TOP);
        textSize(isSelected ? 10 : 9);
        textStyle(isSelected ? BOLD : NORMAL);
        text(t.label, bx + barW / 2, chartY + chartH + 4);

        // Duration above bar
        if (isSelected) {
            fill(t.color[0], t.color[1], t.color[2]);
            textAlign(CENTER, BOTTOM);
            textSize(9);
            textStyle(BOLD);
            text(formatDuration(t.downYearMin), bx + barW / 2, chartY + chartH - h - 4);
            textStyle(NORMAL);
        }
    }

    // Baseline
    stroke(200, 210, 220);
    strokeWeight(1);
    line(chartX, chartY + chartH, chartX + chartW, chartY + chartH);

    pop();
}
