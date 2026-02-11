function selectPattern(el) {
    const wasSelected = el.classList.contains('selected');
    document.querySelectorAll('.col').forEach(c => c.classList.remove('selected'));
    if (!wasSelected) el.classList.add('selected');
}
