const tooltip = document.getElementById('tooltip');
let selectedRing = null;

function selectRing(ring) {
    if (selectedRing === ring) { clearRing(); return; }
    selectedRing = ring;
    document.querySelectorAll('.ring').forEach(r => {
        const rName = r.dataset.ring;
        r.classList.remove('highlighted', 'dimmed');
        if (rName === ring) r.classList.add('highlighted');
        else if (rName) r.classList.add('dimmed');
    });
}

function clearRing() {
    selectedRing = null;
    document.querySelectorAll('.ring').forEach(r => r.classList.remove('highlighted', 'dimmed'));
}

document.querySelectorAll('[data-tip]').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        tooltip.textContent = el.dataset.tip;
        tooltip.classList.add('visible');
        e.stopPropagation();
    });
    el.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    el.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
});
