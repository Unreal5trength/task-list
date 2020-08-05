const taskList = document.getElementById('taskList');
const tasks = document.getElementsByClassName('task');
const createName = document.getElementsByClassName('createName');
const createBtn = document.getElementsByClassName('createBtn');
const body = document.getElementsByTagName('body')[0];
const optionBar = document.getElementById('optionBar');

function deleteTaskElement(btn) {
    let taskElement = btn.parentNode.parentNode;
    taskElement.remove();
}   // once invoked removes the parent of parent of button
    // task < intask < button is path

function deleteCreationNode(btn) {
    let node;
    if (btn.classList.contains("createBtn")) {
        node = btn.parentNode;
    } else if (btn.classList.contains("completeBtn")) {
        node = btn.parentNode.parentNode.parentNode;  
    };
    node.remove();
}

function createTaskContent(btn) {
    let task = btn.parentNode.parentNode;
    let subTask = btn.parentNode;
    let infoNode = document.createElement('div');
    task.insertBefore(infoNode, subTask);
    infoNode.className = "taskInfoNode";

    let completeDiv = document.createElement('div');
    infoNode.appendChild(completeDiv);
    completeDiv.className = "completeDiv";

    let completeBtn = document.createElement('button');
    completeDiv.appendChild(completeBtn);
    completeBtn.innerHTML = "Complete";
    completeBtn.className = 'completeBtn';
    completeBtn.addEventListener('click', () => {
        deleteCreationNode(completeBtn);
    });

    let nameDiv = document.createElement('div');
    infoNode.appendChild(nameDiv);
    nameDiv.className = "nameDiv";
    let taskName = document.createElement('h3');
    nameDiv.appendChild(taskName);
    taskName.innerHTML = btn.previousElementSibling.value;

    let hr = document.createElement('hr');
    infoNode.appendChild(hr);
}

function createTask(btn) {
    let task = btn.parentNode.parentNode;

    let taskClassList = [];
    for (let i = 0; i < task.classList.length; i++) {
        taskClassList.push(task.classList.item(i));
    };

    let indent = taskClassList.filter(c => {
        return c.startsWith("indent");
    });

    indent = parseInt(indent[0].slice(6, 7));

    if (indent > 0 && indent < 3) {

        if (indent + 1 > 0 && indent + 1 < 3) { // Checks if the indent of the indented task.
            // If the resulting indent is less then or equal to two, it creates the indented task., 
            let indentedTask = document.createElement('div');
            task.appendChild(indentedTask);
            indentedTask.classList = `task ${"indent"+ (indent + 1)}`;
            createCreationNodes(indentedTask);
        };
        let equalIndentTask = document.createElement('div');
        task.parentNode.appendChild(equalIndentTask);
        equalIndentTask.classList = `task indent${indent}`;
        createCreationNodes(equalIndentTask);

    } else if (indent === 0) { // If there is no indent, create another 0 indent task, and a 1 indent task.
        let indentedTask = document.createElement('div');
        task.appendChild(indentedTask);
        indentedTask.classList = `task ${"indent"+ (indent + 1)}`;
        createCreationNodes(indentedTask);

        let newTask = document.createElement('div');
        task.parentNode.appendChild(newTask);
        newTask.classList = `task indent0`;
        createCreationNodes(newTask);
    }  ;  
};

function createCreationNodes(task) {
        let creationNode = document.createElement('div');
        task.appendChild(creationNode);
        creationNode.classList = "taskCreationNode";

        let createName = document.createElement('input');
        creationNode.appendChild(createName);
        createName.setAttribute("type", "text");
        createName.setAttribute("placeholder", "Task name...");
        createName.classList.add("createName");

        let createBtn = document.createElement('button');
        creationNode.appendChild(createBtn);
        createBtn.setAttribute('type', 'button');
        createBtn.classList.add("createBtn");
        createBtn.innerHTML = "Create Task";

        createBtn.addEventListener('click', () => {
            let btn = event.currentTarget;
            createTask(btn);
            createCreationNodes(btn);
            createTaskContent(btn);
            deleteCreationNode(btn)
        });
        let hr = document.createElement('hr');
        creationNode.appendChild(hr);
};

function darkMode(choice) {
    switch (choice) {
        case true:
            body.classList.add('darkMode');
            break;
        case false:
            body.classList.remove('darkMode');
            break;
        case 'toggle':
            body.classList.toggle('darkMode');
            break
        default:
            console.log("Please specify true or false.");
            break;
    };
};



function createOptionBar() {
    let darkModeBtn = document.createElement('button');
    optionBar.appendChild(darkModeBtn);
    darkModeBtn.innerHTML = 'Toggle dark mode';
    darkModeBtn.addEventListener('click', () => {
        darkMode('toggle');
    });

    let toggleCreationNodes = document.createElement('button');
    optionBar.appendChild(toggleCreationNodes);
    toggleCreationNodes.innerHTML = 'Hide creation nodes';
    toggleCreationNodes.addEventListener('click', event => {
        let btn = event.currentTarget;
        body.classList.toggle('hideCreationNodes');
        if (body.classList.contains('hideCreationNodes')) {
            btn.innerHTML = 'Show creation nodes';
        } else {
            btn.innerHTML = 'Hide creation nodes';
        };
    });
}


createBtn[0].addEventListener('click', (event) => {
    let btn = event.currentTarget;
    createTask(btn);
    createTaskContent(btn);
    deleteCreationNode(btn);
}); // Creates a event listner for the initial creation node.

createOptionBar();