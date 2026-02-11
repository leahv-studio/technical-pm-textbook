const nodeData = {
    engineering: {
        color: '#3b82f6',
        title: 'Engineering',
        needs: ['Clear specs and technical context', 'Uninterrupted focus time', 'Well-defined acceptance criteria'],
        communicates: ['Feasibility assessments', 'Time and effort estimates', 'Technical trade-offs and risks'],
        tip: 'Schedule technical deep-dives separately from status updates. Engineers value specificity over ambiguity.',
        artifacts: ['Architecture docs', 'Sprint demos', 'Code reviews', 'Tech debt reports']
    },
    design: {
        color: '#7c3aed',
        title: 'Design',
        needs: ['User research data', 'Constraints and brand guidelines', 'Clear problem statements'],
        communicates: ['Wireframes and prototypes', 'User flows', 'Usability test results'],
        tip: 'Share user feedback early and often. Designers need context about user pain points to create effective solutions.',
        artifacts: ['Figma mockups', 'User journey maps', 'Design system updates']
    },
    datascience: {
        color: '#22c55e',
        title: 'Data Science',
        needs: ['Clean data access', 'Well-defined questions', 'Access to analytics tools'],
        communicates: ['Data insights and models', 'Experiment results', 'Predictive analyses'],
        tip: 'Frame requests as questions, not solutions. "What predicts churn?" is better than "Build a churn model."',
        artifacts: ['Dashboards', 'A/B test reports', 'Data quality assessments']
    },
    marketing: {
        color: '#f59e0b',
        title: 'Marketing',
        needs: ['Product narrative and positioning', 'Launch timelines', 'Key differentiators'],
        communicates: ['Market feedback and trends', 'Competitive positioning', 'Launch plans'],
        tip: 'Give marketing 4-6 weeks lead time for major launches. Share the "why" behind features for better messaging.',
        artifacts: ['Launch briefs', 'Competitive analyses', 'Campaign results']
    },
    sales: {
        color: '#ef4444',
        title: 'Sales',
        needs: ['Feature updates and roadmap visibility', 'Competitive intel', 'Demo support materials'],
        communicates: ['Customer objections and deal blockers', 'Revenue data and pipeline', 'Feature requests from prospects'],
        tip: 'Join sales calls quarterly to hear customer language firsthand. Sales feedback is the fastest market signal.',
        artifacts: ['Win/loss analyses', 'Feature request logs', 'Revenue reports']
    },
    leadership: {
        color: '#64748b',
        title: 'Leadership',
        needs: ['Progress updates and risk flags', 'Strategic alignment evidence', 'Resource justifications'],
        communicates: ['Vision and strategic direction', 'Resource allocation decisions', 'Organizational priorities'],
        tip: 'Lead with outcomes, not activities. Executives want to know impact on KPIs, not sprint velocity.',
        artifacts: ['Executive dashboards', 'Quarterly business reviews', 'Strategy documents']
    }
};

const svg = document.getElementById('connectionsSvg');
const hubLayout = document.getElementById('hubLayout');
const detailPanel = document.getElementById('detailPanel');
const detailHeader = document.getElementById('detailHeader');
const detailBody = document.getElementById('detailBody');
const tooltip = document.getElementById('tooltip');

let selectedNode = null;

function positionNodes() {
    const wrapper = hubLayout.parentElement;
    const w = wrapper.offsetWidth;
    const h = wrapper.offsetHeight;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.37;
    const spokes = document.querySelectorAll('.spoke-node');

    spokes.forEach((node, i) => {
        const angle = (i * Math.PI * 2 / 6) - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        node.style.transform = 'translate(-50%, -50%)';
    });

    drawConnections();
}

function drawConnections() {
    svg.innerHTML = '';
    const wrapper = hubLayout.parentElement;
    const w = wrapper.offsetWidth;
    const h = wrapper.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.37;
    const spokes = document.querySelectorAll('.spoke-node');

    spokes.forEach((node, i) => {
        const angle = (i * Math.PI * 2 / 6) - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        const key = node.dataset.node;
        const color = nodeData[key].color;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-opacity', '0.35');
        line.dataset.node = key;
        svg.appendChild(line);
    });
}

function selectNode(key) {
    if (selectedNode === key) {
        clearSelection();
        return;
    }
    selectedNode = key;
    const data = nodeData[key];

    document.querySelectorAll('.spoke-node').forEach(n => {
        n.classList.toggle('active', n.dataset.node === key);
        n.classList.toggle('dimmed', n.dataset.node !== key);
    });

    document.querySelectorAll('.connections-svg line').forEach(l => {
        l.classList.toggle('highlighted', l.dataset.node === key);
        l.classList.toggle('dimmed', l.dataset.node !== key);
        if (l.dataset.node === key) {
            l.setAttribute('stroke-opacity', '1');
        } else {
            l.setAttribute('stroke-opacity', '0.12');
        }
    });

    detailHeader.style.background = data.color;
    detailHeader.textContent = data.title;
    detailBody.innerHTML = `
        <h4>What They Need from PM</h4>
        <ul>${data.needs.map(n => `<li>${n}</li>`).join('')}</ul>
        <h4>What They Communicate to PM</h4>
        <ul>${data.communicates.map(c => `<li>${c}</li>`).join('')}</ul>
        <h4>Key Artifacts</h4>
        <ul>${data.artifacts.map(a => `<li>${a}</li>`).join('')}</ul>
        <h4>PM Tip</h4>
        <ul><li><em>${data.tip}</em></li></ul>
    `;
    detailPanel.classList.add('visible');
    detailPanel.style.borderColor = data.color;
}

function clearSelection() {
    selectedNode = null;
    document.querySelectorAll('.spoke-node').forEach(n => {
        n.classList.remove('active', 'dimmed');
    });
    document.querySelectorAll('.connections-svg line').forEach(l => {
        l.classList.remove('highlighted', 'dimmed');
        l.setAttribute('stroke-opacity', '0.35');
    });
    detailPanel.classList.remove('visible');
}

function showTooltip(text, e) {
    tooltip.textContent = text;
    tooltip.classList.add('visible');
    tooltip.style.left = (e.clientX + 12) + 'px';
    tooltip.style.top = (e.clientY - 10) + 'px';
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

document.querySelectorAll('.spoke-node').forEach(node => {
    node.addEventListener('click', () => selectNode(node.dataset.node));
    node.addEventListener('mouseenter', (e) => {
        const data = nodeData[node.dataset.node];
        showTooltip(`${data.title}: Needs ${data.needs[0].toLowerCase()}. Communicates ${data.communicates[0].toLowerCase()}.`, e);
    });
    node.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    node.addEventListener('mouseleave', hideTooltip);
});

document.getElementById('centerNode').addEventListener('click', clearSelection);
document.getElementById('centerNode').addEventListener('mouseenter', (e) => {
    showTooltip('Technical PM: The hub connecting all disciplines. Click a node to explore.', e);
});
document.getElementById('centerNode').addEventListener('mousemove', (e) => {
    tooltip.style.left = (e.clientX + 12) + 'px';
    tooltip.style.top = (e.clientY - 10) + 'px';
});
document.getElementById('centerNode').addEventListener('mouseleave', hideTooltip);

window.addEventListener('resize', positionNodes);
positionNodes();
