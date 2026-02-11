const stages = [
    {
        name: 'Landing Page',
        visitors: 10000,
        rate: null,
        color: '#1e4b69',
        dropReason: 'Bounce rate from irrelevant traffic, slow page load, unclear value proposition'
    },
    {
        name: 'Start Trial',
        visitors: 4200,
        rate: 42,
        color: '#245a7a',
        dropReason: 'Friction in CTA placement, lack of social proof, pricing concerns'
    },
    {
        name: 'Registration',
        visitors: 3100,
        rate: 74,
        color: '#2a6a8c',
        dropReason: 'Long registration forms, requiring credit card upfront, unclear trial benefits'
    },
    {
        name: 'Email Verified',
        visitors: 2800,
        rate: 90,
        color: '#307a9e',
        dropReason: 'Emails landing in spam, delayed verification emails, user abandonment'
    },
    {
        name: 'Onboarding Complete',
        visitors: 1400,
        rate: 50,
        color: '#368ab0',
        dropReason: 'Complex onboarding steps, lack of guided tours, no quick-win moment'
    },
    {
        name: 'Activated User',
        visitors: 980,
        rate: 70,
        color: '#3c9ac2',
        dropReason: 'Feature discovery gaps, missing integrations, no aha moment reached'
    }
];

const baselineVisitors = stages.map(s => s.visitors);
const baselineRates = stages.map(s => s.rate);
const maxVisitors = stages[0].visitors;

const funnelContainer = document.getElementById('funnelContainer');
const tooltip = document.getElementById('tooltip');
const stageSelect = document.getElementById('stageSelect');
const rateSlider = document.getElementById('rateSlider');
const rateValue = document.getElementById('rateValue');
const whatifResult = document.getElementById('whatifResult');

function getRateClass(rate) {
    if (rate === null) return '';
    if (rate >= 70) return 'rate-green';
    if (rate >= 40) return 'rate-yellow';
    return 'rate-red';
}

function formatNumber(n) {
    return n.toLocaleString();
}

function renderFunnel(data) {
    funnelContainer.innerHTML = '';
    data.forEach((stage, i) => {
        const row = document.createElement('div');
        row.className = 'funnel-row';

        const label = document.createElement('div');
        label.className = 'funnel-label';
        label.textContent = stage.name;

        const barWrapper = document.createElement('div');
        barWrapper.className = 'funnel-bar-wrapper';

        const bar = document.createElement('div');
        bar.className = 'funnel-bar';
        const widthPct = Math.max((stage.visitors / maxVisitors) * 100, 8);
        bar.style.width = widthPct + '%';
        bar.style.background = `linear-gradient(135deg, ${stage.color}, ${stage.color}dd)`;

        const barText = document.createElement('span');
        barText.className = 'funnel-bar-text';
        barText.textContent = formatNumber(Math.round(stage.visitors));
        bar.appendChild(barText);

        barWrapper.appendChild(bar);

        const rateDiv = document.createElement('div');
        rateDiv.className = 'funnel-rate';
        if (stage.rate !== null) {
            const badge = document.createElement('span');
            badge.className = 'rate-badge ' + getRateClass(stage.rate);
            badge.textContent = Math.round(stage.rate) + '%';
            rateDiv.appendChild(badge);
        }

        row.appendChild(label);
        row.appendChild(barWrapper);
        row.appendChild(rateDiv);

        row.addEventListener('mouseenter', (e) => {
            let html = `<strong>${stage.name}</strong><br>`;
            html += `Visitors: ${formatNumber(Math.round(stage.visitors))}<br>`;
            if (stage.rate !== null) {
                html += `Conversion: ${Math.round(stage.rate)}%<br>`;
                const dropped = data[i - 1].visitors - stage.visitors;
                html += `Drop-off: ${formatNumber(Math.round(dropped))}<br>`;
            }
            html += `<br><em>Drop-off reasons:</em><br>${stage.dropReason}`;
            tooltip.innerHTML = html;
            tooltip.classList.add('visible');
        });

        row.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.clientX + 14) + 'px';
            tooltip.style.top = (e.clientY - 10) + 'px';
        });

        row.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });

        funnelContainer.appendChild(row);
    });
}

// Populate select
stages.forEach((stage, i) => {
    if (i === 0) return;
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = stage.name;
    stageSelect.appendChild(opt);
});

function recalculate() {
    const idx = parseInt(stageSelect.value);
    const newRate = parseInt(rateSlider.value);
    rateValue.textContent = newRate + '%';

    const newData = stages.map((s, i) => ({ ...s }));

    // Apply new rate at selected stage
    newData[idx].rate = newRate;
    newData[idx].visitors = newData[idx - 1].visitors * (newRate / 100);

    // Cascade: subsequent stages keep their original rates applied to new upstream numbers
    for (let i = idx + 1; i < newData.length; i++) {
        newData[i].visitors = newData[i - 1].visitors * (baselineRates[i] / 100);
        newData[i].rate = baselineRates[i];
    }

    renderFunnel(newData);

    const originalFinal = baselineVisitors[baselineVisitors.length - 1];
    const newFinal = Math.round(newData[newData.length - 1].visitors);
    const delta = newFinal - originalFinal;
    const deltaClass = delta >= 0 ? 'whatif-delta-positive' : 'whatif-delta-negative';
    const sign = delta >= 0 ? '+' : '';

    whatifResult.innerHTML =
        `Changing <strong>${newData[idx].name}</strong> conversion to <strong>${newRate}%</strong> ` +
        `(baseline: ${baselineRates[idx]}%) results in <strong>${formatNumber(newFinal)}</strong> activated users ` +
        `(<span class="${deltaClass}">${sign}${formatNumber(delta)}</span> vs. baseline ${formatNumber(originalFinal)}).`;
}

stageSelect.addEventListener('change', () => {
    const idx = parseInt(stageSelect.value);
    rateSlider.value = baselineRates[idx];
    rateValue.textContent = baselineRates[idx] + '%';
    recalculate();
});

rateSlider.addEventListener('input', recalculate);

// Initial render
renderFunnel(stages);
recalculate();
