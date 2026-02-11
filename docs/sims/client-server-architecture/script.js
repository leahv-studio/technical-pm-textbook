// Client-Server Architecture Interactive Diagram

const connectionData = [
    {
        from: 'browser',
        to: 'webserver',
        title: 'Browser to Web Server',
        request: 'GET /index.html HTTP/1.1\nHost: example.com\nAccept: text/html',
        response: 'HTTP/1.1 200 OK\nContent-Type: text/html\n\n<html>...</html>'
    },
    {
        from: 'browser',
        to: 'apiserver',
        title: 'Browser to API Server',
        request: 'GET /api/users HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer token123',
        response: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n[\n  {"id": 1, "name": "Alice"},\n  {"id": 2, "name": "Bob"}\n]'
    },
    {
        from: 'mobile',
        to: 'apiserver',
        title: 'Mobile App to API Server',
        request: 'POST /api/orders HTTP/1.1\nContent-Type: application/json\n\n{"item": "Widget", "qty": 2}',
        response: 'HTTP/1.1 201 Created\n\n{\n  "orderId": "ORD-4521",\n  "status": "confirmed",\n  "total": "$29.98"\n}'
    },
    {
        from: 'mobile',
        to: 'dbserver',
        title: 'Mobile App to Database (via API)',
        request: 'GET /api/products?category=\n  electronics&limit=10\nX-App-Version: 2.1.0',
        response: 'HTTP/1.1 200 OK\n\n{\n  "products": [...],\n  "total": 142,\n  "cached": true\n}'
    },
    {
        from: 'desktop',
        to: 'apiserver',
        title: 'Desktop App to API Server',
        request: 'PUT /api/reports/42 HTTP/1.1\nContent-Type: application/json\n\n{"status": "published"}',
        response: 'HTTP/1.1 200 OK\n\n{\n  "reportId": 42,\n  "status": "published",\n  "updatedAt": "2025-01-15"\n}'
    },
    {
        from: 'desktop',
        to: 'dbserver',
        title: 'Desktop App to Database (via API)',
        request: 'GET /api/analytics?\n  range=30d&metric=revenue',
        response: 'HTTP/1.1 200 OK\n\n{\n  "metric": "revenue",\n  "value": "$142,500",\n  "trend": "+12.3%"\n}'
    }
];

const tooltip = document.getElementById('tooltip');
const tooltipTitle = document.getElementById('tooltipTitle');
const tooltipBody = document.getElementById('tooltipBody');
const connectionPanel = document.getElementById('connectionPanel');
const panelTitle = document.getElementById('panelTitle');
const panelRequest = document.getElementById('panelRequest');
const panelResponse = document.getElementById('panelResponse');
const closePanel = document.getElementById('closePanel');

// Show tooltip on component hover
document.querySelectorAll('.component').forEach(comp => {
    comp.addEventListener('mouseenter', (e) => {
        const role = comp.dataset.role;
        const tech = comp.dataset.tech;
        const desc = comp.dataset.desc;

        tooltipTitle.textContent = role;
        tooltipBody.innerHTML = desc + '<span class="tech-label">Technologies: ' + tech + '</span>';
        tooltip.classList.add('visible');
    });

    comp.addEventListener('mousemove', (e) => {
        const x = e.clientX + 16;
        const y = e.clientY - 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';

        // Keep tooltip on screen
        const rect = tooltip.getBoundingClientRect();
        if (rect.right > window.innerWidth - 10) {
            tooltip.style.left = (e.clientX - rect.width - 16) + 'px';
        }
        if (rect.bottom > window.innerHeight - 10) {
            tooltip.style.top = (e.clientY - rect.height - 10) + 'px';
        }
    });

    comp.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
});

// Close panel
closePanel.addEventListener('click', () => {
    connectionPanel.classList.remove('visible');
});

// Draw connection lines
function drawConnections() {
    const svg = document.getElementById('connectionsSvg');
    const diagram = document.querySelector('.diagram');
    const diagramRect = diagram.getBoundingClientRect();

    svg.innerHTML = '';
    svg.style.position = 'absolute';
    svg.style.top = diagram.offsetTop + 'px';
    svg.style.left = diagram.offsetLeft + 'px';
    svg.style.width = diagram.offsetWidth + 'px';
    svg.style.height = diagram.offsetHeight + 'px';

    // Define arrowhead marker
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '8');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('refX', '8');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrowPath.setAttribute('points', '0 0, 8 3, 0 6');
    arrowPath.setAttribute('fill', 'rgba(70, 180, 200, 0.6)');
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svg.appendChild(defs);

    connectionData.forEach((conn, idx) => {
        const fromEl = document.querySelector(`[data-id="${conn.from}"]`);
        const toEl = document.querySelector(`[data-id="${conn.to}"]`);

        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const x1 = fromRect.right - diagramRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - diagramRect.top;
        const x2 = toRect.left - diagramRect.left;
        const y2 = toRect.top + toRect.height / 2 - diagramRect.top;

        const midX = (x1 + x2) / 2;
        const offset = (idx % 3 - 1) * 8;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${x1} ${y1} C ${midX} ${y1 + offset}, ${midX} ${y2 + offset}, ${x2} ${y2}`;
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'rgba(70, 180, 200, 0.35)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-dasharray', '6,4');
        path.setAttribute('marker-end', 'url(#arrowhead)');
        path.classList.add('conn-line');
        path.dataset.index = idx;

        path.addEventListener('click', (e) => {
            e.stopPropagation();
            panelTitle.textContent = conn.title;
            panelRequest.textContent = conn.request;
            panelResponse.textContent = conn.response;
            connectionPanel.classList.add('visible');
        });

        path.addEventListener('mouseenter', () => {
            path.setAttribute('stroke', 'rgb(70, 180, 200)');
            path.setAttribute('stroke-width', '3');
            path.setAttribute('stroke-dasharray', 'none');
        });

        path.addEventListener('mouseleave', () => {
            path.setAttribute('stroke', 'rgba(70, 180, 200, 0.35)');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-dasharray', '6,4');
        });

        svg.appendChild(path);
    });
}

// Close panel on outside click
document.addEventListener('click', (e) => {
    if (!connectionPanel.contains(e.target) && !e.target.classList.contains('conn-line')) {
        connectionPanel.classList.remove('visible');
    }
});

// Draw on load and resize
window.addEventListener('load', () => {
    setTimeout(drawConnections, 100);
});
window.addEventListener('resize', drawConnections);
