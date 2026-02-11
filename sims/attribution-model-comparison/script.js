const touchpoints = [
    { name: 'Blog', color: '#7c3aed' },
    { name: 'Social Ad', color: '#3b82f6' },
    { name: 'Webinar', color: '#14b8a6' },
    { name: 'Email', color: '#f59e0b' },
    { name: 'Direct Visit', color: '#ef4444' }
];

const models = [
    {
        name: 'Last-Touch',
        credits: [0, 0, 0, 0, 100],
        description: 'Assigns 100% credit to the last touchpoint before conversion.'
    },
    {
        name: 'First-Touch',
        credits: [100, 0, 0, 0, 0],
        description: 'Assigns 100% credit to the first touchpoint in the journey.'
    },
    {
        name: 'Linear',
        credits: [20, 20, 20, 20, 20],
        description: 'Distributes credit equally across all touchpoints.'
    },
    {
        name: 'Time-Decay',
        credits: [5, 10, 15, 30, 40],
        description: 'Gives more credit to touchpoints closer to conversion.'
    },
    {
        name: 'Position-Based',
        credits: [40, 6.7, 6.6, 6.7, 40],
        description: 'Assigns 40% to first and last, remaining 20% split among middle.'
    },
    {
        name: 'Data-Driven',
        credits: [15, 25, 30, 20, 10],
        description: 'Uses algorithmic analysis to assign credit based on actual impact.'
    }
];

let activeModel = null;

const journeyTimeline = document.getElementById('journeyTimeline');
const modelSelector = document.getElementById('modelSelector');
const chartArea = document.getElementById('chartArea');
const legend = document.getElementById('legend');
const tooltip = document.getElementById('tooltip');

// Render journey timeline
touchpoints.forEach((tp, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'step-wrapper';

    const dot = document.createElement('div');
    dot.className = 'step-dot';
    dot.style.background = tp.color;
    dot.textContent = tp.name;

    wrapper.appendChild(dot);

    const step = document.createElement('div');
    step.className = 'journey-step';
    step.appendChild(wrapper);

    if (i < touchpoints.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'step-connector';
        step.appendChild(connector);
    }

    journeyTimeline.appendChild(step);
});

// Render model selector buttons
models.forEach((model, i) => {
    const btn = document.createElement('button');
    btn.className = 'model-btn';
    btn.textContent = model.name;

    btn.addEventListener('click', () => {
        if (activeModel === i) {
            activeModel = null;
            btn.classList.remove('active');
        } else {
            activeModel = i;
            document.querySelectorAll('.model-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        renderChart();
    });

    modelSelector.appendChild(btn);
});

// Render chart
function renderChart() {
    chartArea.innerHTML = '';

    models.forEach((model, mi) => {
        const group = document.createElement('div');
        group.className = 'bar-group';

        if (activeModel !== null && activeModel !== mi) {
            group.classList.add('dimmed');
        }
        if (activeModel === mi) {
            group.classList.add('highlighted');
        }

        const label = document.createElement('div');
        label.className = 'bar-group-label';
        label.textContent = model.name;

        const track = document.createElement('div');
        track.className = 'bar-track';

        model.credits.forEach((credit, ci) => {
            if (credit <= 0) return;

            const seg = document.createElement('div');
            seg.className = 'bar-segment';
            seg.style.width = credit + '%';
            seg.style.background = touchpoints[ci].color;

            if (credit >= 8) {
                const text = document.createElement('span');
                text.className = 'bar-segment-text';
                text.textContent = Math.round(credit) + '%';
                seg.appendChild(text);
            }

            seg.addEventListener('mouseenter', (e) => {
                tooltip.innerHTML = `<strong>${touchpoints[ci].name}</strong><br>${model.name}: ${credit}% credit<br><br><em>${model.description}</em>`;
                tooltip.classList.add('visible');
            });
            seg.addEventListener('mousemove', (e) => {
                tooltip.style.left = (e.clientX + 14) + 'px';
                tooltip.style.top = (e.clientY - 10) + 'px';
            });
            seg.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });

            track.appendChild(seg);
        });

        group.appendChild(label);
        group.appendChild(track);
        chartArea.appendChild(group);
    });
}

// Render legend
touchpoints.forEach(tp => {
    const item = document.createElement('div');
    item.className = 'legend-item';

    const swatch = document.createElement('div');
    swatch.className = 'legend-swatch';
    swatch.style.background = tp.color;

    const text = document.createTextNode(tp.name);

    item.appendChild(swatch);
    item.appendChild(text);
    legend.appendChild(item);
});

renderChart();
