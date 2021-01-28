//! (1) Task Class:
class Task {
    private _message: string;
    private _isActive: boolean;
    private _id: number;

    constructor(message: string) {
        this._message = message;
        this._isActive = true;
        this._id = 0;
    }

    get message() {
        return this._message;
    }
    get isActive() {
        return this._isActive;
    }
    get id() {
        return this._id;
    }
    set isActive(status: boolean) {
        this._isActive = status;
    }
   set id(theId:number) {
        this._id = theId;
    }
}

let currTaskNum = 0;

//! (2) Impl. + button:
let addButton = document.getElementById("todo-save");
addButton.setAttribute("onclick", "addTask()");

function addTask() {
    let taskMes = (<HTMLInputElement>document.getElementById("todo-item")).value;
    if (taskMes == "")   //* Don't add empty tasks.
        return;
    let taskList = document.getElementById("todo-list");
    createOneTask (taskMes, taskList);
    //! (3) Save the task in local storage:
    let myTask = new Task(taskMes);
    myTask.id = currTaskNum++;
    localStorage.setItem(taskMes, JSON.stringify(myTask));

    (<HTMLInputElement>document.getElementById("todo-item")).value = "";
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
    currTaskNum = 0;
}

//! (5) Sign complete task:
function signActive(key) {
    let currTask = document.getElementById(key.id);

    //* Mark task as complated:
    currTask.className += " done"

    //* Switch selected task to not active in memory:
    localStorage.removeItem(key.id);
    let newTask = new Task(key.id);
    newTask.isActive = false;
    localStorage.setItem(key.id, JSON.stringify(newTask));
}

//! (6) Delete completed:
let delOKButton = document.getElementById("todo-delcom");
delOKButton.setAttribute("onclick", "delOKTasks()");

function delOKTasks() {
    for (let index = 0; index < localStorage.length; index++) {
        let currNote = JSON.parse(localStorage.getItem(localStorage.key(index)));
        if (currNote._isActive == false) {
            let currTask = document.getElementById(currNote._message);
            localStorage.removeItem(localStorage.key(index));
            currTask.nextSibling.remove();
            currTask.remove();
        }
    }
}

//? Reinsert the task when page refreshed:
window.onload = () => {
    let taskList = document.getElementById("todo-list");
    for (let index = localStorage.length - 1; index >= 0; index--) {
        let currNote = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let taskMes = currNote._message;
        createOneTask(taskMes, taskList);
        if (currNote._isActive == false) {
            document.getElementById(taskMes).className += " done";
        }       
    }
}

//? Function to create a task and add it in both local storage and window: 
function createOneTask (taskMes, taskList) {
    let newTask = document.createElement("div");
    newTask.setAttribute("id", `${taskMes}`);
    newTask.className += "todo-item";
    newTask.style.width = "85%"
    newTask.style.float = "left";
    newTask.innerHTML += taskMes;

    //* Create Ok button:
    let okButton = document.createElement("BUTTON");
    okButton.setAttribute("onclick", `signActive(${taskMes})`);
    okButton.className += "todo-ok";
    okButton.innerText += "V";
    okButton.style.padding = "10px";

    taskList.append(newTask);
    taskList.append(okButton);
}
