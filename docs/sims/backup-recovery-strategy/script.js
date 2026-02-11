const strategies = [
    {
        icon: '\u{1F4E6}',
        name: 'Full Backup',
        desc: 'Complete copy of the entire database. Simplest to restore but most storage-intensive and slowest to create.',
        pros: ['Simple restore', 'Complete snapshot'],
        cons: ['Slow', 'High storage']
    },
    {
        icon: '\u{1F4C8}',
        name: 'Incremental Backup',
        desc: 'Captures only changes since the last backup (full or incremental). Fast and storage-efficient but requires chain of backups to restore.',
        pros: ['Fast backup', 'Low storage'],
        cons: ['Complex restore', 'Chain dependency']
    },
    {
        icon: '\u{1F504}',
        name: 'Differential Backup',
        desc: 'Captures all changes since the last full backup. Balances speed and restore simplicity. Grows larger over time.',
        pros: ['Moderate speed', 'Simpler restore'],
        cons: ['Grows over time', 'More than incremental']
    }
];

const tiers = [
    {
        id: 'basic',
        name: 'Basic',
        rpo: '24h',
        rto: '4h',
        details: {
            backupStrategy: 'Daily full backups retained for 7 days',
            infrastructure: [
                'Single-region backup storage',
                'Nightly automated snapshots',
                'Manual restore process',
                'Email notification on failure'
            ],
            requirements: [
                'Acceptable data loss: up to 24 hours',
                'Recovery time: within 4 hours',
                'Backup verification: weekly test restores',
                'Cost: low storage overhead'
            ]
        }
    },
    {
        id: 'pro',
        name: 'Pro',
        rpo: '1h',
        rto: '1h',
        details: {
            backupStrategy: 'Hourly incremental + daily full, retained 30 days',
            infrastructure: [
                'Multi-region backup replication',
                'Automated restore with runbook',
                'Point-in-time recovery capability',
                'PagerDuty alerts for failures'
            ],
            requirements: [
                'Acceptable data loss: up to 1 hour',
                'Recovery time: within 1 hour',
                'Backup verification: daily test restores',
                'Quarterly disaster recovery drills'
            ]
        }
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        rpo: '5min',
        rto: '15min',
        details: {
            backupStrategy: 'Continuous WAL archiving + streaming replication, retained 90 days',
            infrastructure: [
                'Multi-region hot standby databases',
                'Automated failover (< 30s switchover)',
                'Point-in-time recovery to any second',
                'Real-time monitoring with auto-remediation'
            ],
            requirements: [
                'Acceptable data loss: up to 5 minutes',
                'Recovery time: within 15 minutes',
                'Backup verification: continuous monitoring',
                'Monthly disaster recovery exercises'
            ]
        }
    }
];

let activeTier = null;

function buildStrategies() {
    const container = document.getElementById('strategies');
    strategies.forEach(s => {
        const card = document.createElement('div');
        card.className = 'strategy-card';
        card.innerHTML = `
            <div class="strategy-icon">${s.icon}</div>
            <div class="strategy-info">
                <div class="strategy-name">${s.name}</div>
                <div class="strategy-desc">${s.desc}</div>
                <div class="strategy-tags">
                    ${s.pros.map(p => `<span class="tag pro">${p}</span>`).join('')}
                    ${s.cons.map(c => `<span class="tag con">${c}</span>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function buildTiers() {
    const container = document.getElementById('tiers');
    tiers.forEach(t => {
        const card = document.createElement('div');
        card.className = `tier-card ${t.id}`;
        card.dataset.id = t.id;
        card.innerHTML = `
            <div class="tier-header">
                <span class="tier-name ${t.id}">${t.name}</span>
                <span class="tier-badge ${t.id}">${t.id.toUpperCase()}</span>
            </div>
            <div class="tier-metrics">
                <div class="tier-metric">
                    <div class="metric-value">${t.rpo}</div>
                    <div class="metric-label" data-tooltip="Recovery Point Objective: Maximum acceptable data loss measured in time. How much data can you afford to lose?">RPO</div>
                </div>
                <div class="tier-metric">
                    <div class="metric-value">${t.rto}</div>
                    <div class="metric-label" data-tooltip="Recovery Time Objective: Maximum acceptable downtime. How long until the system must be operational again?">RTO</div>
                </div>
            </div>
        `;
        card.addEventListener('click', () => selectTier(t.id));

        // Tooltip for RPO/RTO labels
        card.querySelectorAll('.metric-label').forEach(label => {
            label.addEventListener('mouseenter', (e) => {
                const tooltip = document.getElementById('tooltip');
                tooltip.textContent = e.target.dataset.tooltip;
                tooltip.classList.add('visible');
                tooltip.style.left = (e.clientX + 15) + 'px';
                tooltip.style.top = (e.clientY - 10) + 'px';
            });
            label.addEventListener('mouseleave', () => {
                document.getElementById('tooltip').classList.remove('visible');
            });
        });

        container.appendChild(card);
    });
}

function selectTier(id) {
    if (activeTier === id) {
        activeTier = null;
        clearDetail();
    } else {
        activeTier = id;
        showDetail(id);
    }

    document.querySelectorAll('.tier-card').forEach(card => {
        card.classList.toggle('active', card.dataset.id === activeTier);
    });
}

function clearDetail() {
    document.getElementById('detail-placeholder').style.display = 'block';
    document.getElementById('detail-content').classList.remove('visible');
}

function showDetail(id) {
    const tier = tiers.find(t => t.id === id);
    document.getElementById('detail-placeholder').style.display = 'none';
    const content = document.getElementById('detail-content');
    content.classList.add('visible');

    content.innerHTML = `
        <h3 class="detail-title">${tier.name} Tier - Detailed Requirements</h3>
        <p style="margin-bottom:12px;color:#555;font-size:0.9rem;"><strong>Strategy:</strong> ${tier.details.backupStrategy}</p>
        <div class="detail-grid">
            <div class="detail-section">
                <h4>Infrastructure</h4>
                <ul>
                    ${tier.details.infrastructure.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-section">
                <h4>Requirements</h4>
                <ul>
                    ${tier.details.requirements.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.classList.contains('visible')) {
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    }
});

buildStrategies();
buildTiers();
