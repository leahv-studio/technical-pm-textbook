const quadrantData = {
    strategic: {
        title: 'Strategic Debt (Prudent + Deliberate)',
        description: 'The team consciously decides to take on technical debt as a calculated trade-off. They understand the implications, document the debt, and plan to address it in future sprints. This is often the most justifiable form of technical debt.',
        examples: [
            'Shipping an MVP with a simple database schema, knowing it will need normalization later',
            'Using a monolithic architecture to validate the market before investing in microservices',
            'Hardcoding configuration values to meet a deadline, with a ticket to make them configurable',
            'Choosing a quick implementation path to beat a competitor to market'
        ],
        strategies: [
            'Document all strategic debt decisions in a tech debt register',
            'Assign each item a priority and estimated remediation effort',
            'Allocate 15-20% of each sprint to debt reduction',
            'Review the debt register during sprint planning',
            'Set expiration dates: if not addressed by date X, escalate'
        ]
    },
    learned: {
        title: 'Learned Debt (Prudent + Inadvertent)',
        description: 'The team did their best with the knowledge they had at the time, but later realized a better approach existed. This is natural and inevitable in software development, especially when working with new technologies or domains.',
        examples: [
            'Discovering after launch that a different database would handle the query patterns better',
            'Realizing the chosen authentication framework has scaling limitations',
            'Learning that the data model should have been event-sourced after seeing real usage patterns',
            'Finding out the API design does not support needed backward compatibility'
        ],
        strategies: [
            'Conduct regular architecture reviews and retrospectives',
            'Invest in proof-of-concept work before major architectural decisions',
            'Create an "architecture decision record" (ADR) for all major choices',
            'Budget refactoring time when new knowledge emerges',
            'Foster a blameless culture that encourages reporting learned debt'
        ]
    },
    shortcut: {
        title: 'Shortcut Debt (Reckless + Deliberate)',
        description: 'The team knowingly cuts corners without a plan to address the consequences. This often stems from pressure to deliver, poor management, or a culture that prioritizes speed over sustainability. This is the most dangerous form of deliberate debt.',
        examples: [
            'Skipping unit tests to ship faster with no plan to add them later',
            'Copy-pasting code instead of creating shared abstractions',
            'Ignoring security best practices to meet an arbitrary deadline',
            'Deploying without code review to push a feature out the door'
        ],
        strategies: [
            'Establish and enforce Definition of Done that includes quality standards',
            'Make technical debt visible to stakeholders with velocity metrics',
            'Implement automated quality gates in CI/CD pipelines',
            'Push back on unrealistic deadlines with data-driven estimates',
            'Track the cost of shortcuts in production incidents and bug reports'
        ]
    },
    ignorance: {
        title: 'Ignorance Debt (Reckless + Inadvertent)',
        description: 'The team does not know enough to recognize they are creating debt. This stems from lack of experience, training, or mentorship. The team is not being careless on purpose; they simply do not know what good looks like.',
        examples: [
            'Writing spaghetti code because no one on the team knows SOLID principles',
            'Creating a SQL injection vulnerability due to lack of security training',
            'Building a tightly coupled system because the team has not learned about dependency injection',
            'Not implementing error handling because the team has never dealt with production failures'
        ],
        strategies: [
            'Invest in training, workshops, and conference attendance',
            'Implement pair programming and code review practices',
            'Hire or consult senior engineers for architecture guidance',
            'Adopt coding standards and static analysis tools',
            'Create an engineering ladder that incentivizes continuous learning'
        ]
    }
};

const detailPanel = document.getElementById('detailPanel');
const detailClose = document.getElementById('detailClose');
const detailTitle = document.getElementById('detailTitle');
const detailDescription = document.getElementById('detailDescription');
const detailExamples = document.getElementById('detailExamples');
const detailStrategies = document.getElementById('detailStrategies');

document.querySelectorAll('.quadrant').forEach(quad => {
    quad.addEventListener('click', () => {
        const key = quad.dataset.quadrant;
        const data = quadrantData[key];

        detailTitle.textContent = data.title;
        detailDescription.textContent = data.description;

        detailExamples.innerHTML = data.examples
            .map(ex => `<li>${ex}</li>`)
            .join('');

        detailStrategies.innerHTML = data.strategies
            .map(st => `<li>${st}</li>`)
            .join('');

        detailPanel.classList.add('active');
    });
});

detailClose.addEventListener('click', () => {
    detailPanel.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        detailPanel.classList.remove('active');
    }
});

detailPanel.addEventListener('click', (e) => {
    if (e.target === detailPanel) {
        detailPanel.classList.remove('active');
    }
});
