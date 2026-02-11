const featureItems = [
    [
        { id: 'f-q1-1', name: 'Self-serve Onboarding', effort: 'L', quarter: 'Q1', desc: 'Allow users to sign up, configure their workspace, and invite teammates without manual intervention. Reduces onboarding time from 2 days to 30 minutes.' },
        { id: 'f-q1-2', name: 'Notification Prefs', effort: 'S', quarter: 'Q1', desc: 'User-configurable notification settings for email, in-app, and push channels. Reduces notification fatigue and support tickets.' }
    ],
    [
        { id: 'f-q2-1', name: 'Team Dashboards', effort: 'M', quarter: 'Q2', desc: 'Customizable dashboards showing team metrics, project status, and KPIs. Enables managers to track progress without status meetings.' },
        { id: 'f-q2-2', name: 'API Marketplace', effort: 'L', quarter: 'Q2', desc: 'Public marketplace for third-party integrations and API extensions. Drives ecosystem growth and reduces custom integration requests.' }
    ],
    [
        { id: 'f-q3-1', name: 'Enterprise SSO', effort: 'L', quarter: 'Q3', desc: 'SAML and OIDC single sign-on support for enterprise customers. Required for enterprise tier pricing and compliance.' },
        { id: 'f-q3-2', name: 'Custom Reporting', effort: 'M', quarter: 'Q3', desc: 'Drag-and-drop report builder with custom date ranges, filters, and export options. Top-requested feature from enterprise customers.' }
    ],
    [
        { id: 'f-q4-1', name: 'Mobile App v2', effort: 'XL', quarter: 'Q4', desc: 'Complete redesign of mobile experience with offline mode, push notifications, and feature parity with web app.' },
        { id: 'f-q4-2', name: 'AI Insights', effort: 'L', quarter: 'Q4', desc: 'AI-powered analytics that surface trends, anomalies, and recommendations. Uses ML models to predict churn and identify growth opportunities.' }
    ]
];

const techItems = [
    [
        { id: 't-q1-1', name: 'Database Migration', effort: 'XL', quarter: 'Q1', desc: 'Migrate from PostgreSQL single-instance to distributed Aurora cluster. Enables horizontal scaling and 99.99% uptime SLA.' },
        { id: 't-q1-2', name: 'CI/CD Improvements', effort: 'M', quarter: 'Q1', desc: 'Reduce build times from 20 min to 5 min. Add automated staging deployments, canary releases, and rollback capabilities.' }
    ],
    [
        { id: 't-q2-1', name: 'API Gateway', effort: 'L', quarter: 'Q2', desc: 'Centralized API gateway for rate limiting, authentication, versioning, and monitoring. Foundation for the API Marketplace feature.' },
        { id: 't-q2-2', name: 'Caching Layer', effort: 'M', quarter: 'Q2', desc: 'Redis-based caching for frequently accessed data. Expected to reduce database load by 60% and improve p95 latency by 40%.' }
    ],
    [
        { id: 't-q3-1', name: 'Auth Refactor', effort: 'L', quarter: 'Q3', desc: 'Refactor authentication system to support multiple identity providers, MFA, and session management. Prerequisite for Enterprise SSO.' },
        { id: 't-q3-2', name: 'Data Pipeline v2', effort: 'XL', quarter: 'Q3', desc: 'Rebuild data pipeline on Apache Kafka for real-time event streaming. Enables custom reporting and AI features.' }
    ],
    [
        { id: 't-q4-1', name: 'Mobile Backend', effort: 'L', quarter: 'Q4', desc: 'Dedicated mobile BFF (Backend for Frontend) with GraphQL endpoint optimized for mobile data requirements and offline sync.' },
        { id: 't-q4-2', name: 'ML Infrastructure', effort: 'XL', quarter: 'Q4', desc: 'Model serving infrastructure with feature store, training pipeline, and A/B testing framework for AI Insights feature.' }
    ]
];

