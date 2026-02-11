const layerData = {
    e2e: {
        title: 'End-to-End (E2E) Tests',
        description: 'E2E tests validate complete user workflows from start to finish, interacting with the application the way a real user would. They run in a browser or simulated environment and test the entire stack including UI, API, database, and third-party integrations.',
        stats: [
            { value: 'Slow', label: 'Execution Speed' },
            { value: 'High', label: 'Cost to Write' },
            { value: '5-10%', label: 'Test Suite Share' },
            { value: 'Broad', label: 'Coverage Scope' }
        ],
        examples: [
            'User can sign up, verify email, and log in successfully',
            'User can add items to cart, enter payment info, and complete checkout',
            'Admin can create a new user, assign roles, and verify permissions work',
            'Search returns correct results and pagination works across pages',
            'File upload processes correctly and appears in the user dashboard'
        ]
    },
    integration: {
        title: 'Integration Tests',
        description: 'Integration tests verify that different modules, services, or components work correctly together. They test the boundaries between components, such as API endpoints, database queries, message queues, and third-party service integrations.',
        stats: [
            { value: 'Medium', label: 'Execution Speed' },
            { value: 'Medium', label: 'Cost to Write' },
            { value: '20-30%', label: 'Test Suite Share' },
            { value: 'Focused', label: 'Coverage Scope' }
        ],
        examples: [
            'API endpoint returns correct data from the database',
            'Service A publishes an event and Service B processes it correctly',
            'Authentication middleware correctly blocks unauthorized requests',
            'Cache invalidation works when the underlying data changes',
            'Database migration runs without data loss on test dataset'
        ]
    },
    unit: {
        title: 'Unit Tests',
        description: 'Unit tests verify individual functions, methods, or classes in isolation. They are fast, focused, and form the foundation of a reliable test suite. Dependencies are typically mocked or stubbed to ensure tests run quickly and predictably.',
        stats: [
            { value: 'Fast', label: 'Execution Speed' },
            { value: 'Low', label: 'Cost to Write' },
            { value: '60-70%', label: 'Test Suite Share' },
            { value: 'Narrow', label: 'Coverage Scope' }
        ],
        examples: [
            'calculateTotal() correctly applies discount and tax',
            'validateEmail() rejects invalid email formats',
            'formatDate() handles edge cases like leap years and time zones',
            'sortByPriority() correctly orders items with equal priorities',
            'parseCSV() handles quoted fields and escaped commas'
        ]
    }
};

const detailCard = document.getElementById('detailCard');
const cardTitle = document.getElementById('cardTitle');
const cardDescription = document.getElementById('cardDescription');
const cardStats = document.getElementById('cardStats');
const cardExamples = document.getElementById('cardExamples');

document.querySelectorAll('.pyramid-layer').forEach(layer => {
    layer.addEventListener('click', () => {
        const key = layer.dataset.layer;
        const data = layerData[key];

        cardTitle.textContent = data.title;
        cardDescription.textContent = data.description;

        cardStats.innerHTML = data.stats
            .map(s => `<div class="stat"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`)
            .join('');

        cardExamples.innerHTML = data.examples
            .map(ex => `<li>${ex}</li>`)
            .join('');

        detailCard.classList.remove('active');
        void detailCard.offsetWidth;
        detailCard.classList.add('active');
    });
});
