const stages = [
    {
        id: 'commit',
        name: 'Code Commit',
        icon: '\u{1F4DD}',
        category: 'Dev',
        colorClass: 'color-dev',
        gate: 'Lint Pass',
        description: 'Developers push code changes to the version control repository. This triggers the automated pipeline. Pre-commit hooks may run linting and formatting checks before the code even enters the pipeline.',
        activities: [
            'Code pushed to feature branch',
            'Pre-commit hooks run local linting',
            'Pull request / merge request created',
            'Code review triggered for team members'
        ],
        failure: 'Commit is rejected by pre-commit hooks. Developer must fix linting errors, formatting issues, or commit message format before the code enters the pipeline.'
    },
    {
        id: 'unit',
        name: 'Unit Tests',
        icon: '\u{1F9EA}',
        category: 'Test',
        colorClass: 'color-test',
        gate: 'All Pass',
        description: 'Fast, isolated tests that verify individual functions and methods work correctly. These run in seconds and catch logic errors, edge cases, and regressions at the smallest level.',
        activities: [
            'Run all unit test suites in parallel',
            'Measure code coverage percentage',
            'Check coverage thresholds are met',
            'Report results back to pull request'
        ],
        failure: 'Pipeline stops immediately. The developer is notified of the failing test with the exact assertion failure. The PR is blocked from merging until tests pass. This is the cheapest place to catch bugs.'
    },
    {
        id: 'integration',
        name: 'Integration Tests',
        icon: '\u{1F517}',
        category: 'Test',
        colorClass: 'color-test',
        gate: 'All Pass',
        description: 'Tests that verify multiple components work correctly together. These typically involve real databases, message queues, or API calls between services and take longer to run.',
        activities: [
            'Spin up test database with seed data',
            'Test API endpoints with real HTTP calls',
            'Verify service-to-service communication',
            'Check database migration compatibility'
        ],
        failure: 'Indicates a contract violation between components. One service may have changed its API without updating consumers. The team must identify which integration broke and coordinate a fix across affected services.'
    },
    {
        id: 'build',
        name: 'Build / Package',
        icon: '\u{1F4E6}',
        category: 'Build',
        colorClass: 'color-build',
        gate: 'Artifact Ready',
        description: 'The application is compiled, bundled, and packaged into a deployable artifact. This may include building Docker images, creating release bundles, or compiling binaries for different platforms.',
        activities: [
            'Compile source code and resolve dependencies',
            'Build Docker images or deployment packages',
            'Tag artifact with version and commit hash',
            'Push artifact to registry or storage'
        ],
        failure: 'Compilation errors, missing dependencies, or Docker build failures. Often caused by environment differences between local development and CI. The team must fix dependency versions or build configuration.'
    },
    {
        id: 'e2e',
        name: 'E2E Tests',
        icon: '\u{1F5A5}',
        category: 'Test',
        colorClass: 'color-test',
        gate: 'All Pass',
        description: 'End-to-end tests simulate real user workflows in a browser or API client. These validate that the entire application stack works together from the user\'s perspective.',
        activities: [
            'Deploy to staging environment',
            'Run browser automation tests (Selenium/Playwright)',
            'Test critical user journeys end-to-end',
            'Capture screenshots for visual regression'
        ],
        failure: 'A user-facing workflow is broken. This is caught late in the pipeline, making it more expensive to fix. The team must investigate whether the issue is in the frontend, backend, or data layer.'
    },
    {
        id: 'performance',
        name: 'Performance Tests',
        icon: '\u{26A1}',
        category: 'Test',
        colorClass: 'color-test',
        gate: 'Thresholds Met',
        description: 'Load testing, stress testing, and performance benchmarking ensure the application meets latency and throughput requirements under expected and peak load conditions.',
        activities: [
            'Run load tests with simulated traffic',
            'Measure response time percentiles (p50, p95, p99)',
            'Check memory and CPU usage under load',
            'Compare against performance baselines'
        ],
        failure: 'Response times exceed acceptable thresholds or the system crashes under load. This may indicate an N+1 query, missing database index, memory leak, or insufficient resource allocation. Requires profiling to diagnose.'
    },
    {
        id: 'security',
        name: 'Security Scan',
        icon: '\u{1F6E1}',
        category: 'Test',
        colorClass: 'color-test',
        gate: 'No Critical',
        description: 'Static application security testing (SAST), dynamic testing (DAST), and dependency vulnerability scanning to identify security issues before production deployment.',
        activities: [
            'Scan dependencies for known CVEs',
            'Run static code analysis for security patterns',
            'Check for secrets or credentials in code',
            'Validate security headers and configurations'
        ],
        failure: 'A critical vulnerability is found, such as an exposed secret, SQL injection risk, or a dependency with a known exploit. Deployment is blocked until the vulnerability is remediated or an exception is granted.'
    },
    {
        id: 'deploy',
        name: 'Deploy to Production',
        icon: '\u{1F680}',
        category: 'Deploy',
        colorClass: 'color-deploy',
        gate: 'Live',
        description: 'The verified artifact is deployed to production using strategies like blue-green deployment, canary releases, or rolling updates. Post-deployment monitoring ensures everything is healthy.',
        activities: [
            'Execute deployment strategy (canary/blue-green)',
            'Run smoke tests against production',
            'Monitor error rates and latency dashboards',
            'Enable feature flags if applicable'
        ],
        failure: 'Deployment fails or post-deployment monitoring detects elevated error rates. The team triggers an automatic rollback to the previous stable version and investigates the root cause.'
    }
];

const pipelineEl = document.getElementById('pipeline');
const infoPanel = document.getElementById('infoPanel');
const infoIcon = document.getElementById('infoIcon');
const infoTitle = document.getElementById('infoTitle');
const infoDescription = document.getElementById('infoDescription');
const infoActivities = document.getElementById('infoActivities');
const failureSection = document.getElementById('failureSection');
const failureText = document.getElementById('failureText');

function buildPipeline() {
    stages.forEach((stage, index) => {
        const stageEl = document.createElement('div');
        stageEl.className = 'stage';
        stageEl.dataset.index = index;

        stageEl.innerHTML = `
            <div class="stage-box ${stage.colorClass}">
                <div class="stage-icon">${stage.icon}</div>
                <div class="stage-name">${stage.name}</div>
                <div class="stage-category">${stage.category}</div>
                <div class="gate-indicator">${stage.gate}</div>
            </div>
        `;

        stageEl.addEventListener('click', () => showStageInfo(index));
        pipelineEl.appendChild(stageEl);

        if (index < stages.length - 1) {
            const connector = document.createElement('div');
            connector.className = 'stage-connector';
            pipelineEl.appendChild(connector);
        }
    });
}

function showStageInfo(index) {
    const stage = stages[index];

    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.stage')[index].classList.add('active');

    infoIcon.textContent = stage.icon;
    infoIcon.className = `info-icon ${stage.colorClass}`;
    infoTitle.textContent = stage.name;
    infoDescription.textContent = stage.description;

    infoActivities.innerHTML = stage.activities
        .map(a => `<li>${a}</li>`)
        .join('');

    failureText.textContent = stage.failure;

    infoPanel.classList.remove('active');
    void infoPanel.offsetWidth;
    infoPanel.classList.add('active');
}

buildPipeline();
