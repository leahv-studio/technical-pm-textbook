let mode = 'hit';
let selectedUser = 'tokyo';

const edges = {
    tokyo: { cx: 560, cy: 120, hitLat: 12, missLat: 280 },
    london: { cx: 360, cy: 105, hitLat: 15, missLat: 220 },
    saopaulo: { cx: 200, cy: 250, hitLat: 18, missLat: 180 }
};
const users = {
    tokyo: { cx: 580, cy: 140 },
    london: { cx: 340, cy: 115 },
    saopaulo: { cx: 210, cy: 260 }
};
const origin = { cx: 200, cy: 120 };

function setMode(m) {
    mode = m;
    document.getElementById('hitBtn').classList.toggle('active', m === 'hit');
    document.getElementById('missBtn').classList.toggle('active', m === 'miss');
    drawPaths();
}

function selectUser(u) {
    selectedUser = u;
    drawPaths();
}

function drawPaths() {
    const g = document.getElementById('pathGroup');
    g.innerHTML = '';
    const u = users[selectedUser];
    const e = edges[selectedUser];

    if (mode === 'hit') {
        drawLine(g, u.cx, u.cy, e.cx, e.cy, '#22c55e', false);
        drawLine(g, e.cx, e.cy, u.cx, u.cy, '#22c55e', true);
        document.getElementById('hitBar').style.width = '8%';
        document.getElementById('hitVal').textContent = '~' + e.hitLat + 'ms';
        document.getElementById('missBar').style.width = '0%';
        document.getElementById('missVal').textContent = '-';
    } else {
        drawLine(g, u.cx, u.cy, e.cx, e.cy, '#f59e0b', false);
        drawLine(g, e.cx, e.cy, origin.cx, origin.cy, '#ef4444', true);
        drawLine(g, origin.cx, origin.cy, e.cx, e.cy, '#3b82f6', true);
        drawLine(g, e.cx, e.cy, u.cx, u.cy, '#22c55e', true);
        document.getElementById('hitBar').style.width = '0%';
        document.getElementById('hitVal').textContent = '-';
        document.getElementById('missBar').style.width = Math.min(e.missLat / 3, 100) + '%';
        document.getElementById('missVal').textContent = '~' + e.missLat + 'ms';
    }
}

function drawLine(parent, x1, y1, x2, y2, color, dashed) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '2.5');
    if (dashed) line.setAttribute('stroke-dasharray', '6,4');
    line.setAttribute('opacity', '0.8');
    parent.appendChild(line);
}

drawPaths();
