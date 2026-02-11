const stages = [
    {
        name: 'Business Question',
        color: '#7c3aed',
        summary: 'Define the prediction goal',
        activities: [
            'Identify business problem suitable for prediction',
            'Define target variable (what to predict)',
            'Determine prediction horizon (how far ahead)',
            'Quantify business value of accurate predictions',
            'Set accuracy thresholds for go/no-go'
        ],
        artifacts: [
            'Problem statement document',
            'Target variable definition',
            'Success criteria and KPIs',
            'ROI estimate for predictive model',
            'Stakeholder alignment memo'
        ],
        hover: 'PM defines what prediction would create business value and how accuracy maps to impact.'
    },
    {
        name: 'Data Collection',
        color: '#3b82f6',
        summary: 'Gather and assess data sources',
        activities: [
            'Inventory available data sources',
            'Assess data quality and completeness',
            'Negotiate data access with engineering',
            'Evaluate privacy and compliance constraints',
            'Create data dictionary for key fields'
        ],
        artifacts: [
            'Data source inventory',
            'Data quality assessment report',
            'Data access agreements',
            'Privacy impact assessment',
            'Data dictionary'
        ],
        hover: 'PM catalogs available data, assesses quality, and ensures compliant access to training data.'
    },
    {
        name: 'Feature Engineering',
        color: '#14b8a6',
        summary: 'Create predictive signals',
        activities: [
            'Collaborate with data science on feature ideas',
            'Provide domain expertise for feature selection',
            'Review feature importance rankings',
            'Ensure features are available at prediction time',
            'Validate features don\'t introduce data leakage'
        ],
        artifacts: [
            'Feature specification document',
            'Feature importance analysis',
            'Data leakage audit results',
            'Feature availability timeline',
            'Domain knowledge contribution log'
        ],
        hover: 'PM contributes domain knowledge and validates that features are meaningful and available in production.'
    },
    {
        name: 'Model Training',
        color: '#22c55e',
        summary: 'Build and tune the model',
        activities: [
            'Review model selection rationale',
            'Understand tradeoffs (accuracy vs. interpretability)',
            'Participate in model review sessions',
            'Ensure fairness and bias checks',
            'Approve training/test data splits'
        ],
        artifacts: [
            'Model comparison report',
            'Training performance metrics',
            'Bias and fairness audit',
            'Model architecture documentation',
            'Hyperparameter tuning results'
        ],
        hover: 'PM reviews model choices, ensures fairness, and understands accuracy-interpretability tradeoffs.'
    },
    {
        name: 'Validation',
        color: '#f59e0b',
        summary: 'Test model reliability',
        activities: [
            'Review validation metrics (precision, recall, AUC)',
            'Assess performance across key segments',
            'Test model on held-out data and edge cases',
            'Conduct shadow deployment testing',
            'Get stakeholder sign-off on accuracy'
        ],
        artifacts: [
            'Validation performance report',
            'Segment-level accuracy breakdown',
            'Edge case test results',
            'Shadow deployment analysis',
            'Stakeholder approval document'
        ],
        hover: 'PM validates model performance meets business requirements and checks for segment-level fairness.'
    },
    {
        name: 'Deployment',
        color: '#ef4444',
        summary: 'Ship and monitor in production',
        activities: [
            'Define rollout plan (staged vs. full)',
            'Set up monitoring dashboards',
            'Create alerting for model drift',
            'Plan retraining cadence',
            'Document model for future teams'
        ],
        artifacts: [
            'Deployment runbook',
            'Monitoring dashboard',
            'Drift detection alerts',
            'Retraining schedule',
            'Model documentation and handoff'
        ],
        hover: 'PM manages the rollout, monitors production performance, and plans for model maintenance.'
    }
];

const grid = document.getElementById('pipelineGrid');
const tooltip = document.getElementById('tooltip');
const activityTitle = document.getElementById('activityTitle');
const activityBody = document.getElementById('activityBody');
const artifactTitle = document.getElementById('artifactTitle');
const artifactBody = document.getElementById('artifactBody');

stages.forEach((stage, i) => {
    const card = document.createElement('div');
    card.className = 'pipeline-card';
    card.style.borderColor = stage.color + '40';

    const num = document.createElement('div');
    num.className = 'card-number';
    num.style.background = stage.color;
    num.textContent = i + 1;

    const name = document.createElement('div');
    name.className = 'card-name';
    name.style.color = stage.color;
    name.textContent = stage.name;

    const summary = document.createElement('div');
    summary.className = 'card-summary';
    summary.textContent = stage.summary;

    card.appendChild(num);
    card.appendChild(name);
    card.appendChild(summary);

    // Arrows: right arrows for positions 0,1 (row 1) and 3,4 (row 2)
    if (i === 0 || i === 1 || i === 3 || i === 4) {
        const arrow = document.createElement('span');
        arrow.className = 'arrow-right';
        arrow.innerHTML = '&#9654;';
        card.appendChild(arrow);
    }

    // Down arrow from position 2 (end of row 1) to row 2
    if (i === 2) {
        const arrow = document.createElement('span');
        arrow.className = 'arrow-down';
        arrow.innerHTML = '&#9660;';
        card.appendChild(arrow);
    }

    // Click for detail panels
    card.addEventListener('click', () => {
        document.querySelectorAll('.pipeline-card').forEach(c => {
            c.classList.remove('active');
            c.style.borderColor = stages[Array.from(grid.children).indexOf(c)].color + '40';
        });
        card.classList.add('active');
        card.style.borderColor = stage.color;

        activityTitle.textContent = `${stage.name} - PM Activities`;
        activityTitle.style.color = stage.color;
        let aHtml = '<ul>';
        stage.activities.forEach(a => aHtml += `<li>${a}</li>`);
        aHtml += '</ul>';
        activityBody.innerHTML = aHtml;

        artifactTitle.textContent = `${stage.name} - Artifacts`;
        artifactTitle.style.color = stage.color;
        let fHtml = '<ul>';
        stage.artifacts.forEach(a => fHtml += `<li>${a}</li>`);
        fHtml += '</ul>';
        artifactBody.innerHTML = fHtml;
    });

    // Hover tooltip
    card.addEventListener('mouseenter', (e) => {
        tooltip.textContent = stage.hover;
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
