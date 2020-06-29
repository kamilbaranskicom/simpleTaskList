/**
 * simple taskList
 * v0.1
 * (c) kamilbaranski.com
 */




/**
 * taskList array = [ { name: string, done: boolean }, ... ]
 */
const taskList = []

const addTask = (event) => {
    event.preventDefault();
    const newTaskNameInputElement = document.querySelector('.js-newTaskName');
    const newTaskName = newTaskNameInputElement.value.trim();

    if (newTaskName) {
        newTaskNameInputElement.value = '';
        taskList.push({ name: newTaskName, done: false });
        render();
    }
    newTaskNameInputElement.focus();
}

const deleteTask = (index) => {
    taskList.splice(index, 1);
    render();
}

const toggleTaskDone = (index) => {
    taskList[index].done = !taskList[index].done;
    render();
}

const render = () => {
    let HTMLString = '';

    for (task of taskList) {
        HTMLString +=
            `       <li class="taskList__task">
            <button class="taskList__toggleTaskDone js-toggleTaskDone">${ (task.done ? '✔' : '')}</button>
            <strong class="taskList__taskName${ (task.done ? ' taskList__taskName--done' : '')}">${task.name}</strong>
            <button class="taskList__deleteTask js-deleteTask">🗑️</button>
        </li>
`;
    };
    document.querySelector('.js-taskList').innerHTML = HTMLString;
    bindEvents();
}

const bindEvents = () => {
    document.querySelectorAll('.js-toggleTaskDone').forEach((button, index) => {
        button.addEventListener('click', () => { toggleTaskDone(index) });
    });

    document.querySelectorAll('.js-deleteTask').forEach((button, index) => {
        button.addEventListener('click', () => { deleteTask(index) });
    });
}

const init = () => {
    document.querySelector('.js-addTaskForm').addEventListener('submit', addTask);

    // not needed, as we start with empty taskList, but hey, let's be solid ;)
    render();
}

init();
