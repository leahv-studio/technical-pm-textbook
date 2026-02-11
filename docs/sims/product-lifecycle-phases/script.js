function selectPhase(el) {
    const cards = document.querySelectorAll('.phase-card');
    const wasSelected = el.classList.contains('selected');
    cards.forEach(c => c.classList.remove('selected'));
    if (!wasSelected) {
        el.classList.add('selected');
    }
}
