const tooltip = document.getElementById('tooltip');
let activeStage = null;

function toggleStage(stage) {
    const detail = document.getElementById('detail-' + stage);
    const card = document.querySelector('[data-stage="' + stage + '"]');

    if (activeStage === stage) {
        detail.classList.remove('visible');
        card.classList.remove('active');
        activeStage = null;
        return;
    }

    // Close any open stage
    if (activeStage) {
        document.getElementById('detail-' + activeStage).classList.remove('visible');
        document.querySelector('[data-stage="' + activeStage + '"]').classList.remove('active');
    }

    detail.classList.add('visible');
    card.classList.add('active');
    activeStage = stage;
}

// Pitfall hover tooltips with recovery strategies
document.querySelectorAll('.pitfall').forEach(el => {
    el.addEventListener('mouseenter', function (e) {
        tooltip.textContent = this.getAttribute('data-recovery');
        tooltip.style.display = 'block';
        positionTooltip(e);
    });

    el.addEventListener('mousemove', positionTooltip);

    el.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
    });

    // Prevent click from toggling the stage card
    el.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});

function positionTooltip(e) {
    let x = e.clientX + 14;
    let y = e.clientY + 14;
    if (x + 310 > window.innerWidth) x = e.clientX - 310;
    if (y + 80 > window.innerHeight) y = e.clientY - 80;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}
