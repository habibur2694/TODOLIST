function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();

  if (!title) {
    alert("Task title is required!");
    return;
  }

  const li = document.createElement("li");
  li.className = "task";

  const titleEl = document.createElement("h3");
  titleEl.textContent = title;

  const descEl = document.createElement("p");
  descEl.textContent = desc;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = "Complete";
  completeBtn.onclick = () => li.classList.toggle("completed");

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editTask(li, titleEl, descEl);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => li.remove();

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(titleEl);
  li.appendChild(descEl);
  li.appendChild(actions);

  document.getElementById("taskList").appendChild(li);

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
}

function editTask(taskEl, titleEl, descEl) {
  const currentTitle = titleEl.textContent;
  const currentDesc = descEl.textContent;

  const titleInput = document.createElement("input");
  titleInput.value = currentTitle;

  const descInput = document.createElement("textarea");
  descInput.value = currentDesc;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.className = "complete-btn";
  saveBtn.onclick = () => {
    titleEl.textContent = titleInput.value;
    descEl.textContent = descInput.value;
    taskEl.replaceChild(titleEl, titleInput);
    taskEl.replaceChild(descEl, descInput);
    taskEl.querySelector(".task-actions").replaceChild(editBtn, saveBtn);
  };

  const editBtn = taskEl.querySelector(".edit-btn");
  taskEl.replaceChild(titleInput, titleEl);
  taskEl.replaceChild(descInput, descEl);
  taskEl.querySelector(".task-actions").replaceChild(saveBtn, editBtn);
}
