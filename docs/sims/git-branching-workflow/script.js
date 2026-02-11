const svg = document.getElementById('git-diagram');
const tooltip = document.getElementById('tooltip');
const releasePanel = document.getElementById('release-panel');
const releaseTitle = document.getElementById('release-title');
const releaseBody = document.getElementById('release-body');

const Y = { main: 65, featureA: 165, featureB: 265, hotfix: 355 };
const startX = 140;
const gap = 72;
function cx(n) { return startX + (n - 1) * gap; }

const commits = [
    { id: 1, branch: 'main', msg: 'Initial release - core platform' },
    { id: 2, branch: 'main', msg: 'Update dependencies and configs' },
    { id: 3, branch: 'main', msg: 'Merge prep for user-auth branch' },
    { id: 4, branch: 'main', msg: 'Fix header styling regression' },
    { id: 5, branch: 'main', msg: 'Add search API endpoint stub' },
    { id: 6, branch: 'main', msg: 'Release v2.1 - auth & styling fixes' },
    { id: 7, branch: 'main', msg: 'Update monitoring dashboards' },
    { id: 8, branch: 'main', msg: 'Merge feature/user-auth into main' },
    { id: 9, branch: 'main', msg: 'Merge hotfix/login-bug into main' },
    { id: 10, branch: 'main', msg: 'Merge feature/search-api into main' },
    { id: 11, branch: 'main', msg: 'Release v2.2 - search & hotfix' }
];
const featureACommits = [
    { id: 'a1', msg: 'Set up auth module scaffold' },
    { id: 'a2', msg: 'Implement OAuth2 flow' },
    { id: 'a3', msg: 'Add session management' },
    { id: 'a4', msg: 'Write auth integration tests' }
];
const featureBCommits = [
    { id: 'b1', msg: 'Create search service skeleton' },
    { id: 'b2', msg: 'Implement full-text search query' },
    { id: 'b3', msg: 'Add search result pagination' }
];
const hotfixCommits = [
    { id: 'h1', msg: 'Fix login redirect loop on Safari' }
];
const releases = {
    v21: { tag: 'v2.1', features: ['Header styling regression fix', 'Dependency updates', 'Core platform stability improvements'] },
    v22: { tag: 'v2.2', features: ['User authentication (OAuth2)', 'Search API with pagination', 'Login bug hotfix (Safari)'] }
};
const branchInfo = {
    main: 'The primary branch representing production-ready code. All features merge here after review.',
    featureA: 'feature/user-auth: Implements OAuth2-based user authentication with session management.',
    featureB: 'feature/search-api: Adds full-text search with pagination for the product catalog.',
    hotfix: 'hotfix/login-bug: Emergency fix for a Safari login redirect loop discovered in production.'
};

function line(x1, y1, x2, y2, color, width, dashed) {
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1);
    l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', color); l.setAttribute('stroke-width', width || 3);
    if (dashed) l.setAttribute('stroke-dasharray', '6,4');
    return l;
}

function circle(x, y, r, fill, data) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', r);
    c.setAttribute('fill', fill); c.setAttribute('stroke', '#fff'); c.setAttribute('stroke-width', 2);
    c.style.cursor = 'pointer';
    if (data) { c.dataset.tip = data; }
    return c;
}

function diamond(x, y, size, fill, data) {
    const d = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const pts = `${x},${y-size} ${x+size},${y} ${x},${y+size} ${x-size},${y}`;
    d.setAttribute('points', pts); d.setAttribute('fill', fill);
    d.setAttribute('stroke', '#5b21b6'); d.setAttribute('stroke-width', 1.5);
    d.style.cursor = 'pointer';
    if (data) d.dataset.release = data;
    return d;
}

function branchLine(x1, x2, y, color, key) {
    const l = line(x1, y, x2, y, color, 3);
    l.style.cursor = 'pointer';
    l.dataset.branch = key;
    return l;
}

// Draw main branch
svg.appendChild(branchLine(startX - 20, cx(11) + 20, Y.main, '#1e3a5f', 'main'));

// Main commits
commits.forEach(c => {
    svg.appendChild(circle(cx(c.id), Y.main, 8, '#1e3a5f', c.msg));
});

