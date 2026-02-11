// Full-Stack Architecture Diagram - Interactive Logic

document.addEventListener('DOMContentLoaded', function () {
    const layers = document.querySelectorAll('.layer');

    layers.forEach(function (layer) {
        layer.addEventListener('click', function (e) {
            const wasActive = layer.classList.contains('active');

            // Deactivate all layers
            layers.forEach(function (l) {
                l.classList.remove('active');
            });

            // Toggle the clicked layer
            if (!wasActive) {
                layer.classList.add('active');
            }
        });

        // Keyboard accessibility
        layer.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                layer.click();
            }
        });
    });

    // Close active layer when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.layer')) {
            layers.forEach(function (l) {
                l.classList.remove('active');
            });
        }
    });
});
