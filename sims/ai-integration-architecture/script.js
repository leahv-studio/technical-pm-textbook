const tooltip = document.getElementById('tooltip');

function setView(view) {
    const syncCol = document.getElementById('sync-col');
    const asyncCol = document.getElementById('async-col');
    const sharedCenter = document.getElementById('shared-center');
    const buttons = document.querySelectorAll('.toggle-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + view).classList.add('active');

    syncCol.classList.remove('hidden');
    asyncCol.classList.remove('hidden');
    sharedCenter.classList.remove('hidden');

    if (view === 'sync') {
        asyncCol.classList.add('hidden');
    } else if (view === 'async') {
        syncCol.classList.add('hidden');
    }

    closeDetail();
}

function showDetail(el) {
    const panel = document.getElementById('detail-panel');
    const text = document.getElementById('detail-text');
    text.textContent = el.getAttribute('data-tooltip');
    panel.classList.add('visible');
}

function closeDetail() {
    document.getElementById('detail-panel').classList.remove('visible');
}

document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', function (e) {
        if (this.classList.contains('shared-component')) return;
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.display = 'block';
        positionTooltip(e);
    });

    el.addEventListener('mousemove', function (e) {
        if (this.classList.contains('shared-component')) return;
        positionTooltip(e);
    });

    el.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
    });
});

function positionTooltip(e) {
    let x = e.clientX + 12;
    let y = e.clientY + 12;

    if (x + 290 > window.innerWidth) {
        x = e.clientX - 290;
    }
    if (y + 100 > window.innerHeight) {
        y = e.clientY - 100;
    }

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}
