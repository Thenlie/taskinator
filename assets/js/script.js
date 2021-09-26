var formEl = document.querySelector("#task-form"); //assign variable to form element
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

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
    listItemEl.setAttribute("data-task-id", taskIdCounter); //add task ID to custom attribute
    
    var taskInfoEl = document.createElement("div"); //create div to hold task info within li
    taskInfoEl.className = "task-info";
    
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"

    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl =  createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter++; //increment task counter for next unique ID
}

var createTaskActions = function(taskId) {
    var actionContainerEl= document.createElement("div");
    actionContainerEl.className = "task-actions";
    
    var editButtonEl = document.createElement("button"); //create edit button
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl); 

    var deleteButtonEl = document.createElement("button"); //create delete button
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select"); //create select drop down
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl= document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

var taskButtonHandler = function(event) {
    var targetEl = event.target;

    if(targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
    else if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
}


var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

formEl.addEventListener("submit", taskFormHandler); //listen for form, submission
pageContentEl.addEventListener("click", taskButtonHandler);

