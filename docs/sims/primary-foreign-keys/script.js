const usersColumns = [
    { name: 'user_id', type: 'INT', key: 'pk', description: 'Unique identifier for each user. Auto-incremented integer that serves as the primary key.' },
    { name: 'username', type: 'VARCHAR(50)', key: null, description: 'The user\'s chosen display name. Must be unique across the system.' },
    { name: 'email', type: 'VARCHAR(100)', key: null, description: 'User\'s email address used for authentication and notifications.' },
    { name: 'created_at', type: 'TIMESTAMP', key: null, description: 'Timestamp when the user account was created. Set automatically on insert.' },
    { name: 'status', type: 'ENUM', key: null, description: 'Account status: active, suspended, or deleted. Controls access permissions.' }
];

const ordersColumns = [
    { name: 'order_id', type: 'INT', key: 'pk', description: 'Unique identifier for each order. Auto-incremented primary key.' },
    { name: 'user_id', type: 'INT', key: 'fk', description: 'Foreign key referencing Users.user_id. Links this order to the customer who placed it.', references: 'user_id' },
    { name: 'product', type: 'VARCHAR(100)', key: null, description: 'Name or identifier of the product ordered.' },
    { name: 'amount', type: 'DECIMAL(10,2)', key: null, description: 'Total order amount in the default currency.' },
    { name: 'order_date', type: 'TIMESTAMP', key: null, description: 'Date and time when the order was placed.' }
];

const relationships = [
    { from: { table: 'orders', column: 'user_id' }, to: { table: 'users', column: 'user_id' } }
];

let activeRelationship = null;

function buildTable(containerId, columns, tableName) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    columns.forEach(col => {
        const row = document.createElement('div');
        row.className = 'column-row';
        row.dataset.table = tableName;
        row.dataset.column = col.name;
        row.dataset.description = col.description;

        if (col.key) {
            const badge = document.createElement('span');
            badge.className = `key-badge ${col.key}`;
            badge.textContent = col.key.toUpperCase();
            row.appendChild(badge);
        }

        const nameSpan = document.createElement('span');
        nameSpan.className = 'column-name';
        nameSpan.textContent = col.name;
        row.appendChild(nameSpan);

        const typeSpan = document.createElement('span');
        typeSpan.className = 'column-type';
        typeSpan.textContent = col.type;
        row.appendChild(typeSpan);

        row.addEventListener('mouseenter', handleHover);
        row.addEventListener('mouseleave', handleHoverEnd);
        row.addEventListener('click', handleClick);

        container.appendChild(row);
    });
}

function handleHover(e) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = e.currentTarget.dataset.description;
    tooltip.classList.add('visible');
    positionTooltip(e, tooltip);
}

function handleHoverEnd() {
    document.getElementById('tooltip').classList.remove('visible');
}

function positionTooltip(e, tooltip) {
    const x = e.clientX + 15;
    const y = e.clientY - 10;
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

function handleClick(e) {
    const row = e.currentTarget;
    const table = row.dataset.table;
    const column = row.dataset.column;

    const matchedRel = relationships.find(r =>
        (r.from.table === table && r.from.column === column) ||
        (r.to.table === table && r.to.column === column)
    );

    clearHighlights();

    if (matchedRel && activeRelationship !== `${matchedRel.from.table}.${matchedRel.from.column}`) {
        activeRelationship = `${matchedRel.from.table}.${matchedRel.from.column}`;
        highlightRelationship(matchedRel);
    } else {
        activeRelationship = null;
    }
}

function clearHighlights() {
    document.querySelectorAll('.column-row').forEach(r => r.classList.remove('highlighted'));
    document.querySelectorAll('.db-table').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.connector-svg line').forEach(l => l.classList.remove('highlighted'));
    document.querySelectorAll('.connector-svg circle').forEach(c => {
        c.setAttribute('r', '4');
        c.setAttribute('fill', '#27ae60');
    });
}

function highlightRelationship(rel) {
    const fromRow = document.querySelector(`[data-table="${rel.from.table}"][data-column="${rel.from.column}"]`);
    const toRow = document.querySelector(`[data-table="${rel.to.table}"][data-column="${rel.to.column}"]`);

    if (fromRow) fromRow.classList.add('highlighted');
    if (toRow) toRow.classList.add('highlighted');

    document.getElementById('orders-table').classList.add('active');
    document.getElementById('users-table').classList.add('active');

    document.querySelectorAll('.connector-svg line').forEach(l => l.classList.add('highlighted'));
    document.querySelectorAll('.connector-svg circle').forEach(c => {
        c.setAttribute('r', '6');
        c.setAttribute('fill', '#f39c12');
    });
}

function drawConnectors() {
    const svg = document.getElementById('connector-svg');
    const area = document.querySelector('.diagram-area');
    const areaRect = area.getBoundingClientRect();

    svg.innerHTML = '';
    svg.setAttribute('width', areaRect.width);
    svg.setAttribute('height', areaRect.height);

    relationships.forEach(rel => {
        const fromRow = document.querySelector(`[data-table="${rel.from.table}"][data-column="${rel.from.column}"]`);
        const toRow = document.querySelector(`[data-table="${rel.to.table}"][data-column="${rel.to.column}"]`);

        if (!fromRow || !toRow) return;

        const fromRect = fromRow.getBoundingClientRect();
        const toRect = toRow.getBoundingClientRect();

        const fromX = fromRect.left - areaRect.left;
        const fromY = fromRect.top - areaRect.top + fromRect.height / 2;
        const toX = toRect.right - areaRect.left;
        const toY = toRect.top - areaRect.top + toRect.height / 2;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromX);
        line.setAttribute('y1', fromY);
        line.setAttribute('x2', toX);
        line.setAttribute('y2', toY);
        svg.appendChild(line);

        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle1.setAttribute('cx', fromX);
        circle1.setAttribute('cy', fromY);
        circle1.setAttribute('r', '4');
        circle1.setAttribute('fill', '#27ae60');
        svg.appendChild(circle1);

        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle2.setAttribute('cx', toX);
        circle2.setAttribute('cy', toY);
        circle2.setAttribute('r', '4');
        circle2.setAttribute('fill', '#2980b9');
        svg.appendChild(circle2);

        if (activeRelationship) {
            line.classList.add('highlighted');
            circle1.setAttribute('r', '6');
            circle1.setAttribute('fill', '#f39c12');
            circle2.setAttribute('r', '6');
            circle2.setAttribute('fill', '#f39c12');
        }
    });
}

buildTable('users-columns', usersColumns, 'users');
buildTable('orders-columns', ordersColumns, 'orders');

window.addEventListener('load', drawConnectors);
window.addEventListener('resize', drawConnectors);
