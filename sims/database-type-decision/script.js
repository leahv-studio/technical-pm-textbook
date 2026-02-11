const databases = [
    {
        id: 'relational',
        icon: '\u{1F4CA}',
        condition: 'Structured / Relational data',
        name: 'Relational DB',
        example: 'PostgreSQL, MySQL',
        useCases: [
            'Transactional systems (e-commerce, banking)',
            'Applications with complex queries and joins',
            'Data with strict schema requirements',
            'ACID compliance critical (financial data)'
        ],
        tradeoffs: [
            'Rigid schema \u2014 migrations can be costly',
            'Horizontal scaling is more complex',
            'May be overkill for simple key-value lookups',
            'Performance degrades with very large datasets'
        ]
    },
    {
        id: 'document',
        icon: '\u{1F4C4}',
        condition: 'Semi-structured / Flexible schema',
        name: 'Document DB',
        example: 'MongoDB, CouchDB',
        useCases: [
            'Content management systems',
            'Product catalogs with varying attributes',
            'Rapid prototyping and agile development',
            'User profiles with diverse data shapes'
        ],
        tradeoffs: [
            'No native join support \u2014 denormalization needed',
            'Potential data inconsistency without schema',
            'Query capabilities vary by implementation',
            'Transactions across documents can be limited'
        ]
    },
    {
        id: 'graph',
        icon: '\u{1F578}\uFE0F',
        condition: 'Graph relationships',
        name: 'Graph DB',
        example: 'Neo4j, Amazon Neptune',
        useCases: [
            'Social networks and friend recommendations',
            'Fraud detection via relationship patterns',
            'Knowledge graphs and ontologies',
            'Network topology management'
        ],
        tradeoffs: [
            'Not ideal for bulk data processing',
            'Smaller ecosystem than relational DBs',
            'Steeper learning curve (Cypher, Gremlin)',
            'Can be expensive at scale'
        ]
    },
    {
        id: 'keyvalue',
        icon: '\u{1F511}',
        condition: 'Key-value pairs',
        name: 'Key-Value Store',
        example: 'Redis, DynamoDB',
        useCases: [
            'Session management and caching',
            'Real-time leaderboards and counters',
            'Shopping carts and temporary data',
            'Feature flags and configuration'
        ],
        tradeoffs: [
            'No complex queries \u2014 lookup by key only',
            'Limited data modeling capabilities',
            'Memory-based stores can be expensive',
            'No relationships between records'
        ]
    },
    {
        id: 'timeseries',
        icon: '\u{23F1}\uFE0F',
        condition: 'Time-series data',
        name: 'Time-Series DB',
        example: 'InfluxDB, TimescaleDB',
        useCases: [
            'IoT sensor data collection',
            'Application performance monitoring',
            'Financial market data (stock prices)',
            'Infrastructure metrics and alerting'
        ],
        tradeoffs: [
            'Optimized for append \u2014 updates are slow',
            'Not suited for general-purpose queries',
            'Data retention policies can be complex',
            'Specialized query languages to learn'
        ]
    },
    {
        id: 'search',
        icon: '\u{1F50D}',
        condition: 'Full-text search',
        name: 'Search Engine',
        example: 'Elasticsearch, Typesense',
        useCases: [
            'Product search with faceting and filters',
            'Log aggregation and analysis',
            'Autocomplete and fuzzy matching',
            'Document search across large corpuses'
        ],
        tradeoffs: [
            'Not a primary data store \u2014 needs source of truth',
            'Index maintenance can be resource-heavy',
            'Eventual consistency by design',
            'Complex cluster management at scale'
        ]
    }
];

let activeDb = null;

function buildTree() {
    const area = document.getElementById('tree-area');

    const root = document.createElement('div');
    root.className = 'tree-root';

    const question = document.createElement('div');
    question.className = 'question-node';
    question.textContent = 'What type of data are you working with?';
    root.appendChild(question);

    const branches = document.createElement('div');
    branches.className = 'branches';

    databases.forEach(db => {
        const branch = document.createElement('div');
        branch.className = 'branch';

        const connector = document.createElement('div');
        connector.className = 'branch-connector';
        branch.appendChild(connector);

        const condition = document.createElement('div');
        condition.className = 'condition-label';
        condition.textContent = db.condition;
        branch.appendChild(condition);

        const arrow = document.createElement('div');
        arrow.className = 'arrow-down';
        branch.appendChild(arrow);

        const node = document.createElement('div');
        node.className = 'db-node';
        node.dataset.id = db.id;
        node.innerHTML = `
            <div class="db-icon">${db.icon}</div>
            <div class="db-name">${db.name}</div>
            <div class="db-example">${db.example}</div>
        `;
        node.addEventListener('click', () => selectDb(db.id));
        branch.appendChild(node);

        branches.appendChild(branch);
    });

    root.appendChild(branches);
    area.appendChild(root);
}

function selectDb(id) {
    if (activeDb === id) {
        activeDb = null;
        clearDetail();
    } else {
        activeDb = id;
        showDetail(id);
    }

    document.querySelectorAll('.db-node').forEach(node => {
        node.classList.toggle('active', node.dataset.id === activeDb);
    });
}

function clearDetail() {
    document.getElementById('detail-content').innerHTML = '<p class="detail-placeholder">Click a database type to see details</p>';
}

function showDetail(id) {
    const db = databases.find(d => d.id === id);
    const content = document.getElementById('detail-content');

    content.innerHTML = `
        <div class="detail-title">
            <span>${db.icon}</span>
            <span>${db.name} (${db.example})</span>
        </div>
        <div class="detail-grid">
            <div class="detail-section use-cases">
                <h4>Use Cases</h4>
                <ul>
                    ${db.useCases.map(u => `<li>${u}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-section tradeoffs">
                <h4>Trade-offs</h4>
                <ul>
                    ${db.tradeoffs.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

buildTree();
