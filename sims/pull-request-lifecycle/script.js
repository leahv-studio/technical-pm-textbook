const tooltip = document.getElementById('tooltip');
document.querySelectorAll('.step').forEach(step => {
    step.addEventListener('mouseenter', (e) => {
        const tip = step.dataset.tip;
        if (tip) {
            tooltip.textContent = tip;
            tooltip.classList.add('visible');
        }
    });
    step.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });
    step.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
});
