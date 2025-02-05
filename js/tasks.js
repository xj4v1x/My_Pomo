document.addEventListener("DOMContentLoaded", () => {
	const tasksList = document.querySelector("#tasks_list");
	const addTaskInput = document.getElementById("addtask_input");
	const addtask_button = document.getElementById("addtask_button");

	let draggingItem = null;

	addtask_button.addEventListener("click", function(event) {
	saveTask();
});

addTaskInput.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		addTaskInput.blur();
		event.preventDefault();
		saveTask();
	}
}); 

const saveTask = () => {
	const newTaskText = addTaskInput.value.trim();
	if (newTaskText) {
		const newTask = document.createElement("li");
		newTask.setAttribute("draggable", "true");
		newTask.classList.add("taskinlist");
		const taskContent = document.createElement("span");
		taskContent.textContent = newTaskText;

		const taskeditbuttons = createButton('<span class="material-symbols-outlined">menu</span>', "taskEdit_btn");
		const editButton = createButton('<span class="material-symbols-outlined">edit</span>', "editTask_btn");
		const deleteButton = createButton('<span class="material-symbols-outlined">delete</span>', "deleteTask_btn");
		const completeButton = createButton('<span class="material-symbols-outlined">check</span>', "completeTask_btn");
		const taskButtons = document.createElement("div");
		taskButtons.append(editButton, deleteButton, completeButton);
		taskeditbuttons.style.zIndex="3";
		taskButtons.classList.add("taskseditcontainer");
		
		newTask.append(taskContent, taskeditbuttons, taskButtons);
		tasksList.insertBefore(newTask, tasksList.children[1]);			
	

		addTaskInput.value = "";

		taskeditbuttons.addEventListener("click", (event) => opentasksedit(event.currentTarget));
		editButton.addEventListener("click", () => editTask(newTask));
		deleteButton.addEventListener("click", () => deleteTask(newTask));
		completeButton.addEventListener("click", () => completeTask(newTask));
		const event = new Event('taskAddedOrNot');
		document.dispatchEvent(event);
	}
	loadActualTask();
};

const opentasksedit = (taskEditButton) => {
    const taskButtons = taskEditButton.closest("li")?.querySelector(".taskseditcontainer");
    if (!taskButtons) return;
	
    const isVisible = taskButtons.classList.contains("visible");

    hideAllTaskEditContainers();

    if (!isVisible) {
        taskEditButton.style.zIndex = 20;
        taskButtons.style.zIndex = 15;
        taskButtons.classList.add("visible");
    }
};


const editTask = (task) => {
	hideAllTaskEditContainers();
    const taskContent = task.querySelector("span");
    const input = document.createElement("input");

    input.type = "text";
    input.value = taskContent.textContent;
    input.classList.add("task-edit-input");

    task.replaceChild(input, taskContent);

    input.focus();
    input.select();

    input.addEventListener("blur", () => finishEditingTask(task, input));
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            finishEditingTask(task, input);
        }
    });	
};

const finishEditingTask = (task, input) => {
    const newText = input.value.trim() || "Tarea vacía";
    const taskContent = document.createElement("span");
    taskContent.textContent = newText;
    task.replaceChild(taskContent, input);
};

const deleteTask = (task) => {
	tasksList.removeChild(task);
	const event = new Event('taskAddedOrNot');
	document.dispatchEvent(event);
	loadActualTask();
};

const completeTask = (task) => {
	task.classList.toggle("complete");
	const taskButtons = task.querySelector(".taskseditcontainer");
	taskButtons.classList.toggle("visible");
};
const createButton = (html, className) => {
    const button = document.createElement("button");
    button.innerHTML = html;
    button.classList.add(className);
    return button;
};

tasksList.addEventListener("dragstart", (e) => {
    if (e.target.getAttribute("draggable") === "false") {
		e.preventDefault();
		return;
    }
    draggingItem = e.target;
    e.target.classList.add("dragging");
    e.target.style.zIndex = 9999;
});

tasksList.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    e.target.style.zIndex = "";	
    draggingItem = null;
	loadActualTask();
});

tasksList.addEventListener("dragover", (e) => {
    e.preventDefault();	
    const afterElement = getDragAfterElement(tasksList, e.clientY);
    if (draggingItem && afterElement) {
		tasksList.insertBefore(draggingItem, afterElement);
    } else if (draggingItem) {
		tasksList.appendChild(draggingItem);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [
		...container.querySelectorAll('li[draggable="true"]:not(.dragging)'),
    ];
    return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
    ).element;
	}
});

const actual_task = document.getElementById("actual_task");
const tasks = document.getElementById("tasks");
const tasksinList = document.getElementsByClassName("taskinlist");

function loadActualTask() {
	actual_task.textContent = tasksinList.length > 0 ? tasksinList[0].textContent.split("menu")[0] : "None";
}

const hideAllTaskEditContainers = () => {
	document.querySelectorAll(".taskEdit_btn").forEach(btn => btn.style.zIndex = "");
	document.querySelectorAll(".taskseditcontainer").forEach(container => container.style.zIndex = "");

    document.querySelectorAll(".taskseditcontainer.visible").forEach(container => {
        container.classList.remove("visible");
    });
};


/**************************** EXPORTS ******************************/
export {loadActualTask};