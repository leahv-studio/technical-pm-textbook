const dimensionDetails = {
    planning: {
        title: 'Planning',
        waterfall: 'In Waterfall, planning is done comprehensively upfront. A detailed project plan covering all phases is created before any development begins. The schedule, budget, and scope are fixed at the start. Changes to the plan require formal change control processes. This works well when requirements are well-understood and unlikely to change.',
        agile: 'In Agile, planning is adaptive and happens at multiple levels. Release planning provides a high-level roadmap, sprint planning details the next 1-2 weeks, and daily standups adjust the current day. The plan evolves as the team learns more. Only the immediate sprint is planned in detail; future work remains at a higher level of abstraction.'
    },
    requirements: {
        title: 'Requirements',
        waterfall: 'Requirements are gathered exhaustively at the beginning of the project and documented in a Software Requirements Specification (SRS). Once approved, they are considered frozen. Any changes must go through a formal change request process, which can be time-consuming and expensive. This assumes the customer knows exactly what they need upfront.',
        agile: 'Requirements are maintained as a prioritized product backlog of user stories. They are refined continuously through backlog grooming sessions. New stories can be added at any time, and priorities can shift each sprint. The product owner decides what to build next based on current business value and customer feedback.'
    },
    testing: {
        title: 'Testing',
        waterfall: 'Testing occurs as a distinct phase after all development is complete. A dedicated QA team executes test plans against the full system. Defects found late in the cycle are expensive to fix because they may require changes to design or architecture. The gap between writing code and testing it can be months.',
        agile: 'Testing is integrated into every sprint. Developers write unit tests alongside code (TDD). QA participates in sprint planning and tests features as they are completed. Continuous integration runs automated tests on every commit. Defects are found and fixed within days, not months, keeping the cost of fixing bugs low.'
    },
    delivery: {
        title: 'Delivery',
        waterfall: 'The product is delivered as a single, complete release at the end of the project. Customers may wait months or years before seeing working software. There is significant risk that the delivered product does not meet actual needs because no feedback was incorporated during development.',
        agile: 'Working software is delivered incrementally every sprint (typically 1-4 weeks). Each increment adds new features and can be released to users. This provides early return on investment, frequent feedback opportunities, and the ability to course-correct based on real user behavior and market changes.'
    },
    change: {
        title: 'Change Response',
        waterfall: 'Change is seen as disruptive and is actively discouraged after the requirements phase. Change requests go through a formal review board, requiring impact analysis, re-estimation, and approval. This process can take weeks. The cost of change increases dramatically as the project progresses through later phases.',
        agile: 'Change is expected and welcomed as a natural part of product development. The product backlog is re-prioritized each sprint, allowing the team to pivot quickly. The cost of change remains relatively constant because each sprint builds on a working, tested codebase. Stakeholders can adjust direction based on new information.'
    },
    risk: {
        title: 'Risk Management',
        waterfall: 'Risk is concentrated at the end of the project. The biggest risk is that after months of work, the product does not meet user needs or has fundamental technical flaws. Problems with requirements, architecture, or integration are often not discovered until the testing phase, when they are most expensive to fix.',
        agile: 'Risk is spread across many small iterations. Each sprint produces working software that can be evaluated. Technical risks are addressed early through spikes and prototypes. Integration happens continuously, not at the end. The worst case scenario in any sprint is losing 1-2 weeks of work, not months or years.'
    }
};

// Toggle view
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const view = btn.dataset.view;
        const wp = document.getElementById('waterfallPanel');
        const ap = document.getElementById('agilePanel');
        const grid = document.querySelector('.methodologies');

        wp.classList.remove('hidden');
        ap.classList.remove('hidden');

        if (view === 'both') {
            grid.style.gridTemplateColumns = '1fr 1fr';
        } else if (view === 'waterfall') {
            ap.classList.add('hidden');
            grid.style.gridTemplateColumns = '1fr';
        } else if (view === 'agile') {
            wp.classList.add('hidden');
            grid.style.gridTemplateColumns = '1fr';
        }
    });
});

// Dimension details
const detailPanel = document.getElementById('detailPanel');
const detailDimTitle = document.getElementById('detailDimTitle');
const detailWaterfall = document.getElementById('detailWaterfall');
const detailAgile = document.getElementById('detailAgile');

document.querySelectorAll('.dimension').forEach(dim => {
    dim.addEventListener('click', () => {
        const key = dim.dataset.dim;
        const data = dimensionDetails[key];

        document.querySelectorAll('.dimension').forEach(d => d.classList.remove('active'));
        dim.classList.add('active');

        detailDimTitle.textContent = data.title;
        detailWaterfall.textContent = data.waterfall;
        detailAgile.textContent = data.agile;

        detailPanel.classList.remove('active');
        void detailPanel.offsetWidth;
        detailPanel.classList.add('active');
    });
});
