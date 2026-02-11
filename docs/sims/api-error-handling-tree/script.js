function toggle(id) {
    const el = document.getElementById(id);
    const wasVisible = el.classList.contains('visible');
    document.querySelectorAll('.detail').forEach(d => d.classList.remove('visible'));
    if (!wasVisible) el.classList.add('visible');
}
