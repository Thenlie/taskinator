var formEl = document.querySelector("#task-form"); //assign variable to form element
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault(); //removes default browser behavior

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) { //check that form has content
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var taskDataObj = { //package data as object
        name: taskNameInput,
        type: taskTypeInput
    }

    createTaskEl(taskDataObj); //send data to argument
};

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li"); //create new li within ul
    listItemEl.className = "task-item";
    
    var taskInfoEl = document.createElement("div"); //create div to hold task info within li
    taskInfoEl.className = "task-info";
    
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"

    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler); //listen for form, submission

