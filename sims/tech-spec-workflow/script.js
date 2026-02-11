// Stage color map
const stageColors = {
    '1': '#3b82f6',
    '2': '#14b8a6',
    '3': '#22c55e',
    '4': '#f59e0b',
    '5': '#7c3aed'
};

// Stage titles
const stageTitles = {
    '1': 'Problem Definition',
    '2': 'Technical Discovery',
    '3': 'Spec Drafting',
    '4': 'Review & Refinement',
    '5': 'Approval & Handoff'
};

const tooltip = document.getElementById('tooltip');
const detailsPanel = document.getElementById('details-panel');
const detailsContent = document.getElementById('details-content');
const cards = document.querySelectorAll('.stage-card');

let activeStage = null;

// Tooltip on hover
cards.forEach(function (card) {
    card.addEventListener('mouseenter', function (e) {
        var who = card.getAttribute('data-who');
        var artifacts = card.getAttribute('data-artifacts');

        tooltip.innerHTML =
            '<strong>Who:</strong> <span>' + who + '</span><br>' +
            '<strong>Artifacts:</strong> <span>' + artifacts + '</span>';
        tooltip.classList.add('visible');
    });

    card.addEventListener('mousemove', function (e) {
        var x = e.clientX + 14;
        var y = e.clientY + 14;

        // Keep tooltip within viewport
        var rect = tooltip.getBoundingClientRect();
        if (x + 240 > window.innerWidth) {
            x = e.clientX - 254;
        }
        if (y + rect.height > window.innerHeight) {
            y = e.clientY - rect.height - 14;
        }

        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    });

    card.addEventListener('mouseleave', function () {
        tooltip.classList.remove('visible');
    });

    // Click to expand details
    card.addEventListener('click', function () {
        var stage = card.getAttribute('data-stage');

        // Toggle off if clicking the same card
        if (activeStage === stage) {
            activeStage = null;
            detailsPanel.classList.remove('open');
            card.classList.remove('active');
            return;
        }

        // Remove active from all cards
        cards.forEach(function (c) {
            c.classList.remove('active');
        });

        activeStage = stage;
        card.classList.add('active');

        var who = card.getAttribute('data-who');
        var artifacts = card.getAttribute('data-artifacts');
        var description = card.getAttribute('data-description');
        var color = stageColors[stage];
        var title = stageTitles[stage];

        detailsContent.innerHTML =
            '<div class="accent-bar" style="background-color: ' + color + ';"></div>' +
            '<h4>Stage ' + stage + ': ' + title + '</h4>' +
            '<div class="detail-row">' +
                '<span class="label">Who:</span>' +
                '<span class="value">' + who + '</span>' +
            '</div>' +
            '<div class="detail-row">' +
                '<span class="label">Artifacts:</span>' +
                '<span class="value">' + artifacts + '</span>' +
            '</div>' +
            '<div class="detail-description">' + description + '</div>';

        detailsPanel.classList.add('open');
    });
});
