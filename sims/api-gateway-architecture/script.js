const tooltip = document.getElementById('tooltip');
document.querySelectorAll('[data-tip]').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        tooltip.textContent = el.dataset.tip;
        tooltip.classList.add('visible');
    });
    el.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    el.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
});
