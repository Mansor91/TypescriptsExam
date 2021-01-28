//! (1) Task Class:
class Task {
    constructor(message) {
        this._message = message;
        this._isActive = true;
    }
    get message() {
        return this._message;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(status) {
        this._isActive = status;
    }
}
//! (2) Impl. + button:
let addButton = document.getElementById("todo-save");
addButton.setAttribute("onclick", "addTask()");
function addTask() {
    let taskMes = document.getElementById("todo-item").value;
    let taskList = document.getElementById("todo-list");
    let newTask = document.createElement("div");
    newTask.setAttribute("id", `${taskMes}`);
    newTask.className += "todo-item";
    newTask.style.width = "85%";
    newTask.style.float = "left";
    newTask.innerHTML += taskMes;
    //* Create Ok button:
    let okButton = document.createElement("BUTTON");
    okButton.className += "todo-ok";
    addButton.setAttribute("onclick", "signActive()");
    okButton.innerText += "V";
    taskList.append(newTask);
    taskList.append(okButton);
    //! (3) Save the task in local storage:
    let myTask = new Task(taskMes);
    localStorage.setItem(taskMes, JSON.stringify(myTask));
}
//! (4) Delete all:
let delAllButton = document.getElementById("todo-delall");
delAllButton.setAttribute("onclick", "delAllTask()");
function delAllTask() {
    let taskList = document.getElementById("todo-list");
    let taskMes = document.getElementById("todo-item");
    taskList.innerText = "";
    taskMes.innerText = "";
    localStorage.clear();
}

