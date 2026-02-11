function toggleNode(el) {
    const nodes = document.querySelectorAll('.okr-node');
    const id = el.dataset.id;
    const wasHighlighted = el.classList.contains('highlighted');

    nodes.forEach(n => { n.classList.remove('highlighted', 'dimmed'); });

    if (wasHighlighted) return;

    const chain = getChain(id);
    nodes.forEach(n => {
        if (chain.includes(n.dataset.id)) {
            n.classList.add('highlighted');
        } else {
            n.classList.add('dimmed');
        }
    });
}

function getChain(id) {
    const chain = [id];
    // Find parent chain
    let current = document.querySelector(`[data-id="${id}"]`);
    while (current && current.dataset.parent) {
        chain.push(current.dataset.parent);
        current = document.querySelector(`[data-id="${current.dataset.parent}"]`);
    }
    // Find children
    document.querySelectorAll('.okr-node').forEach(n => {
        if (n.dataset.parent === id) chain.push(n.dataset.id);
    });
    // Find grandchildren
    document.querySelectorAll('.okr-node').forEach(n => {
        if (chain.includes(n.dataset.parent) && !chain.includes(n.dataset.id)) {
            chain.push(n.dataset.id);
        }
    });
    return chain;
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.okr-node')) {
        document.querySelectorAll('.okr-node').forEach(n => {
            n.classList.remove('highlighted', 'dimmed');
        });
    }
});
