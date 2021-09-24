var formEl = document.querySelector("#task-form"); //assign variable to form element
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    event.preventDefault(); //removes default browser behavior

    var listItemEl = document.createElement("li"); //create new li within ul
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler); //listen for form, submission

