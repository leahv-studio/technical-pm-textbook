const tooltip = document.getElementById('tooltip');
let activeLevel = null;

function toggleLevel(level) {
    const detail = document.getElementById('detail-' + level);
    const levelEl = document.querySelector('[data-level="' + level + '"]');

    if (activeLevel === level) {
        detail.classList.remove('visible');
        levelEl.classList.remove('active');
        activeLevel = null;
        return;
    }

    // Close any open level
    if (activeLevel) {
        document.getElementById('detail-' + activeLevel).classList.remove('visible');
        document.querySelector('[data-level="' + activeLevel + '"]').classList.remove('active');
    }

    detail.classList.add('visible');
    levelEl.classList.add('active');
    activeLevel = level;
}

// Hover tooltips for advancement actions
document.querySelectorAll('.level').forEach(el => {
    const bar = el.querySelector('.level-bar');

    bar.addEventListener('mouseenter', function (e) {
        const advancement = el.getAttribute('data-advancement');
        if (advancement) {
            tooltip.textContent = advancement;
            tooltip.style.display = 'block';
            positionTooltip(e);
        }
    });

    bar.addEventListener('mousemove', positionTooltip);

    bar.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
    });
});

function positionTooltip(e) {
    let x = e.clientX + 14;
    let y = e.clientY + 14;
    if (x + 330 > window.innerWidth) x = e.clientX - 330;
    if (y + 100 > window.innerHeight) y = e.clientY - 100;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}
