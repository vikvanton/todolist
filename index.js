let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

if (taskList.length !== 0) {
    let tasksList = document.querySelector("#task-list");
    for (let task of taskList) {
        let taskElem = createTaskElem(task.name);
        if (task.done) {
            taskElem.querySelector("span").classList.add("done");
            taskElem.querySelector("input").checked = true;
        }
        tasksList.append(taskElem);
    }
}

document.querySelector("#add-task-button").addEventListener("click", function () {
    let inpFld = document.querySelector("#input-task");
    if (inpFld.value !== '') {
        if (addTaskToList(inpFld.value) === 0) {
            let tasksList = document.querySelector("#task-list");
            tasksList.append(createTaskElem(inpFld.value));
            inpFld.value = '';
            updateLocalStorage();
        } else {
            alert("Задача с таким названием уже добавлена в список!");
        }
    } else {
        alert("Введите название задачи! ");
    }
});

function createTaskElem(taskName) {
    let taskElem = document.createElement("li");

    taskElem.innerHTML = `<table class="task-box">
                            <tbody>
                                <tr>
                                    <td>
                                        <input class="check-box" type="checkbox">
                                    </td>
                                    <td> 
                                        <span class="task">${taskName}</span>
                                    </td>
                                </tr>
                            </tbody>
                           </table> 
                           <div class="del-btn-box">
                               <button class="delete-btn">Удалить</button>
                           </div>`;

    taskElem.querySelector(".delete-btn").addEventListener("click", function () {
        let listElem = this.parentElement.parentElement;
        let taskBox = this.parentElement
                            .previousElementSibling.firstElementChild.firstElementChild
                            .firstElementChild.nextElementSibling.firstElementChild;
        delTaskFromList(taskBox.textContent);
        updateLocalStorage();
        listElem.remove();
    });

    taskElem.querySelector(".check-box").addEventListener("click", function () {
        let taskBox = this.parentElement.nextElementSibling.firstElementChild;
        taskBox.classList.toggle("done");
        changeTaskState(taskBox.textContent);
        updateLocalStorage();
    });

    return taskElem;
}

function addTaskToList(taskName) {
    let taskIndex = taskList.findIndex(task => task.name === taskName);
    if (taskIndex === -1) {
        taskList.push({
            name: taskName,
            done: false,
        });
        return 0;
    } else {
        return -1;
    }
}

function delTaskFromList(taskName) {
    let taskIndex = taskList.findIndex(task => task.name === taskName);
    taskList.splice(taskIndex, 1);
}

function changeTaskState(taskName) {
    let task = taskList.find(task => task.name === taskName);
    task.done = !task.done;
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

