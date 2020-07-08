{
    /**
     * simple taskList
     * v0.1
     * (c) kamilbaranski.com
     * JS/HTML/CSS/BEM exercise for YouCode
     */


    /**
     * taskList array = [ { name: string, done: boolean }, ... ]
     */
    let taskList = []

    const addTask = () => {
        const newTaskNameInputElement = document.querySelector('.js-newTaskName');
        const newTaskName = newTaskNameInputElement.value.trim();

        if (newTaskName) {
            newTaskNameInputElement.value = '';
            taskList = [
                ...taskList,
                { name: newTaskName, done: false }
            ];
            render();
        }
        newTaskNameInputElement.focus();
    }

    const deleteTask = (index) => {
        taskList = [
            ...taskList.slice(0, index),
            ...taskList.slice(index + 1)
        ];
        render();
    }

    const toggleTaskDone = (index) => {
        taskList = [
            ...taskList.slice(0, index),
            { ...taskList[index], done: !taskList[index].done },
            ...taskList.slice(index + 1)
        ];
        render();
    }

    const toggleHideDone = () => {
        const taskListElement = document.querySelector('.js-taskList');

        taskListElement.classList.toggle('taskList__taskList--hideDone');
        document.querySelector('.js-toggleHideDoneMark').innerHTML = (taskListElement.classList.contains('taskList__taskList--hideDone') ? 'Ukryj' : 'Pokaż');
    }

    const markAllAsDone = () => {
        taskList = taskList.map(task => ({ ...task, done: true }));
        render();
    }

    const render = () => {
        document.querySelector('.js-taskList').innerHTML = (taskList.map(({ done, name }) =>
            `<li class="taskList__task${(done ? ' taskList__task--done' : '')}">
                <button class="taskList__smallButton js-toggleTaskDone">${ (done ? '✔' : '')}</button>
                <strong class="taskList__taskName">${name}</strong>
                <button class="taskList__smallButton taskList__smallButton--red js-deleteTask">🗑</button>
                `)).join('');

        setOptionalButtons();
        bindEvents();
    }

    const setOptionalButtons = () => {
        const markAllAsDoneButton = document.querySelector('.js-markAllAsDone');
        const toggleHideDoneButton = document.querySelector('.js-toggleHideDone');

        markAllAsDoneButton.disabled = taskList.every(({ done }) => done);

        if (taskList.length) {
            toggleHideDoneButton.classList.remove('taskList__textButton--hidden');
            markAllAsDoneButton.classList.remove('taskList__textButton--hidden');
        } else {
            toggleHideDoneButton.classList.add('taskList__textButton--hidden');
            markAllAsDoneButton.classList.add('taskList__textButton--hidden');
        }
    };

    const bindEvents = () => {
        document.querySelectorAll('.js-toggleTaskDone').forEach((button, index) => {
            button.addEventListener('click', () => { toggleTaskDone(index) });
        });

        document.querySelectorAll('.js-deleteTask').forEach((button, index) => {
            button.addEventListener('click', () => { deleteTask(index) });
        });
    }

    const init = () => {
        // not needed, as we start with empty taskList, but hey, let's be solid ;)
        render();

        document.querySelector('.js-addTaskForm').addEventListener('submit', (event) => { event.preventDefault(); addTask(); });
        document.querySelector('.js-newTaskName').focus();
        document.querySelector('.js-toggleHideDone').addEventListener('click', toggleHideDone);
        document.querySelector('.js-markAllAsDone').addEventListener('click', markAllAsDone);
    }

    init();
}
