const lifecycleStages = [
    {
        name: 'Collect',
        governance: [
            'Define consent and collection purposes',
            'Implement data minimization principles',
            'Document data sources and lineage',
            'Ensure lawful basis under GDPR/CCPA'
        ]
    },
    {
        name: 'Store',
        governance: [
            'Encrypt data at rest and in transit',
            'Implement access control policies',
            'Define retention schedules',
            'Choose compliant storage locations'
        ]
    },
    {
        name: 'Process',
        governance: [
            'Apply data quality checks',
            'Maintain processing logs and audit trails',
            'Ensure purpose limitation compliance',
            'Document data transformations'
        ]
    },
    {
        name: 'Analyze',
        governance: [
            'Use anonymized or aggregated data',
            'Apply statistical disclosure controls',
            'Document analytical methods',
            'Review for algorithmic bias'
        ]
    },
    {
        name: 'Act',
        governance: [
            'Validate decisions against policies',
            'Document data-driven rationale',
            'Monitor for unintended consequences',
            'Ensure transparency in automated decisions'
        ]
    },
    {
        name: 'Archive',
        governance: [
            'Apply retention and deletion policies',
            'Maintain audit trail of deletions',
            'Handle right-to-erasure requests',
            'Ensure archived data remains secure'
        ]
    }
];

const layers = [
    {
        name: 'Policies',
        icon: '\u{1F4DC}',
        color: '#e8f0fe',
        borderColor: '#3b82f6',
        desc: 'Rules and guidelines governing data use',
        examples: [
            'Data classification policy (public, internal, confidential, restricted)',
            'Acceptable use policy for analytics tools',
            'Data sharing agreements with third parties',
            'Incident response and breach notification procedures',
            'Cross-border data transfer policies'
        ]
    },
    {
        name: 'Roles',
        icon: '\u{1F465}',
        color: '#f0fdf4',
        borderColor: '#22c55e',
        desc: 'People responsible for data stewardship',
        examples: [
            'Data Owner: accountable for data quality in their domain',
            'Data Steward: manages day-to-day data governance tasks',
            'Data Protection Officer: ensures regulatory compliance',
            'Data Engineer: implements technical controls and pipelines',
            'PM as Data Consumer: responsible for ethical use of insights'
        ]
    },
    {
        name: 'Standards',
        icon: '\u{1F4CF}',
        color: '#fefce8',
        borderColor: '#f59e0b',
        desc: 'Technical and process standards',
        examples: [
            'ISO 27001 for information security management',
            'SOC 2 compliance for cloud-hosted data',
            'Naming conventions for metrics and dimensions',
            'Data quality thresholds (completeness, accuracy, timeliness)',
            'API and schema versioning standards'
        ]
    }
];

const callouts = {
    privacy: {
        title: 'Privacy',
        description: 'Protecting individual data rights throughout the lifecycle.',
        points: [
            'GDPR, CCPA, and regional privacy law compliance',
            'Consent management and preference centers',
            'Data subject access requests (DSAR) handling',
            'Privacy-by-design in product development',
            'Regular privacy impact assessments (PIAs)'
        ]
    },
    security: {
        title: 'Security',
        description: 'Safeguarding data from unauthorized access and breaches.',
        points: [
            'Encryption at rest and in transit',
            'Role-based access control (RBAC)',
            'Regular security audits and penetration testing',
            'Vulnerability management and patching',
            'Security awareness training for all staff'
        ]
    },
    quality: {
        title: 'Quality',
        description: 'Ensuring data is accurate, complete, and reliable.',
        points: [
            'Automated data validation pipelines',
            'Data quality scoring and monitoring dashboards',
            'Master data management (MDM) practices',
            'Regular data profiling and cleansing',
            'Data quality SLAs between teams'
        ]
    },
    ethics: {
        title: 'Ethics',
        description: 'Using data responsibly and avoiding harm.',
        points: [
            'Algorithmic fairness and bias audits',
            'Transparent data collection practices',
            'Ethical review boards for sensitive analyses',
            'Avoiding dark patterns in data collection UX',
            'Responsible AI and ML model governance'
        ]
    }
};

const lifecycleRow = document.getElementById('lifecycleRow');
const layersContainer = document.getElementById('layersContainer');
const tooltip = document.getElementById('tooltip');
const detailTitle = document.getElementById('detailTitle');
const detailBody = document.getElementById('detailBody');

function clearActive() {
    document.querySelectorAll('.lifecycle-stage, .layer-bar, .callout').forEach(el => {
        el.classList.remove('active');
    });
}

function showDetail(title, html) {
    detailTitle.textContent = title;
    detailBody.innerHTML = html;
}

// Render lifecycle stages
lifecycleStages.forEach((stage, i) => {
    const el = document.createElement('div');
    el.className = 'lifecycle-stage';

    const label = document.createElement('div');
    label.className = 'stage-label';
    label.textContent = stage.name;
    el.appendChild(label);

    el.addEventListener('click', () => {
        clearActive();
        el.classList.add('active');
        let html = `<p>Governance requirements at the <strong>${stage.name}</strong> stage:</p><ul>`;
        stage.governance.forEach(g => html += `<li>${g}</li>`);
        html += '</ul>';
        showDetail(`${stage.name} Stage`, html);
    });

    lifecycleRow.appendChild(el);
});

// Render layers
layers.forEach(layer => {
    const bar = document.createElement('div');
    bar.className = 'layer-bar';
    bar.style.background = layer.color;

    const icon = document.createElement('span');
    icon.className = 'layer-icon';
    icon.textContent = layer.icon;

    const name = document.createElement('span');
    name.className = 'layer-name';
    name.textContent = layer.name;

    const desc = document.createElement('span');
    desc.className = 'layer-desc';
    desc.textContent = layer.desc;

    bar.appendChild(icon);
    bar.appendChild(name);
    bar.appendChild(desc);

    // Hover tooltip
    bar.addEventListener('mouseenter', (e) => {
        tooltip.textContent = `Examples: ${layer.examples[0]}; ${layer.examples[1]}`;
        tooltip.classList.add('visible');
    });
    bar.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    bar.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });

    bar.addEventListener('click', () => {
        clearActive();
        bar.classList.add('active');
        let html = `<p>${layer.desc}</p><ul>`;
        layer.examples.forEach(ex => html += `<li>${ex}</li>`);
        html += '</ul>';
        showDetail(`${layer.name} Layer`, html);
    });

    layersContainer.appendChild(bar);
});

// Callout clicks
document.querySelectorAll('.callout').forEach(el => {
    const key = el.dataset.callout;
    const data = callouts[key];

    el.addEventListener('click', () => {
        clearActive();
        el.classList.add('active');
        let html = `<p>${data.description}</p><ul>`;
        data.points.forEach(p => html += `<li>${p}</li>`);
        html += '</ul>';
        showDetail(data.title, html);
    });

    el.addEventListener('mouseenter', (e) => {
        tooltip.textContent = data.description;
        tooltip.classList.add('visible');
    });
    el.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    el.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
});
