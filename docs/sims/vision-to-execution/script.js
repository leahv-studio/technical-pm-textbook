/* Vision to Execution Framework - Script */

(function () {
    'use strict';

    const tooltip = document.getElementById('tooltip');

    const arrowInfo = {
        guides: 'The product vision provides long-term direction that keeps strategy aligned with the company\'s aspirational goals.',
        priorities: 'Strategy narrows the focus, telling the roadmap team which problems matter most and in what order.',
        scope: 'The roadmap breaks priorities into well-scoped initiatives that sprint teams can pick up and deliver.',
        feedback1: 'Sprint retrospectives and user feedback surface learnings that may refine or validate the strategy.',
        feedback2: 'Roadmap outcomes reveal whether the strategic bets are paying off, prompting course corrections.',
        feedback3: 'Execution data (velocity, quality, adoption) informs what is realistic to plan on the roadmap.'
    };

    /* Expand / collapse levels on click */
    document.querySelectorAll('.level').forEach(function (level) {
        level.addEventListener('click', function (e) {
            /* Don't collapse if user is selecting text */
            if (window.getSelection().toString().length > 0) return;
            var isExpanded = level.classList.contains('expanded');
            /* Collapse all first */
            document.querySelectorAll('.level').forEach(function (l) {
                l.classList.remove('expanded');
            });
            if (!isExpanded) {
                level.classList.add('expanded');
            }
        });
    });

    /* Arrow tooltips */
    function showTooltip(text, e) {
        tooltip.textContent = text;
        tooltip.classList.add('visible');
        positionTooltip(e);
    }

    function hideTooltip() {
        tooltip.classList.remove('visible');
    }

    function positionTooltip(e) {
        var x = e.clientX + 14;
        var y = e.clientY - 10;
        var rect = tooltip.getBoundingClientRect();
        if (x + rect.width > window.innerWidth - 10) {
            x = e.clientX - rect.width - 14;
        }
        if (y + rect.height > window.innerHeight - 10) {
            y = e.clientY - rect.height - 10;
        }
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    document.querySelectorAll('.arrow-down, .arrow-up').forEach(function (arrow) {
        var key = arrow.dataset.arrow;
        if (!key) return;

        arrow.addEventListener('mouseenter', function (e) {
            if (arrowInfo[key]) {
                showTooltip(arrowInfo[key], e);
            }
        });
        arrow.addEventListener('mousemove', function (e) {
            positionTooltip(e);
        });
        arrow.addEventListener('mouseleave', function () {
            hideTooltip();
        });
    });

    /* Level hover tooltips (brief) */
    var levelBriefs = {
        vision: 'Click to expand details about the Product Vision layer.',
        strategy: 'Click to expand details about the Product Strategy layer.',
        roadmap: 'Click to expand details about the Product Roadmap layer.',
        execution: 'Click to expand details about the Sprint / Execution layer.'
    };

    document.querySelectorAll('.level').forEach(function (level) {
        var key = level.dataset.level;

        level.addEventListener('mouseenter', function (e) {
            if (!level.classList.contains('expanded') && levelBriefs[key]) {
                showTooltip(levelBriefs[key], e);
            }
        });
        level.addEventListener('mousemove', function (e) {
            if (!level.classList.contains('expanded')) {
                positionTooltip(e);
            }
        });
        level.addEventListener('mouseleave', function () {
            hideTooltip();
        });
    });
})();