// Feature A: branches at 3, commits at positions between 3 and 8, merges at 8
svg.appendChild(line(cx(3), Y.main, cx(3) + gap * 0.5, Y.featureA, '#22c55e', 2, true));
const faXs = [cx(3) + gap, cx(3) + gap * 2, cx(3) + gap * 3, cx(3) + gap * 4];
svg.appendChild(branchLine(faXs[0] - 15, faXs[3] + 15, Y.featureA, '#22c55e', 'featureA'));
featureACommits.forEach((c, i) => {
    svg.appendChild(circle(faXs[i], Y.featureA, 7, '#22c55e', c.msg));
});
svg.appendChild(line(faXs[3], Y.featureA, cx(8), Y.main, '#22c55e', 2, true));

// Feature B: branches at 5, merges at 10
svg.appendChild(line(cx(5), Y.main, cx(5) + gap * 0.5, Y.featureB, '#f59e0b', 2, true));
const fbXs = [cx(6), cx(7), cx(8)];
svg.appendChild(branchLine(fbXs[0] - 15, fbXs[2] + 15, Y.featureB, '#f59e0b', 'featureB'));
featureBCommits.forEach((c, i) => {
    svg.appendChild(circle(fbXs[i], Y.featureB, 7, '#f59e0b', c.msg));
});
svg.appendChild(line(fbXs[2], Y.featureB, cx(10), Y.main, '#f59e0b', 2, true));

// Hotfix: branches at 7, merges at 9
svg.appendChild(line(cx(7), Y.main, cx(7) + gap * 0.5, Y.hotfix, '#ef4444', 2, true));
svg.appendChild(branchLine(cx(7) + gap * 0.5, cx(8) + gap * 0.3, Y.hotfix, '#ef4444', 'hotfix'));
svg.appendChild(circle(cx(8), Y.hotfix, 7, '#ef4444', hotfixCommits[0].msg));
svg.appendChild(line(cx(8) + gap * 0.3, Y.hotfix, cx(9), Y.main, '#ef4444', 2, true));

// Release tags
svg.appendChild(diamond(cx(6), Y.main - 24, 10, '#7c3aed', 'v21'));
const t1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
t1.setAttribute('x', cx(6)); t1.setAttribute('y', Y.main - 40);
t1.setAttribute('text-anchor', 'middle'); t1.setAttribute('fill', '#7c3aed');
t1.setAttribute('font-size', '11'); t1.setAttribute('font-weight', '600');
t1.textContent = 'v2.1'; svg.appendChild(t1);

svg.appendChild(diamond(cx(11), Y.main - 24, 10, '#7c3aed', 'v22'));
const t2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
t2.setAttribute('x', cx(11)); t2.setAttribute('y', Y.main - 40);
t2.setAttribute('text-anchor', 'middle'); t2.setAttribute('fill', '#7c3aed');
t2.setAttribute('font-size', '11'); t2.setAttribute('font-weight', '600');
t2.textContent = 'v2.2'; svg.appendChild(t2);

// Commit number labels
commits.forEach(c => {
    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', cx(c.id)); txt.setAttribute('y', Y.main + 24);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('fill', '#94a3b8');
    txt.setAttribute('font-size', '10'); txt.textContent = c.id;
    svg.appendChild(txt);
});

// Tooltip events
svg.addEventListener('mousemove', (e) => {
    const el = e.target;
    let text = '';
    if (el.dataset.tip) text = el.dataset.tip;
    else if (el.dataset.branch) text = branchInfo[el.dataset.branch];
    else if (el.dataset.release) {
        const r = releases[el.dataset.release];
        text = `Click to see ${r.tag} release details`;
    }
    if (text) {
        tooltip.textContent = text;
        tooltip.classList.add('visible');
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 8) + 'px';
    } else {
        tooltip.classList.remove('visible');
    }
});
svg.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));

svg.addEventListener('click', (e) => {
    const el = e.target;
    if (el.dataset.release) {
        const r = releases[el.dataset.release];
        releaseTitle.textContent = `Release ${r.tag}`;
        releaseBody.innerHTML = `<p>Features included in this release:</p><ul>${r.features.map(f => `<li>${f}</li>`).join('')}</ul>`;
        releasePanel.classList.add('visible');
    }
});

document.getElementById('release-close').addEventListener('click', () => {
    releasePanel.classList.remove('visible');
});
