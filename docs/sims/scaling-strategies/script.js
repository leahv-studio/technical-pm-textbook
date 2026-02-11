const slider = document.getElementById('loadSlider');
const loadLabel = document.getElementById('loadLabel');
const vServer = document.getElementById('vServer');
const vSpecs = document.getElementById('vSpecs');
const vWarning = document.getElementById('vWarning');
const ceiling = document.getElementById('ceiling');
const hServers = document.getElementById('hServers');

const loads = [100, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 250000, 500000];
const vSizes = [
    { w: 80, h: 60, cpu: 2, ram: 8, cost: 100, lat: 30 },
    { w: 90, h: 65, cpu: 4, ram: 16, cost: 200, lat: 45 },
    { w: 105, h: 72, cpu: 8, ram: 32, cost: 450, lat: 60 },
    { w: 120, h: 80, cpu: 16, ram: 64, cost: 900, lat: 80 },
    { w: 135, h: 88, cpu: 32, ram: 128, cost: 1800, lat: 120 },
    { w: 150, h: 95, cpu: 64, ram: 256, cost: 3500, lat: 200 },
    { w: 155, h: 98, cpu: 96, ram: 384, cost: 5500, lat: 350 },
    { w: 155, h: 98, cpu: 96, ram: 384, cost: 5500, lat: 800 },
    { w: 155, h: 98, cpu: 96, ram: 384, cost: 5500, lat: 2000 },
    { w: 155, h: 98, cpu: 96, ram: 384, cost: 5500, lat: 5000 }
];
const hConfigs = [
    { count: 1, cost: 100, lat: 35 },
    { count: 2, cost: 200, lat: 40 },
    { count: 3, cost: 300, lat: 42 },
    { count: 4, cost: 400, lat: 44 },
    { count: 6, cost: 600, lat: 46 },
    { count: 8, cost: 800, lat: 48 },
    { count: 10, cost: 1000, lat: 50 },
    { count: 14, cost: 1400, lat: 52 },
    { count: 20, cost: 2000, lat: 55 },
    { count: 30, cost: 3000, lat: 58 }
];

function update() {
    const idx = slider.value - 1;
    const load = loads[idx];
    loadLabel.textContent = load.toLocaleString();

    const v = vSizes[idx];
    const overCapacity = idx >= 7;
    vServer.style.width = v.w + 'px';
    vServer.style.height = v.h + 'px';
    vServer.style.background = overCapacity ? '#ef4444' : '#f59e0b';
    vSpecs.textContent = `${v.cpu} CPU / ${v.ram} GB RAM`;
    ceiling.classList.toggle('show', idx >= 6);
    vWarning.classList.toggle('show', overCapacity);
    document.getElementById('vLatency').textContent = overCapacity ? '💀 Timeout' : v.lat + 'ms';
    document.getElementById('vLatency').style.color = v.lat > 200 ? '#ef4444' : overCapacity ? '#ef4444' : '#1e4b69';
    document.getElementById('vCost').textContent = '$' + v.cost.toLocaleString();
    document.getElementById('vRisk').textContent = 'Single point of failure';
    document.getElementById('vRisk').style.color = '#ef4444';

    const h = hConfigs[idx];
    hServers.innerHTML = '';
    for (let i = 0; i < h.count; i++) {
        const div = document.createElement('div');
        div.className = 'h-srv';
        div.textContent = 'Srv ' + (i + 1);
        hServers.appendChild(div);
    }
    document.getElementById('hLatency').textContent = h.lat + 'ms';
    document.getElementById('hLatency').style.color = '#1e4b69';
    document.getElementById('hCost').textContent = '$' + h.cost.toLocaleString();
    document.getElementById('hRisk').textContent = 'Distributed (' + h.count + ' nodes)';
    document.getElementById('hRisk').style.color = '#22c55e';
}

slider.addEventListener('input', update);
update();
