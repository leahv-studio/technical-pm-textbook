const joinData = {
    inner: {
        label: 'INNER JOIN',
        sql: `SELECT c.name, o.product
FROM Customers c
INNER JOIN Orders o
  ON c.id = o.customer_id;`,
        description: 'Returns only rows where there is a match in both tables. Customers without orders and orders without valid customers are excluded.',
        headers: ['name', 'product'],
        rows: [
            ['Alice', 'Laptop'],
            ['Alice', 'Mouse'],
            ['Bob', 'Keyboard']
        ],
        highlightAOnly: false,
        highlightBOnly: false,
        highlightIntersection: true
    },
    left: {
        label: 'LEFT JOIN',
        sql: `SELECT c.name, o.product
FROM Customers c
LEFT JOIN Orders o
  ON c.id = o.customer_id;`,
        description: 'Returns all rows from the left table (Customers), plus matching rows from the right table (Orders). Non-matching right-side values are NULL.',
        headers: ['name', 'product'],
        rows: [
            ['Alice', 'Laptop'],
            ['Alice', 'Mouse'],
            ['Bob', 'Keyboard'],
            ['Carol', null]
        ],
        highlightAOnly: true,
        highlightBOnly: false,
        highlightIntersection: true
    },
    right: {
        label: 'RIGHT JOIN',
        sql: `SELECT c.name, o.product
FROM Customers c
RIGHT JOIN Orders o
  ON c.id = o.customer_id;`,
        description: 'Returns all rows from the right table (Orders), plus matching rows from the left table (Customers). Non-matching left-side values are NULL.',
        headers: ['name', 'product'],
        rows: [
            ['Alice', 'Laptop'],
            ['Alice', 'Mouse'],
            ['Bob', 'Keyboard'],
            [null, 'Monitor']
        ],
        highlightAOnly: false,
        highlightBOnly: true,
        highlightIntersection: true
    },
    full: {
        label: 'FULL OUTER JOIN',
        sql: `SELECT c.name, o.product
FROM Customers c
FULL OUTER JOIN Orders o
  ON c.id = o.customer_id;`,
        description: 'Returns all rows from both tables. Where there is no match, NULL values fill in. Combines LEFT and RIGHT JOIN results.',
        headers: ['name', 'product'],
        rows: [
            ['Alice', 'Laptop'],
            ['Alice', 'Mouse'],
            ['Bob', 'Keyboard'],
            ['Carol', null],
            [null, 'Monitor']
        ],
        highlightAOnly: true,
        highlightBOnly: true,
        highlightIntersection: true
    }
};

let activeJoin = 'inner';

function init() {
    const tabsContainer = document.getElementById('join-tabs');
    Object.keys(joinData).forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'join-tab' + (key === activeJoin ? ' active' : '');
        btn.textContent = joinData[key].label;
        btn.addEventListener('click', () => selectJoin(key));
        tabsContainer.appendChild(btn);
    });
    render();
}

function selectJoin(key) {
    activeJoin = key;
    document.querySelectorAll('.join-tab').forEach((tab, i) => {
        tab.classList.toggle('active', Object.keys(joinData)[i] === key);
    });
    render();
}

function render() {
    const data = joinData[activeJoin];
    drawVenn(data);
    document.getElementById('sql-code').textContent = data.sql;
    document.getElementById('join-description').textContent = data.description;
    buildResultTable(data);
}

function drawVenn(data) {
    const svg = document.getElementById('venn-svg');
    const cx1 = 145, cx2 = 255, cy = 140, r = 110;

    svg.innerHTML = '';

    // Defs for clipping
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Clip for intersection (A ∩ B)
    const clipIntersect = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    clipIntersect.setAttribute('id', 'clip-intersect');
    const clipCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    clipCircle.setAttribute('cx', cx2);
    clipCircle.setAttribute('cy', cy);
    clipCircle.setAttribute('r', r);
    clipIntersect.appendChild(clipCircle);
    defs.appendChild(clipIntersect);

    // Clip for A-only
    const clipAOnly = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    clipAOnly.setAttribute('id', 'clip-a-only');
    const rectA = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectA.setAttribute('x', '0');
    rectA.setAttribute('y', '0');
    rectA.setAttribute('width', '400');
    rectA.setAttribute('height', '280');
    clipAOnly.appendChild(rectA);
    defs.appendChild(clipAOnly);

    svg.appendChild(defs);

    // Background circles (always visible)
    addCircle(svg, cx1, cy, r, 'rgba(41,128,185,0.15)', '#2980b9');
    addCircle(svg, cx2, cy, r, 'rgba(39,174,96,0.15)', '#27ae60');

    // Highlight intersection
    if (data.highlightIntersection) {
        const intersect = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        intersect.setAttribute('cx', cx1);
        intersect.setAttribute('cy', cy);
        intersect.setAttribute('r', r);
        intersect.setAttribute('fill', 'rgba(241,196,15,0.5)');
        intersect.setAttribute('clip-path', 'url(#clip-intersect)');
        svg.appendChild(intersect);
    }

    // Highlight A only (left crescent)
    if (data.highlightAOnly && !data.highlightIntersection) {
        addCircle(svg, cx1, cy, r, 'rgba(241,196,15,0.5)', 'transparent');
    } else if (data.highlightAOnly) {
        addCircle(svg, cx1, cy, r, 'rgba(241,196,15,0.5)', 'transparent');
    }

    // Highlight B only (right crescent)
    if (data.highlightBOnly && !data.highlightIntersection) {
        addCircle(svg, cx2, cy, r, 'rgba(241,196,15,0.5)', 'transparent');
    } else if (data.highlightBOnly) {
        addCircle(svg, cx2, cy, r, 'rgba(241,196,15,0.5)', 'transparent');
    }

    // Border circles on top
    addCircle(svg, cx1, cy, r, 'transparent', '#2980b9', 2);
    addCircle(svg, cx2, cy, r, 'transparent', '#27ae60', 2);

    // Labels
    addText(svg, cx1 - 40, cy - 10, 'A', '#2980b9', '1.4rem');
    addText(svg, cx2 + 40, cy - 10, 'B', '#27ae60', '1.4rem');
}

function addCircle(svg, cx, cy, r, fill, stroke, strokeWidth) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', fill);
    if (stroke && stroke !== 'transparent') {
        circle.setAttribute('stroke', stroke);
        circle.setAttribute('stroke-width', strokeWidth || 2.5);
    }
    svg.appendChild(circle);
}

function addText(svg, x, y, text, fill, size) {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', x);
    t.setAttribute('y', y);
    t.setAttribute('fill', fill);
    t.setAttribute('font-size', size);
    t.setAttribute('font-weight', '700');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dominant-baseline', 'middle');
    t.textContent = text;
    svg.appendChild(t);
}

function buildResultTable(data) {
    const table = document.getElementById('result-table');
    let html = '<thead><tr>';
    data.headers.forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';
    data.rows.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
            if (cell === null) {
                html += '<td class="null-value">NULL</td>';
            } else {
                html += `<td>${cell}</td>`;
            }
        });
        html += '</tr>';
    });
    html += '</tbody>';
    table.innerHTML = html;
}

init();
