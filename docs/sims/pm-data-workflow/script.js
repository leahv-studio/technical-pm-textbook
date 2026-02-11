const stages = [
    {
        name: 'Ask Question',
        color: '#7c3aed',
        summary: 'Define what you need to know',
        description: 'The PM identifies a specific, answerable question tied to a product goal or user outcome.',
        activities: [
            'Frame hypotheses about user behavior',
            'Align question to business KPIs',
            'Define success criteria upfront',
            'Prioritize which questions matter most'
        ],
        flow: 'A well-framed question determines the data sources and methods needed downstream.'
    },
    {
        name: 'Gather Data',
        color: '#3b82f6',
        summary: 'Collect relevant data sources',
        description: 'The PM identifies and collects data from product analytics, surveys, interviews, and external sources.',
        activities: [
            'Pull analytics from tools (Amplitude, Mixpanel)',
            'Run user surveys or interviews',
            'Gather market and competitive data',
            'Check data availability and freshness'
        ],
        flow: 'Raw data flows into the preparation stage for cleaning and structuring.'
    },
    {
        name: 'Clean & Prepare',
        color: '#14b8a6',
        summary: 'Transform raw data for analysis',
        description: 'The PM ensures data quality by handling missing values, removing duplicates, and structuring datasets.',
        activities: [
            'Remove duplicates and outliers',
            'Handle missing or incomplete data',
            'Join data from multiple sources',
            'Create calculated fields and segments'
        ],
        flow: 'Clean, structured data enables reliable analysis and reduces bias in conclusions.'
    },
    {
        name: 'Analyze',
        color: '#22c55e',
        summary: 'Extract patterns and insights',
        description: 'The PM applies analytical methods to uncover trends, correlations, and actionable patterns.',
        activities: [
            'Segment users by behavior or demographics',
            'Calculate conversion rates and funnels',
            'Run cohort and retention analysis',
            'Identify statistical significance in A/B tests'
        ],
        flow: 'Analytical insights need visualization to be communicated effectively to stakeholders.'
    },
    {
        name: 'Visualize',
        color: '#f59e0b',
        summary: 'Communicate findings clearly',
        description: 'The PM creates charts, dashboards, and presentations that make insights accessible to all stakeholders.',
        activities: [
            'Build dashboards for ongoing metrics',
            'Create one-off charts for presentations',
            'Choose appropriate chart types for data',
            'Add context and annotations to visuals'
        ],
        flow: 'Compelling visualizations drive alignment and confidence in data-informed decisions.'
    },
    {
        name: 'Decide & Act',
        color: '#ef4444',
        summary: 'Make decisions and ship',
        description: 'The PM translates insights into product decisions, roadmap changes, or experiments.',
        activities: [
            'Prioritize features based on data evidence',
            'Design experiments to validate hypotheses',
            'Communicate decisions with data rationale',
            'Set up monitoring for outcome tracking'
        ],
        flow: 'Decisions generate new questions, restarting the cycle of inquiry and iteration.'
    }
];

const grid = document.getElementById('workflowGrid');
const tooltip = document.getElementById('tooltip');
const detailTitle = document.getElementById('detailTitle');
const detailBody = document.getElementById('detailBody');

stages.forEach((stage, i) => {
    const card = document.createElement('div');
    card.className = 'stage-card';
    card.style.borderColor = stage.color + '40';

    const num = document.createElement('div');
    num.className = 'stage-number';
    num.style.background = stage.color;
    num.textContent = i + 1;

    const name = document.createElement('div');
    name.className = 'stage-name';
    name.style.color = stage.color;
    name.textContent = stage.name;

    const summary = document.createElement('div');
    summary.className = 'stage-summary';
    summary.textContent = stage.summary;

    card.appendChild(num);
    card.appendChild(name);
    card.appendChild(summary);

    // Arrows between cards
    // Right arrows for positions 0,1 (first row) and 3,4 (second row)
    if (i === 0 || i === 1 || i === 3 || i === 4) {
        const arrow = document.createElement('span');
        arrow.className = 'arrow-right';
        arrow.innerHTML = '&#9654;';
        card.appendChild(arrow);
    }

    // Down arrow from position 2 to position 5 (right column wrap)
    if (i === 2) {
        const arrow = document.createElement('span');
        arrow.className = 'arrow-down';
        arrow.innerHTML = '&#9660;';
        card.appendChild(arrow);
    }

    // Click to show detail
    card.addEventListener('click', () => {
        document.querySelectorAll('.stage-card').forEach(c => {
            c.classList.remove('active');
            c.style.borderColor = stages[Array.from(grid.children).indexOf(c)].color + '40';
        });
        card.classList.add('active');
        card.style.borderColor = stage.color;

        detailTitle.textContent = stage.name;
        detailTitle.style.color = stage.color;
        let html = `<p>${stage.description}</p><ul>`;
        stage.activities.forEach(a => html += `<li>${a}</li>`);
        html += '</ul>';
        detailBody.innerHTML = html;
    });

    // Hover for flow info
    card.addEventListener('mouseenter', (e) => {
        tooltip.textContent = stage.flow;
        tooltip.classList.add('visible');
    });
    card.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    card.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });

    grid.appendChild(card);
});
