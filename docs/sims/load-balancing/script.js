const servers = [0, 0, 0, 0];
const weights = [4, 3, 2, 1];
const maxConn = 20;
let rrIndex = 0;
let totalReqs = 0;
let running = true;
let intervalId;

function getBarColor(pct) {
    if (pct < 50) return '#22c55e';
    if (pct < 80) return '#eab308';
    return '#ef4444';
}

function updateDisplay() {
    servers.forEach((count, i) => {
        const pct = Math.min((count / maxConn) * 100, 100);
        const bar = document.getElementById('bar' + i);
        bar.style.width = pct + '%';
        bar.style.background = getBarColor(pct);
        document.getElementById('cnt' + i).textContent = count + ' conn';
    });
    const total = servers.reduce((a, b) => a + b, 0);
    const avg = total / 4;
    const max = Math.max(...servers);
    document.getElementById('totalReqs').textContent = totalReqs;
    document.getElementById('avgLoad').textContent = Math.round((avg / maxConn) * 100) + '%';
    document.getElementById('maxLoad').textContent = Math.round((max / maxConn) * 100) + '%';
}

function addRequest() {
    const strategy = document.getElementById('strategy').value;
    let target;
    if (strategy === 'round-robin') {
        target = rrIndex % 4;
        rrIndex++;
    } else if (strategy === 'least-conn') {
        target = servers.indexOf(Math.min(...servers));
    } else {
        const total = weights.reduce((a, b) => a + b, 0);
        let r = Math.random() * total;
        target = 0;
        for (let i = 0; i < weights.length; i++) {
            r -= weights[i];
            if (r <= 0) { target = i; break; }
        }
    }
    servers[target] = Math.min(servers[target] + 1, maxConn);
    totalReqs++;

    const pool = document.getElementById('requestPool');
    const dot = document.createElement('div');
    dot.className = 'req-dot';
    pool.appendChild(dot);
    if (pool.children.length > 30) pool.removeChild(pool.firstChild);

    updateDisplay();
}

function decayServers() {
    servers.forEach((_, i) => {
        if (servers[i] > 0 && Math.random() < 0.3) servers[i]--;
    });
    updateDisplay();
}

function getInterval() {
    const val = document.getElementById('traffic').value;
    const labels = ['', 'Very Low', 'Low', 'Medium', 'Med-High', 'High', 'Higher', 'Very High', 'Intense', 'Extreme', 'Maximum'];
    document.getElementById('trafficLabel').textContent = labels[val] || '';
    return Math.max(50, 600 - val * 55);
}

function startSim() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        addRequest();
        decayServers();
    }, getInterval());
}

function toggleSim() {
    running = !running;
    document.getElementById('toggleBtn').textContent = running ? 'Pause' : 'Resume';
    if (running) startSim();
    else clearInterval(intervalId);
}

document.getElementById('traffic').addEventListener('input', () => {
    if (running) startSim();
});
document.getElementById('strategy').addEventListener('change', () => {
    servers.fill(0);
    rrIndex = 0;
    totalReqs = 0;
    document.getElementById('requestPool').innerHTML = '';
    updateDisplay();
});

startSim();
updateDisplay();
