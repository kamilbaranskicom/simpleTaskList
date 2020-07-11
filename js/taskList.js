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

    const addTask = (newTaskName) => {
        taskList = [
            ...taskList,
            { name: newTaskName, done: false }
        ];
        render();
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

        taskListElement.classList.toggle('tasks--hideDone');
        document.querySelector('.js-toggleHideDoneMark').innerHTML = (taskListElement.classList.contains('tasks--hideDone') ? 'Pokaż' : 'Ukryj');
    }

    const markAllAsDone = () => {
        taskList = taskList.map(task => ({ ...task, done: true }));
        render();
    }

    const render = () => {
        document.querySelector('.js-taskList').innerHTML = (taskList.map(({ done, name }) =>
            `<li class="tasks__task ${(done ? ' tasks__task--done' : '')}">
                <button class="tasks__smallButton js-toggleTaskDone">${ (done ? '✔' : '')}</button>
                <strong class="tasks__taskName">${name}</strong>
                <button class="tasks__smallButton tasks__smallButton--warning js-deleteTask">🗑</button>
                `)).join('');

        setOptionalButtons();
        bindEvents();
    }

    const setOptionalButtons = () => {
        document.querySelector('.js-markAllAsDone').disabled = taskList.every(({ done }) => done);
        document.querySelector('.js-textButtons').classList.toggle('textButtons--hidden', !(taskList.length));
    };

    const bindEvents = () => {
        document.querySelectorAll('.js-toggleTaskDone').forEach((button, index) => {
            button.addEventListener('click', () => { toggleTaskDone(index) });
        });

        document.querySelectorAll('.js-deleteTask').forEach((button, index) => {
            button.addEventListener('click', () => { deleteTask(index) });
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskNameInputElement = document.querySelector('.js-newTaskName');
        const newTaskName = newTaskNameInputElement.value.trim();

        if (newTaskName) {
            newTaskNameInputElement.value = '';
            addTask(newTaskName);
        }
        newTaskNameInputElement.focus();
    }

    const init = () => {
        // not needed, as we start with empty taskList, but hey, let's be solid ;)
        render();

        document.querySelector('.js-addTaskForm').addEventListener('submit', onFormSubmit);
        document.querySelector('.js-newTaskName').focus();
        document.querySelector('.js-toggleHideDone').addEventListener('click', toggleHideDone);
        document.querySelector('.js-markAllAsDone').addEventListener('click', markAllAsDone);
    }

    init();
}
