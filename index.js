let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

if (taskList.length !== 0) {
    for (let task of taskList) {
        let taskElem = createTaskItem(task.name);
        if (task.done) {
            taskElem.querySelector("span").classList.add("done");
            taskElem.querySelector("input").checked = true;
        }
    }
}

document.querySelector("#add-task-button").addEventListener("click", function () {
    let inpFld = document.querySelector("#input-task");

    if (inpFld.value !== '') {
        let taskIndex = taskList.findIndex(task => task.name === inpFld.value);
        if (taskIndex === -1) {
            taskList.push({
                name: inpFld.value,
                done: false,
            });
            createTaskItem(inpFld.value);
            inpFld.value = '';
            updateLocalStorage();
        } else {
            alert("Такая задача уже добавлена в список!");
        }
    }
});

function createTaskItem(taskName) {
    let tasksList = document.querySelector("#task-list");
    let taskElem = document.createElement("li");

    taskElem.innerHTML = `<div class="task-box">
                                <input class="check-box" type="checkbox">
                                <span class="task">${taskName}</span>
                            </div>
                            <div class="del-btn-box">
                                <button class="delete-btn">Удалить</button>
                            </div>`;

    taskElem.querySelector(".delete-btn").addEventListener("click", function () {
        let listElem = this.parentElement.parentElement;
        let taskBox = this.parentElement.previousElementSibling.firstElementChild.nextElementSibling;
        let taskIndex = taskList.findIndex(task => task.name === taskBox.textContent);
        taskList.splice(taskIndex, 1);
        listElem.remove();
        updateLocalStorage();
    });

    taskElem.querySelector(".check-box").addEventListener("click", function () {
        let taskElem = this.nextElementSibling;
        taskElem.classList.toggle("done");
        let task = taskList.find(task => task.name === taskElem.textContent);
        task.done = !task.done;
        updateLocalStorage();
    });

    tasksList.append(taskElem);
    return taskElem;
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

