let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');
let addTask = document.getElementById('addTask');
let tasks = document.getElementsByClassName('tasks');

let test = document.getElementById('test');

function createTask() {
    let task = document.createElement('div');
    task.className = 'tasks';
    taskList.appendChild(task);

    let taskButtons = document.createElement('div');
    taskButtons.className = 'buttons';
    task.appendChild(taskButtons);

    let taskInformation = document.createElement('div');
    taskInformation.className = 'information';
    task.appendChild(taskInformation);

    let taskValue = document.createElement('p');
    taskValue.innerHTML = taskInput.value;
    taskInput.value = '';
    taskInformation.appendChild(taskValue);

    createButtons(taskButtons);
}

function createButtons(parent) {
    let completeBtn = document.createElement('button');
    completeBtn.className = 'complete';
    completeBtn.innerHTML = 'Completed';
    parent.appendChild(completeBtn);
    completeBtn.addEventListener('click', () => {
        
    });

    let upBtn = document.createElement('button');
    upBtn.className = 'up';
    upBtn.innerHTML = 'Up';
    parent.appendChild(upBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = 'Delete';
    parent.appendChild(deleteBtn);

    let downBtn = document.createElement('button');
    downBtn.className = 'down';
    downBtn.innerHTML = 'Down';
    parent.appendChild(downBtn);
}

addTask.addEventListener('click', () => {
    createTask();
});