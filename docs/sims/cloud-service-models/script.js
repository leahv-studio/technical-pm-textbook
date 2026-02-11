const tooltip = document.getElementById('tooltip');
function selectModel(el) {
    const was = el.classList.contains('selected');
    document.querySelectorAll('.stack').forEach(s => s.classList.remove('selected'));
    if (!was) el.classList.add('selected');
}
document.querySelectorAll('.layer').forEach(l => {
    l.addEventListener('mouseenter', (e) => {
        tooltip.textContent = l.dataset.tip;
        tooltip.classList.add('visible');
    });
    l.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    l.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
});
