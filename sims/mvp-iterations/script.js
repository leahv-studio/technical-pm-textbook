const iterations = [
    {
        title: 'MVP - Minimum Viable Product',
        badge: '100 users',
        color: '#c0392b',
        features: [
            'Core feature: single value proposition',
            'Basic user interface (no polish)',
            'Manual processes behind the scenes',
            'Simple landing page with sign-up'
        ],
        metrics: [
            { label: 'Active Users', value: '100' },
            { label: 'Retention (30d)', value: '12%' },
            { label: 'NPS Score', value: '32' },
            { label: 'Time to Build', value: '6 weeks' }
        ],
        lesson: 'Validated core value proposition. Users confirmed the problem is real and the solution direction is correct. The 12% retention showed the core loop needs refinement, but initial interest validated the market. Do not invest in scale until product-market fit is proven.',
        focus: [
            'Validate problem-solution fit',
            'Talk to every user personally',
            'Measure activation and retention',
            'Identify the single most important metric'
        ]
    },
    {
        title: 'Version 1.0 - Foundation',
        badge: '500 users',
        color: '#d35400',
        features: [
            'User accounts and authentication',
            'Basic onboarding flow',
            'Email notifications',
            'Improved core feature based on MVP feedback'
        ],
        metrics: [
            { label: 'Active Users', value: '500' },
            { label: 'Retention (30d)', value: '28%' },
            { label: 'NPS Score', value: '45' },
            { label: 'Time to Build', value: '8 weeks' }
        ],
        lesson: 'Retention is the key metric. Adding user accounts doubled retention because users could save their progress. The team learned that onboarding quality directly correlates with activation rate. Features should be prioritized by their impact on retention, not novelty.',
        focus: [
            'Improve retention and activation rates',
            'Build feedback loops into the product',
            'Establish baseline metrics for all funnels',
            'Prioritize features by retention impact'
        ]
    },
    {
        title: 'Version 1.5 - Growth',
        badge: '2,000 users',
        color: '#2e86c1',
        features: [
            'Third-party integrations (Slack, email)',
            'API for external developers',
            'Self-serve onboarding tutorial',
            'Mobile-responsive design'
        ],
        metrics: [
            { label: 'Active Users', value: '2,000' },
            { label: 'Retention (30d)', value: '41%' },
            { label: 'NPS Score', value: '52' },
            { label: 'Time to Build', value: '10 weeks' }
        ],
        lesson: 'Self-serve onboarding is essential for growth. The team was spending 40% of time on manual onboarding. Building a self-serve tutorial reduced support tickets by 60% and enabled the product to grow without linearly scaling the team. Integration with existing tools dramatically improved activation.',
        focus: [
            'Remove manual bottlenecks to growth',
            'Build integrations users are requesting',
            'Reduce time-to-value for new users',
            'Monitor support ticket patterns for product gaps'
        ]
    },
    {
        title: 'Version 2.0 - Scale',
        badge: '8,000 users',
        color: '#1e8449',
        features: [
            'Analytics dashboard for users',
            'Team collaboration features',
            'Admin panel and role management',
            'Performance optimization for scale'
        ],
        metrics: [
            { label: 'Active Users', value: '8,000' },
            { label: 'Retention (30d)', value: '55%' },
            { label: 'NPS Score', value: '61' },
            { label: 'Time to Build', value: '12 weeks' }
        ],
        lesson: 'Enterprise features are being requested. As the user base grew, larger organizations started adopting the product. They need admin controls, SSO, audit logs, and SLAs. The PM must decide whether to pursue enterprise or stay focused on individual users. This is a pivotal strategic decision.',
        focus: [
            'Evaluate enterprise vs. consumer strategy',
            'Build features that increase expansion revenue',
            'Address technical debt from rapid growth',
            'Hire for specialized roles (security, data)'
        ]
    },
    {
        title: 'Mature Product - Platform',
        badge: '25,000 users',
        color: '#1e4b69',
        features: [
            'Full platform with ecosystem',
            'Enterprise SSO and compliance',
            'Developer API and marketplace',
            'Advanced analytics and reporting',
            'White-label and customization options'
        ],
        metrics: [
            { label: 'Active Users', value: '25,000' },
            { label: 'Retention (30d)', value: '68%' },
            { label: 'NPS Score', value: '72' },
            { label: 'Revenue Growth', value: '+40% YoY' }
        ],
        lesson: 'Focus shifts to optimization and ecosystem. The core product is stable. Growth now comes from expanding use cases, building a partner ecosystem, and optimizing conversion funnels. The PM role shifts from feature discovery to portfolio management, platform strategy, and protecting the core experience from feature bloat.',
        focus: [
            'Optimize existing funnels over new features',
            'Build and nurture partner ecosystem',
            'Balance enterprise needs with core simplicity',
            'Invest in platform reliability and performance'
        ]
    }
];

const detailPanel = document.getElementById('detailPanel');
const detailHeader = document.getElementById('detailHeader');
const detailTitle = document.getElementById('detailTitle');
const detailBadge = document.getElementById('detailBadge');
const detailFeatures = document.getElementById('detailFeatures');
const detailMetrics = document.getElementById('detailMetrics');
const detailLesson = document.getElementById('detailLesson');
const detailFocus = document.getElementById('detailFocus');

document.querySelectorAll('.iteration').forEach(iter => {
    iter.addEventListener('click', () => {
        const index = parseInt(iter.dataset.iter);
        const data = iterations[index];

        document.querySelectorAll('.iteration').forEach(i => i.classList.remove('active'));
        iter.classList.add('active');

        detailHeader.style.background = `linear-gradient(135deg, ${data.color}, ${data.color}dd)`;
        detailTitle.textContent = data.title;
        detailBadge.textContent = data.badge;

        detailFeatures.innerHTML = data.features
            .map(f => `<li>${f}</li>`)
            .join('');

        detailMetrics.innerHTML = data.metrics
            .map(m => `<div class="metric-item"><span class="metric-label">${m.label}</span><span class="metric-value">${m.value}</span></div>`)
            .join('');

        detailLesson.textContent = data.lesson;

        detailFocus.innerHTML = data.focus
            .map(f => `<li>${f}</li>`)
            .join('');

        detailPanel.classList.remove('active');
        void detailPanel.offsetWidth;
        detailPanel.classList.add('active');
    });
});
