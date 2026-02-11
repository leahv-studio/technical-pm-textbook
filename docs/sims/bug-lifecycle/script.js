// Bug Lifecycle - Interactive Stage Highlighting
(function () {
    'use strict';

    const stages = document.querySelectorAll('.stage');
    let activeStage = null;

    // Click to highlight a stage (toggle)
    stages.forEach(function (stage) {
        stage.addEventListener('click', function () {
            if (activeStage === stage) {
                // Clicking the same stage again deselects it
                stage.classList.remove('highlighted');
                activeStage = null;
            } else {
                // Remove highlight from previous stage
                if (activeStage) {
                    activeStage.classList.remove('highlighted');
                }
                // Highlight the clicked stage
                stage.classList.add('highlighted');
                activeStage = stage;
            }
        });
    });

    // Allow clicking outside stages to deselect
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.stage') && activeStage) {
            activeStage.classList.remove('highlighted');
            activeStage = null;
        }
    });
})();
