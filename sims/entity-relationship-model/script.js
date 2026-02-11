const entities = [
    {
        id: 'organization',
        name: 'Organization',
        colorClass: 'org',
        shortAttrs: ['org_id (PK)', 'name', 'plan_tier'],
        fullAttrs: [
            { name: 'org_id', type: 'UUID', key: 'PK', desc: 'Unique identifier for each organization' },
            { name: 'name', type: 'VARCHAR(100)', key: '', desc: 'Organization display name' },
            { name: 'plan_tier', type: 'ENUM', key: '', desc: 'Subscription tier: free, pro, enterprise' },
            { name: 'created_at', type: 'TIMESTAMP', key: '', desc: 'Account creation timestamp' },
            { name: 'billing_email', type: 'VARCHAR(255)', key: '', desc: 'Primary billing contact email' },
            { name: 'max_users', type: 'INT', key: '', desc: 'Maximum allowed users for the plan' }
        ]
    },
    {
        id: 'user',
        name: 'Users',
        colorClass: 'user',
        shortAttrs: ['user_id (PK)', 'org_id (FK)', 'email'],
        fullAttrs: [
            { name: 'user_id', type: 'UUID', key: 'PK', desc: 'Unique identifier for each user' },
            { name: 'org_id', type: 'UUID', key: 'FK', desc: 'References Organization.org_id' },
            { name: 'email', type: 'VARCHAR(255)', key: '', desc: 'User email, unique per organization' },
            { name: 'display_name', type: 'VARCHAR(100)', key: '', desc: 'User-chosen display name' },
            { name: 'role', type: 'ENUM', key: '', desc: 'Role: admin, member, viewer' },
            { name: 'last_login', type: 'TIMESTAMP', key: '', desc: 'Most recent login timestamp' }
        ]
    },
    {
        id: 'project',
        name: 'Projects',
        colorClass: 'project',
        shortAttrs: ['project_id (PK)', 'org_id (FK)', 'name'],
        fullAttrs: [
            { name: 'project_id', type: 'UUID', key: 'PK', desc: 'Unique identifier for each project' },
            { name: 'org_id', type: 'UUID', key: 'FK', desc: 'References Organization.org_id' },
            { name: 'name', type: 'VARCHAR(100)', key: '', desc: 'Project name' },
            { name: 'status', type: 'ENUM', key: '', desc: 'Status: active, archived, completed' },
            { name: 'created_at', type: 'TIMESTAMP', key: '', desc: 'Project creation date' },
            { name: 'description', type: 'TEXT', key: '', desc: 'Project description and goals' }
        ]
    },
    {
        id: 'task',
        name: 'Tasks',
        colorClass: 'task',
        shortAttrs: ['task_id (PK)', 'project_id (FK)', 'title'],
        fullAttrs: [
            { name: 'task_id', type: 'UUID', key: 'PK', desc: 'Unique identifier for each task' },
            { name: 'project_id', type: 'UUID', key: 'FK', desc: 'References Projects.project_id' },
            { name: 'assigned_to', type: 'UUID', key: 'FK', desc: 'References Users.user_id' },
            { name: 'title', type: 'VARCHAR(200)', key: '', desc: 'Task title / summary' },
            { name: 'status', type: 'ENUM', key: '', desc: 'Status: todo, in_progress, done' },
            { name: 'priority', type: 'ENUM', key: '', desc: 'Priority: low, medium, high, critical' },
            { name: 'due_date', type: 'DATE', key: '', desc: 'Task deadline' }
        ]
    }
];

const relationships = [
    { from: 'organization', to: 'user', label: '1 : N', desc: 'One organization has many users. Each user belongs to exactly one organization.' },
    { from: 'user', to: 'project', label: 'M : N', desc: 'Users and Projects have a many-to-many relationship through Memberships. A user can belong to multiple projects.' },
    { from: 'project', to: 'task', label: '1 : N', desc: 'One project contains many tasks. Each task belongs to exactly one project.' }
];

let activeEntity = null;

