const quadrantData = {
    'human-essential': {
        title: 'Human Essential',
        color: '#ef4444',
        bgColor: '#fee2e2',
        tasks: [
            { name: 'Strategy Development', timeSave: 'N/A' },
            { name: 'Stakeholder Negotiation', timeSave: 'N/A' },
            { name: 'Team Culture Building', timeSave: 'N/A' },
            { name: 'Conflict Resolution', timeSave: 'N/A' },
            { name: 'Executive Presentations', timeSave: '~10%' },
            { name: 'Customer Empathy', timeSave: 'N/A' },
            { name: 'Ethical Decision Making', timeSave: 'N/A' }
        ]
    },
    'ai-augmented': {
        title: 'AI-Augmented',
        color: '#7c3aed',
        bgColor: '#ede9fe',
        tasks: [
            { name: 'Architecture Reviews', timeSave: '~30%' },
            { name: 'Competitive Analysis', timeSave: '~50%' },
            { name: 'Requirements Writing', timeSave: '~40%' },
            { name: 'Sprint Planning', timeSave: '~25%' },
            { name: 'Risk Assessment', timeSave: '~35%' },
            { name: 'User Research Synthesis', timeSave: '~45%' },
            { name: 'Roadmap Planning', timeSave: '~20%' }
        ]
    },
    'automate': {
        title: 'Automate / Eliminate',
        color: '#6b7280',
        bgColor: '#f3f4f6',
        tasks: [
            { name: 'Status Reports', timeSave: '~90%' },
            { name: 'Meeting Summaries', timeSave: '~85%' },
            { name: 'Data Formatting', timeSave: '~95%' },
            { name: 'Simple Queries', timeSave: '~80%' },
            { name: 'Calendar Scheduling', timeSave: '~70%' },
            { name: 'Template Generation', timeSave: '~90%' }
        ]
    },
    'ai-led': {
        title: 'AI-Led',
        color: '#22c55e',
        bgColor: '#dcfce7',
        tasks: [
            { name: 'Documentation Drafts', timeSave: '~70%' },
            { name: 'Code Review Summaries', timeSave: '~75%' },
            { name: 'Bug Triage', timeSave: '~60%' },
            { name: 'Test Generation', timeSave: '~65%' },
            { name: 'Release Notes', timeSave: '~80%' },
            { name: 'API Documentation', timeSave: '~70%' },
            { name: 'Data Analysis Reports', timeSave: '~55%' }
        ]
    }
};

const tooltip = document.getElementById('tooltip');

function init() {
    Object.keys(quadrantData).forEach(key => {
        const container = document.getElementById('dots-' + key);
        const data = quadrantData[key];

        data.tasks.forEach((task, i) => {
            const dot = document.createElement('div');
            dot.className = 'task-dot';
            dot.textContent = (i + 1).toString();
            dot.setAttribute('data-task', task.name);
            dot.setAttribute('data-save', task.timeSave);

            dot.addEventListener('mouseenter', function (e) {
                tooltip.innerHTML = '<strong>' + task.name + '</strong><br>Time saved with AI: ' + task.timeSave;
                tooltip.style.display = 'block';
                positionTooltip(e);
            });

            dot.addEventListener('mousemove', positionTooltip);

            dot.addEventListener('mouseleave', function () {
                tooltip.style.display = 'none';
            });

            container.appendChild(dot);
        });
    });
}

let activeQuadrant = null;

function toggleQuadrant(key) {
    const panel = document.getElementById('task-panel');

    if (activeQuadrant === key) {
        closePanel();
        return;
    }

    activeQuadrant = key;
    const data = quadrantData[key];
    document.getElementById('panel-title').textContent = data.title;
    document.getElementById('panel-title').style.color = data.color;

    const list = document.getElementById('panel-tasks');
    list.innerHTML = '';

    data.tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = '<span>' + task.name + '</span><span class="time-save" style="background:' + data.bgColor + ';color:' + data.color + '">' + task.timeSave + ' saved</span>';
        list.appendChild(li);
    });

    panel.classList.add('visible');
}

function closePanel() {
    document.getElementById('task-panel').classList.remove('visible');
    activeQuadrant = null;
}

function positionTooltip(e) {
    let x = e.clientX + 14;
    let y = e.clientY + 14;
    if (x + 260 > window.innerWidth) x = e.clientX - 260;
    if (y + 80 > window.innerHeight) y = e.clientY - 80;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

init();
