
const taskInput = document.querySelector('#new-task');
const addButton = document.querySelector('#btn-add');
const incompleteTaskHolder = document.querySelector('#incompleteTasks');
const completedTasksHolder = document.querySelector('#completed-tasks');


const createNewTaskElement = function(taskString) {

    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const editInput = document.createElement('input');
    const editButton = document.createElement('button');

    const deleteButton = document.createElement('button');
    const deleteButtonImg = document.createElement('img');

    listItem.className = 'list__item';
    label.innerText = taskString;
    label.className = 'list__label task';

    checkBox.className = 'list__checkbox';
    checkBox.type = 'checkbox';
    editInput.type = 'text';
    editInput.className = 'list__input task';

    editButton.innerText = 'Edit';
    editButton.className = 'btn edit';

    deleteButton.className = 'btn delete';
    deleteButtonImg.className = 'btn__img';
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}


const addTask = function() {
    if (!taskInput.value) {
        return;
    }
    const listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';

}

const editTask = function() {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('.list__input');
    const label = listItem.querySelector('.list__label');
    const editBtn = listItem.querySelector('.edit');
    const containsClass = listItem.classList.contains('list__item_edit');

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }
    listItem.classList.toggle('list__item_edit');
};

const deleteTask = function() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

const taskCompleted = function() {
    const listItem = this.parentNode;
    const listLabel = listItem.querySelector('.list__label')
    listLabel.classList.add('list__label_completed');
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
    const listItem = this.parentNode;
    const listLabel = listItem.querySelector('.list__label')
    listLabel.classList.remove('list__label_completed');
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function() {

}

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector('input[type=checkbox]');
    const editButton = taskListItem.querySelector('button.edit');
    const deleteButton = taskListItem.querySelector('button.delete');

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