function buildEntities() {
    const grid = document.getElementById('entities-grid');

    entities.forEach(entity => {
        const card = document.createElement('div');
        card.className = 'entity-card';
        card.dataset.id = entity.id;

        const header = document.createElement('div');
        header.className = `entity-header ${entity.colorClass}`;
        header.textContent = entity.name;
        card.appendChild(header);

        const attrs = document.createElement('div');
        attrs.className = 'entity-attrs';
        entity.shortAttrs.forEach(attr => {
            const row = document.createElement('div');
            row.className = 'entity-attr';

            if (attr.includes('(PK)')) {
                row.innerHTML = `<span class="attr-key pk">PK</span> ${attr.replace(' (PK)', '')}`;
            } else if (attr.includes('(FK)')) {
                row.innerHTML = `<span class="attr-key fk">FK</span> ${attr.replace(' (FK)', '')}`;
            } else {
                row.textContent = attr;
            }
            attrs.appendChild(row);
        });
        card.appendChild(attrs);

        card.addEventListener('click', () => selectEntity(entity.id));
        grid.appendChild(card);
    });

    setTimeout(drawRelationships, 100);
    window.addEventListener('resize', drawRelationships);
}

function selectEntity(id) {
    if (activeEntity === id) {
        activeEntity = null;
        clearDetail();
    } else {
        activeEntity = id;
        showDetail(id);
    }

    document.querySelectorAll('.entity-card').forEach(card => {
        card.classList.toggle('active', card.dataset.id === activeEntity);
    });
}

function clearDetail() {
    document.getElementById('detail-placeholder').style.display = 'block';
    document.getElementById('detail-content').classList.remove('visible');
}

function showDetail(id) {
    const entity = entities.find(e => e.id === id);
    document.getElementById('detail-placeholder').style.display = 'none';
    const content = document.getElementById('detail-content');
    content.classList.add('visible');

    let html = `<h3 class="detail-title">${entity.name} Attributes</h3>`;
    html += '<table class="detail-table"><thead><tr><th>Column</th><th>Type</th><th>Key</th><th>Description</th></tr></thead><tbody>';
    entity.fullAttrs.forEach(attr => {
        html += `<tr>
            <td><strong>${attr.name}</strong></td>
            <td>${attr.type}</td>
            <td>${attr.key ? `<span class="attr-key ${attr.key.toLowerCase()}">${attr.key}</span>` : '-'}</td>
            <td>${attr.desc}</td>
        </tr>`;
    });
    html += '</tbody></table>';
    content.innerHTML = html;
}

function drawRelationships() {
    const svg = document.getElementById('er-svg');
    const area = document.querySelector('.er-area');
    const areaRect = area.getBoundingClientRect();

    svg.innerHTML = '';
    svg.setAttribute('width', areaRect.width);
    svg.setAttribute('height', areaRect.height);

    // Defs for arrow markers
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '10');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygon.setAttribute('fill', '#999');
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);

    relationships.forEach(rel => {
        const fromCard = document.querySelector(`[data-id="${rel.from}"]`);
        const toCard = document.querySelector(`[data-id="${rel.to}"]`);
        if (!fromCard || !toCard) return;

        const fromRect = fromCard.getBoundingClientRect();
        const toRect = toCard.getBoundingClientRect();

        const x1 = fromRect.right - areaRect.left;
        const y1 = fromRect.top - areaRect.top + fromRect.height / 2;
        const x2 = toRect.left - areaRect.left;
        const y2 = toRect.top - areaRect.top + toRect.height / 2;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#bbb');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('marker-end', 'url(#arrowhead)');
        line.setAttribute('class', 'relationship-line');
        svg.appendChild(line);

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - 10;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', midX);
        text.setAttribute('y', midY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('class', 'relationship-label');
        text.textContent = rel.label;

        text.addEventListener('mouseenter', (e) => {
            const tooltip = document.getElementById('tooltip');
            tooltip.textContent = rel.desc;
            tooltip.classList.add('visible');
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY - 10) + 'px';
        });
        text.addEventListener('mouseleave', () => {
            document.getElementById('tooltip').classList.remove('visible');
        });

        svg.appendChild(text);
    });
}

document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.classList.contains('visible')) {
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    }
});

buildEntities();
