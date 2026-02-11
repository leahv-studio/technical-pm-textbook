const docs = {
    'business-req': {
        color: '#3b82f6', title: 'Business Requirements',
        desc: 'Defines <strong>what</strong> the product must achieve and <strong>why</strong>. Owned by the PM, this document translates user needs and strategy into specific capabilities.',
        flows: ['Feeds into Technical Spec and Engineering Spec', 'Informed by market research and customer feedback', 'Success metrics flow to Test Plan'],
        connects: ['tech-spec', 'eng-spec', 'test-plan']
    },
    'eng-spec': {
        color: '#22c55e', title: 'Engineering Specification',
        desc: 'Describes <strong>how</strong> the engineering team plans to build the feature. Includes detailed design, alternatives considered, and rollout plan.',
        flows: ['Derived from Business Requirements and Technical Spec', 'Informs API Documentation and Test Plan', 'Rollout details feed into Runbook'],
        connects: ['business-req', 'tech-spec', 'api-doc', 'test-plan', 'runbook']
    },
    'tech-spec': {
        color: '#14b8a6', title: 'Technical Specification',
        desc: 'The contract between PM and Engineering. Defines functional requirements, NFRs, data model, API contracts, and edge cases.',
        flows: ['Translates Business Requirements into implementable detail', 'Guides Engineering Spec decisions', 'Defines API contracts documented in API Docs'],
        connects: ['business-req', 'eng-spec', 'api-doc']
    },
    'api-doc': {
        color: '#f59e0b', title: 'API Documentation',
        desc: 'Reference material for developers consuming the API. Includes endpoints, parameters, authentication, response formats, and error codes.',
        flows: ['Derived from Technical Spec API contracts', 'Engineering Spec defines implementation details', 'Used by external developers and partner integrations'],
        connects: ['tech-spec', 'eng-spec']
    },
    'test-plan': {
        color: '#7c3aed', title: 'Test Plan',
        desc: 'Verification strategy defining how correctness will be confirmed. Includes unit, integration, and E2E test cases derived from requirements.',
        flows: ['Test cases derived from Business Requirements', 'Technical scenarios from Engineering Spec', 'Results inform deployment readiness (Runbook)'],
        connects: ['business-req', 'eng-spec', 'runbook']
    },
    'runbook': {
        color: '#ef4444', title: 'Runbook',
        desc: 'Operations guide for incidents and deployments. Describes how to deploy, monitor, troubleshoot, and rollback the feature in production.',
        flows: ['Deployment steps from Engineering Spec', 'Monitoring criteria from Test Plan results', 'Referenced during incidents and on-call rotations'],
        connects: ['eng-spec', 'test-plan']
    }
};

const panel = document.getElementById('detailPanel');
const header = document.getElementById('detailHeader');
const body = document.getElementById('detailBody');
let selected = null;

function selectDoc(el) {
    const id = el.dataset.id;
    if (selected === id) { clearSelection(); return; }
    selected = id;
    const data = docs[id];
    document.querySelectorAll('.doc-node').forEach(n => {
        const nid = n.dataset.id;
        if (nid === id || data.connects.includes(nid)) {
            n.classList.remove('dimmed');
            n.classList.toggle('selected', nid === id);
        } else {
            n.classList.add('dimmed');
            n.classList.remove('selected');
        }
    });
    header.style.background = data.color;
    header.textContent = data.title;
    body.innerHTML = `<p>${data.desc}</p><p style="margin-top:8px"><strong>Information flows:</strong></p><ul>${data.flows.map(f => `<li>${f}</li>`).join('')}</ul>`;
    panel.classList.add('visible');
    panel.style.borderColor = data.color;
}

function clearSelection() {
    selected = null;
    document.querySelectorAll('.doc-node').forEach(n => {
        n.classList.remove('selected', 'dimmed');
    });
    panel.classList.remove('visible');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.doc-node')) clearSelection();
});

const tooltip = document.getElementById('tooltip');
document.querySelectorAll('.doc-node').forEach(n => {
    n.addEventListener('mouseenter', (e) => {
        const d = docs[n.dataset.id];
        tooltip.textContent = `${d.title}: ${d.flows[0]}`;
        tooltip.classList.add('visible');
    });
    n.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top = (e.clientY - 8) + 'px';
    });
    n.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
});