const dependencies = [
    { from: 't-q2-1', to: 'f-q2-2', label: 'API Gateway enables the API Marketplace by providing centralized authentication, rate limiting, and versioning for third-party integrations.' },
    { from: 't-q3-1', to: 'f-q3-1', label: 'Auth Refactor must complete before Enterprise SSO can be built. SSO requires the new multi-provider authentication architecture.' },
    { from: 't-q3-2', to: 'f-q3-2', label: 'Data Pipeline v2 provides the real-time data streaming needed for Custom Reporting to query large datasets efficiently.' },
    { from: 't-q4-1', to: 'f-q4-1', label: 'Mobile Backend (BFF) provides the optimized API layer that Mobile App v2 needs for offline sync and efficient data loading.' },
    { from: 't-q4-2', to: 'f-q4-2', label: 'ML Infrastructure provides the model serving and feature store required to power the AI Insights feature.' }
];

const tooltip = document.getElementById('tooltip');
const effortColors = { S: '#22c55e', M: '#3b82f6', L: '#f59e0b', XL: '#ef4444' };

function init() {
    renderTrack('feature-track', featureItems, 'feature-item');
    renderTrack('tech-track', techItems, 'tech-item');

    // Defer dependency arrow rendering
    setTimeout(drawDependencies, 100);
    window.addEventListener('resize', drawDependencies);
}

function renderTrack(trackId, items, className) {
    const track = document.getElementById(trackId);
    track.innerHTML = '';

    items.forEach(quarterItems => {
        const quarterDiv = document.createElement('div');
        quarterDiv.className = 'quarter-items';

        quarterItems.forEach(item => {
            const el = document.createElement('div');
            el.className = 'roadmap-item ' + className;
            el.id = item.id;
            el.textContent = item.name;
            el.onclick = function () { showDetail(item, className); };
            quarterDiv.appendChild(el);
        });

        track.appendChild(quarterDiv);
    });
}

function drawDependencies() {
    const svg = document.getElementById('dependency-svg');
    svg.innerHTML = '';

    dependencies.forEach(dep => {
        const fromEl = document.getElementById(dep.from);
        const toEl = document.getElementById(dep.to);
        if (!fromEl || !toEl) return;

        const svgRect = svg.getBoundingClientRect();
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const x1 = fromRect.left + fromRect.width / 2 - svgRect.left;
        const x2 = toRect.left + toRect.width / 2 - svgRect.left;
        const y1 = 0;
        const y2 = svgRect.height;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y2);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y1);
        line.setAttribute('stroke', '#ef4444');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '6,4');
        line.setAttribute('opacity', '0.7');

        line.addEventListener('mouseenter', function (e) {
            tooltip.textContent = dep.label;
            tooltip.style.display = 'block';
            positionTooltip(e);
            this.setAttribute('stroke-width', '3');
            this.setAttribute('opacity', '1');
        });

        line.addEventListener('mousemove', positionTooltip);

        line.addEventListener('mouseleave', function () {
            tooltip.style.display = 'none';
            this.setAttribute('stroke-width', '2');
            this.setAttribute('opacity', '0.7');
        });

        svg.appendChild(line);
    });
}

function showDetail(item, className) {
    const panel = document.getElementById('detail-panel');
    const title = document.getElementById('detail-title');
    const content = document.getElementById('detail-content');

    const trackType = className === 'feature-item' ? 'Feature' : 'Technical';
    const trackColor = className === 'feature-item' ? '#2563eb' : '#d97706';

    title.textContent = item.name;
    title.style.color = trackColor;

    content.innerHTML =
        '<div class="detail-meta">' +
            '<span class="badge" style="background:' + (className === 'feature-item' ? '#dbeafe' : '#fef3c7') + ';color:' + trackColor + '">' + trackType + '</span>' +
            '<span class="badge" style="background:#f0f4f8;color:' + effortColors[item.effort] + '">Effort: ' + item.effort + '</span>' +
            '<span class="badge" style="background:#f0f4f8;color:#6b7280">' + item.quarter + '</span>' +
        '</div>' +
        '<p class="detail-desc">' + item.desc + '</p>';

    panel.classList.add('visible');
}

function closeDetail() {
    document.getElementById('detail-panel').classList.remove('visible');
}

function positionTooltip(e) {
    let x = e.clientX + 14;
    let y = e.clientY + 14;
    if (x + 290 > window.innerWidth) x = e.clientX - 290;
    if (y + 80 > window.innerHeight) y = e.clientY - 80;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

init();
