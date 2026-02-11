const stages = [
    {
        name: 'Hypothesize',
        color: '#7c3aed',
        artifacts: [
            'Hypothesis document (If X, then Y, because Z)',
            'Success metric definition',
            'Expected effect size estimate',
            'Minimum detectable effect (MDE)'
        ],
        pitfalls: [
            'Vague hypothesis without measurable outcome',
            'Testing too many variables at once',
            'No baseline data to compare against',
            'HiPPO-driven tests (Highest Paid Person\'s Opinion)'
        ],
        checklist: [
            'State null and alternative hypotheses',
            'Define primary and guardrail metrics',
            'Estimate required sample size',
            'Get stakeholder alignment'
        ]
    },
    {
        name: 'Design',
        color: '#3b82f6',
        artifacts: [
            'Experiment design document',
            'Variant mockups (control + treatment)',
            'Randomization unit selection',
            'Sample size and power calculation'
        ],
        pitfalls: [
            'Insufficient sample size for effect detection',
            'Not accounting for novelty effects',
            'Missing interaction effects with other tests',
            'Poorly defined control group'
        ],
        checklist: [
            'Calculate minimum sample size',
            'Define randomization unit (user, session, org)',
            'Plan for holdout groups',
            'Document exclusion criteria'
        ]
    },
    {
        name: 'Instrument',
        color: '#14b8a6',
        artifacts: [
            'Event tracking specifications',
            'QA test plan for both variants',
            'Feature flag configuration',
            'Logging and data pipeline setup'
        ],
        pitfalls: [
            'Missing event tracking on key interactions',
            'Feature flags leaking between variants',
            'Not testing both variants end-to-end',
            'Data pipeline delays causing stale results'
        ],
        checklist: [
            'Verify event tracking fires correctly',
            'Test feature flag assignment is sticky',
            'Confirm data reaches analytics tool',
            'Validate no cross-contamination'
        ]
    },
    {
        name: 'Run',
        color: '#22c55e',
        artifacts: [
            'Monitoring dashboard',
            'Daily health check reports',
            'Guardrail metric alerts',
            'Run duration timeline'
        ],
        pitfalls: [
            'Peeking at results and stopping early',
            'Running too short (underpowered results)',
            'Not monitoring for bugs or regressions',
            'Ignoring day-of-week or seasonal effects'
        ],
        checklist: [
            'Let test run for full planned duration',
            'Monitor guardrail metrics daily',
            'Check for sample ratio mismatch (SRM)',
            'Document any external events'
        ]
    },
    {
        name: 'Analyze',
        color: '#f59e0b',
        artifacts: [
            'Statistical analysis report',
            'Confidence interval calculations',
            'Segment-level breakdowns',
            'Effect size and practical significance'
        ],
        pitfalls: [
            'Cherry-picking favorable segments',
            'Ignoring multiple comparison corrections',
            'Confusing statistical and practical significance',
            'Not checking for Simpson\'s paradox'
        ],
        checklist: [
            'Calculate p-value and confidence intervals',
            'Check practical significance (not just statistical)',
            'Analyze key segments for heterogeneous effects',
            'Review guardrail metrics for regressions'
        ]
    },
    {
        name: 'Decide',
        color: '#ef4444',
        artifacts: [
            'Decision document with rationale',
            'Rollout plan (if shipping)',
            'Learning summary for the team',
            'Follow-up experiment ideas'
        ],
        pitfalls: [
            'Shipping despite inconclusive results',
            'Not documenting learnings from failures',
            'Ignoring long-term metric effects',
            'No follow-up plan for winning variants'
        ],
        checklist: [
            'Make ship/no-ship/iterate decision',
            'Document reasoning and evidence',
            'Plan gradual rollout if shipping',
            'Identify next hypotheses to test'
        ]
    }
];

const workflowRow = document.getElementById('workflowRow');
const tooltip = document.getElementById('tooltip');
const artifactTitle = document.getElementById('artifactTitle');
const artifactBody = document.getElementById('artifactBody');
const pitfallTitle = document.getElementById('pitfallTitle');
const pitfallBody = document.getElementById('pitfallBody');

stages.forEach((stage, i) => {
    const card = document.createElement('div');
    card.className = 'stage-card';
    card.style.borderColor = stage.color + '40';

    const dot = document.createElement('div');
    dot.className = 'stage-dot';
    dot.style.background = stage.color;
    dot.textContent = i + 1;

    const name = document.createElement('div');
    name.className = 'stage-name';
    name.style.color = stage.color;
    name.textContent = stage.name;

    const preview = document.createElement('div');
    preview.className = 'stage-artifacts-preview';
    preview.textContent = stage.artifacts[0].split('(')[0].trim();

    card.appendChild(dot);
    card.appendChild(name);
    card.appendChild(preview);

    if (i < stages.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'arrow-connector';
        arrow.innerHTML = '&#9654;';
        card.appendChild(arrow);
    }

    // Click for detail panels
    card.addEventListener('click', () => {
        document.querySelectorAll('.stage-card').forEach(c => {
            c.classList.remove('active');
            c.style.borderColor = stages[Array.from(workflowRow.children).indexOf(c)].color + '40';
        });
        card.classList.add('active');
        card.style.borderColor = stage.color;

        artifactTitle.textContent = `${stage.name} - Artifacts`;
        artifactTitle.style.color = stage.color;
        let aHtml = '<ul>';
        stage.artifacts.forEach(a => aHtml += `<li>${a}</li>`);
        aHtml += '</ul>';
        artifactBody.innerHTML = aHtml;

        pitfallTitle.textContent = `${stage.name} - Pitfalls`;
        pitfallTitle.style.color = stage.color;
        let pHtml = '<ul>';
        stage.pitfalls.forEach(p => pHtml += `<li>${p}</li>`);
        pHtml += '</ul>';
        pitfallBody.innerHTML = pHtml;
    });

    // Hover for checklist
    card.addEventListener('mouseenter', (e) => {
        let html = `<strong>${stage.name} Checklist:</strong><br>`;
        stage.checklist.forEach(c => html += `&bull; ${c}<br>`);
        tooltip.innerHTML = html;
        tooltip.classList.add('visible');
    });
    card.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    card.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });

    workflowRow.appendChild(card);
});
