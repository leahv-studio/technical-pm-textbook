const eventDescriptions = {
    plan: 'Sprint Planning: The team selects items from the product backlog for the upcoming sprint. The Product Owner prioritizes, and the team estimates and commits to a set of user stories. Typically 2-4 hours for a 2-week sprint.',
    standup: 'Daily Standup: A 15-minute time-boxed meeting where each team member answers: What did I do yesterday? What will I do today? Are there any blockers? The Scrum Master facilitates and helps remove impediments.',
    work: 'Sprint Work: The development team works on the committed sprint backlog items. They self-organize to complete the work, collaborate on technical decisions, and update the sprint board. No new work is added mid-sprint.',
    review: 'Sprint Review: The team demonstrates completed work to stakeholders at the end of the sprint. Feedback is gathered, and the product backlog may be updated based on new insights. This is NOT a status meeting but a working session.',
    retro: 'Sprint Retrospective: The team reflects on the sprint process itself. What went well? What could be improved? What will we commit to changing? Action items are identified and tracked. This drives continuous improvement.'
};

const scrumTooltip = document.getElementById('scrumTooltip');

document.querySelectorAll('.cycle-event').forEach(event => {
    event.addEventListener('mouseenter', () => {
        const key = event.dataset.event;
        scrumTooltip.textContent = eventDescriptions[key];
        scrumTooltip.classList.add('active');
    });

    event.addEventListener('mouseleave', () => {
        scrumTooltip.classList.remove('active');
    });

    event.addEventListener('click', () => {
        const key = event.dataset.event;
        scrumTooltip.textContent = eventDescriptions[key];
        scrumTooltip.classList.add('active');
    });
});

const columnDescriptions = {
    todo: 'To Do: Items that have been prioritized and are ready to be picked up. Anyone on the team can pull the top item when they have capacity. Items are ordered by priority from top to bottom.',
    progress: 'In Progress: Items currently being worked on. The WIP (Work in Progress) limit of 3 prevents the team from starting too many things at once, which would increase context switching and reduce throughput.',
    review: 'Review: Completed items awaiting code review, QA, or stakeholder approval. Keeping this column small ensures fast feedback loops and prevents bottlenecks before deployment.',
    done: 'Done: Items that have met the Definition of Done and are deployed or ready for deployment. Tracking done items helps measure throughput and cycle time.'
};

document.querySelectorAll('.kanban-column').forEach(col => {
    col.addEventListener('mouseenter', () => {
        const key = col.dataset.col;
        col.title = columnDescriptions[key];
    });
});
