const stages = [
    {
        id: 'sources',
        icon: '\u{1F4F1}',
        label: 'Data Sources',
        items: ['Web App', 'Mobile App', 'Backend APIs', '3rd-Party'],
        tooltip: 'Where data originates. Includes user interactions, server events, and external integrations.'
    },
    {
        id: 'ingestion',
        icon: '\u{1F4E5}',
        label: 'Ingestion',
        items: ['SDKs', 'Webhooks', 'REST APIs'],
        tooltip: 'Collection layer using client SDKs (Segment, Amplitude), server-side webhooks, and batch uploads.'
    },
    {
        id: 'transport',
        icon: '\u{1F69A}',
        label: 'Transport',
        items: ['Kafka', 'Kinesis', 'Pub/Sub'],
        tooltip: 'Message queues that buffer and route events. Enables real-time streaming with high throughput and fault tolerance.'
    },
    {
        id: 'storage',
        icon: '\u{1F4BE}',
        label: 'Storage',
        items: ['S3 / GCS', 'BigQuery', 'Snowflake'],
        tooltip: 'Data lake and warehouse layer. Raw data lands in object storage; structured data in columnar warehouses.'
    },
    {
        id: 'transform',
        icon: '\u2699\uFE0F',
        label: 'Transformation',
        items: ['dbt', 'Airflow', 'Spark'],
        tooltip: 'Data modeling and cleaning. dbt for SQL transformations, Airflow for orchestration, Spark for large-scale processing.'
    },
    {
        id: 'serving',
        icon: '\u{1F4CA}',
        label: 'Serving',
        items: ['Analytics Tables', 'APIs', 'Caches'],
        tooltip: 'Optimized tables, materialized views, and APIs that power downstream consumers.',
        consumers: true
    }
];

const consumers = [
    { id: 'dashboards', label: '\u{1F4CA} Dashboards', tooltip: 'Business intelligence tools (Looker, Tableau, Metabase) for reporting and ad-hoc analysis.' },
    { id: 'ab-tests', label: '\u{1F9EA} A/B Tests', tooltip: 'Experimentation platforms that use pipeline data to measure feature impact and statistical significance.' },
    { id: 'ml-models', label: '\u{1F916} ML Models', tooltip: 'Machine learning pipelines that consume features for training, inference, and recommendation systems.' }
];

let activeConsumer = null;

function build() {
    const area = document.getElementById('pipeline-area');
    const flow = document.createElement('div');
    flow.className = 'pipeline-flow';
    flow.id = 'pipeline-flow';

    stages.forEach((stage, i) => {
        if (i > 0) {
            const arrow = document.createElement('div');
            arrow.className = 'arrow-connector';
            arrow.dataset.index = i;
            arrow.innerHTML = '\u25B6';
            flow.appendChild(arrow);
        }

        const stageEl = document.createElement('div');
        stageEl.className = 'stage';
        stageEl.dataset.id = stage.id;

        const box = document.createElement('div');
        box.className = 'stage-box';
        box.dataset.tooltip = stage.tooltip;
        box.innerHTML = `
            <div class="stage-icon">${stage.icon}</div>
            <div class="stage-label">${stage.label}</div>
            <ul class="stage-items">
                ${stage.items.map(it => `<li>${it}</li>`).join('')}
            </ul>
        `;
        box.addEventListener('mouseenter', showTooltip);
        box.addEventListener('mouseleave', hideTooltip);
        stageEl.appendChild(box);

        if (stage.consumers) {
            const section = document.createElement('div');
            section.className = 'consumers-section';
            consumers.forEach(c => {
                const btn = document.createElement('button');
                btn.className = 'consumer-btn';
                btn.dataset.id = c.id;
                btn.dataset.tooltip = c.tooltip;
                btn.textContent = c.label;
                btn.addEventListener('click', () => toggleConsumer(c.id));
                btn.addEventListener('mouseenter', showTooltip);
                btn.addEventListener('mouseleave', hideTooltip);
                section.appendChild(btn);
            });
            stageEl.appendChild(section);
        }

        flow.appendChild(stageEl);
    });

    area.appendChild(flow);
}

function toggleConsumer(id) {
    if (activeConsumer === id) {
        activeConsumer = null;
        clearPath();
    } else {
        activeConsumer = id;
        highlightPath();
    }

    document.querySelectorAll('.consumer-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.id === activeConsumer);
    });
}

function highlightPath() {
    const flow = document.getElementById('pipeline-flow');
    flow.classList.add('path-active');

    document.querySelectorAll('.stage').forEach(s => s.classList.add('in-path'));
    document.querySelectorAll('.arrow-connector').forEach(a => a.classList.add('in-path'));
}

function clearPath() {
    const flow = document.getElementById('pipeline-flow');
    flow.classList.remove('path-active');
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('in-path'));
    document.querySelectorAll('.arrow-connector').forEach(a => a.classList.remove('in-path'));
}

function showTooltip(e) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = e.currentTarget.dataset.tooltip;
    tooltip.classList.add('visible');
    positionTooltip(e, tooltip);
}

function hideTooltip() {
    document.getElementById('tooltip').classList.remove('visible');
}

function positionTooltip(e, tooltip) {
    let x = e.clientX + 15;
    let y = e.clientY - 10;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';

    requestAnimationFrame(() => {
        const rect = tooltip.getBoundingClientRect();
        if (rect.right > window.innerWidth - 10) {
            tooltip.style.left = (e.clientX - rect.width - 15) + 'px';
        }
        if (rect.bottom > window.innerHeight - 10) {
            tooltip.style.top = (e.clientY - rect.height - 10) + 'px';
        }
    });
}

document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.classList.contains('visible')) {
        positionTooltip(e, tooltip);
    }
});

build();
