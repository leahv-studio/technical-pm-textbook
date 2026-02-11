const componentData = {
    context: {
        strong: 'You are helping a non-technical PM understand database choices for a SaaS product with 10K users.',
        active: false
    },
    role: {
        strong: 'As a senior engineer mentoring a new technical PM, explain REST APIs.',
        active: false
    },
    task: {
        strong: 'Create 5 slide titles and 3 bullet points each for a board presentation on our API strategy.',
        active: false
    },
    format: {
        strong: 'Provide a comparison table with columns: Feature, Pros, Cons, Best For.',
        active: false
    },
    constraints: {
        strong: 'Use no more than 200 words. Avoid jargon. Target a non-technical executive audience.',
        active: false
    }
};

function toggleComponent(name) {
    const data = componentData[name];
    data.active = !data.active;

    const weakEl = document.getElementById('weak-' + name);
    const strongEl = document.getElementById('strong-' + name);
    const badge = document.getElementById('badge-' + name);
    const component = document.querySelector('[data-component="' + name + '"]');

    if (data.active) {
        weakEl.classList.remove('active');
        strongEl.classList.add('active');
        badge.textContent = 'Strong';
        badge.classList.add('strong');
        component.classList.add('active');
    } else {
        strongEl.classList.remove('active');
        weakEl.classList.add('active');
        badge.textContent = 'Weak';
        badge.classList.remove('strong');
        component.classList.remove('active');
    }

    updateCombinedPrompt();
}

function updateCombinedPrompt() {
    const output = document.getElementById('prompt-output');
    const counter = document.getElementById('active-count');
    const activeComponents = Object.entries(componentData).filter(([_, v]) => v.active);

    counter.textContent = activeComponents.length;

    if (activeComponents.length === 0) {
        output.innerHTML = '<span class="placeholder">Click components above to build your prompt...</span>';
        return;
    }

    const segments = activeComponents.map(([key, val]) => {
        return '<span class="prompt-segment" data-type="' + key + '">' + val.strong + '</span>';
    });

    output.innerHTML = segments.join(' ');
}
