let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');
let addTask = document.getElementById('addTask');
let tasks = document.getElementsByClassName('tasks');

let test = document.getElementById('test');

function createTask() {
    let task = document.createElement('div');
    task.className = 'tasks';
    taskList.appendChild(task);
}

addTask.addEventListener('click', () => {
    createTask();
});

test.addEventListener('click', function() {

});