// Load tasks from localStorage on page load
window.onload = function() {
  loadTasks();
};

function addTask() {
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (!title) {
    alert("Please enter a task title.");
    return;
  }

  // Save new task to localStorage
  const tasks = getTasksFromStorage();
  tasks.push({ title, desc, completed: false });
  saveTasksToStorage(tasks);

  // Refresh UI
  renderTasks(tasks);

  // Clear inputs
  titleInput.value = "";
  descInput.value = "";
}

function getTasksFromStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "task-details";
    detailsDiv.innerHTML = `<div class="task-title">${task.title}</div>
                            <div class="task-desc">${task.desc}</div>`;

    const actionDiv = document.createElement("div");
    actionDiv.className = "task-actions";

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.title = "Mark as complete";
    completeBtn.innerHTML = task.completed
      ? `<i class="fa-solid fa-circle-check"></i>`
      : `<i class="fa-regular fa-circle"></i>`;

    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasksToStorage(tasks);
      renderTasks(tasks);
    };

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.title = "Edit task";
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;

    editBtn.onclick = () => {
      const newTitle = prompt("Edit task title:", tasks[index].title);
      const newDesc = prompt("Edit description:", tasks[index].desc);
      if (newTitle !== null && newTitle.trim() !== "") {
        tasks[index].title = newTitle.trim();
      }
      if (newDesc !== null) {
        tasks[index].desc = newDesc.trim();
      }
      saveTasksToStorage(tasks);
      renderTasks(tasks);
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete task";
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasksToStorage(tasks);
      renderTasks(tasks);
    };

    actionDiv.appendChild(completeBtn);
    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    li.appendChild(detailsDiv);
    li.appendChild(actionDiv);

    taskList.appendChild(li);
  });
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  renderTasks(tasks);
}
