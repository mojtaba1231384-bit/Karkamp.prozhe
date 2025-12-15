var todos = JSON.parse(localStorage.getItem("todo_list")) ?? [];

var taskBox = document.querySelector('.task-box');
var taskInput = document.getElementById('taskInput');

var isEdit = false;
var editId = 0;
function showTask(filter = 'all') {
    // handle style of active filter
    document.querySelector('span.active')?.classList?.remove('active')
    document.querySelector(`span#${filter}`)?.classList?.add('active')


    var liTags = "";
    if (todos.length > 0) {
        document.querySelector('.clear-btn')?.classList?.add('active')
        todos?.forEach(function (item, i) {
            var completedTask = item.status === "completed" ? "checked" : "";

            if (item.status === filter || filter === 'all') {


                liTags += `
        <li class="task">
        <label for='task-${i}'>
        <input type="checkbox"  id='task-${i}' onclick="updateStatus(this, ${i})"
        ${completedTask} />
        <p class='${completedTask}'>
        ${item.title}
        </p>
        </label>
                <div class="settings">  
                <i class="uil uil-ellipsis-h" onclick="showMenu(this)">
                </i>
                <ul class="task-menu">
                <li onclick="editTask(${i})">
                edit
                </li>
                <li onclick="deleteTask(${i})">
                delete
                </li>
                </ul>
                </div>
        </li>
        `;
            }

        });

    }
    taskBox.innerHTML = liTags || `<p>You don't have any task here</p>`
}

showTask("all");

function showMenu(selectedTask) {
    var menuElement = selectedTask.nextElementSibling;
    menuElement.classList.add('show');

    function handler(e) {
        if (e.target !== selectedTask) {
            menuElement.classList.remove('show');
            document.removeEventListener('click', handler)
        }


    }

    document.addEventListener('click', handler)
}

function deleteTask(id) {
    todos?.splice(id, 1)
    localStorage.setItem('todo_list', JSON.stringify(todos))
    showTask()
}

function editTask(id) {
    var selectedTaskForEdit = todos.find(function (item, i) {
        return i === id
    })
    taskInput.value = selectedTaskForEdit.title;
    taskInput.focus()
    isEdit = true;
    editId = id;
}

function updateStatus(selectedTask, i) {
    var taskTitle = selectedTask.nextElementSibling;
    if (selectedTask.checked) {
        taskTitle.classList.add('checked');
        todos[i].status = 'completed';
    } else {
        taskTitle.classList.remove('checked');
        todos[i].status = 'pending';
    }
    localStorage.setItem('todo_list', JSON.stringify(todos))
}

function createTask(event) {
    var userTask = event.target.value.trim();
    if (event.key === "Enter" && userTask) {
        if (!isEdit) {

            var taskInfo = {
                title: userTask,
                status: "pending",
            };
            todos.push(taskInfo);
        } else {
            todos[editId].title = userTask;
            isEdit = false;
            editId = 0;
        }
        event.target.value = "";
        localStorage.setItem("todo_list", JSON.stringify(todos));
        showTask("all");
    }
}



function clearAll(e) {
    todos = [];
    localStorage.setItem('todo_list', JSON.stringify([]))
    taskBox.innerHTML = `<p>You don't have any task here</p>`
    e.target?.classList?.remove('active')
}



