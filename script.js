function addTask() {
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (!title) {
    alert("Please enter a task title.");
    return;
  }

  const taskList = document.getElementById("task-list");

  const li = document.createElement("li");
  li.className = "task-item";

  const detailsDiv = document.createElement("div");
  detailsDiv.className = "task-details";
  detailsDiv.innerHTML = `<div class="task-title">${title}</div>
                          <div class="task-desc">${desc}</div>`;

  const actionDiv = document.createElement("div");
  actionDiv.className = "task-actions";

  // Complete icon (circle / check-circle)
  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.title = "Mark as complete";
  completeBtn.innerHTML = `<i class="fa-regular fa-circle"></i>`;

  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    if (li.classList.contains("completed")) {
      completeBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    } else {
      completeBtn.innerHTML = `<i class="fa-regular fa-circle"></i>`;
    }
  };

  // Edit icon (pen)
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.title = "Edit task";
  editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;

  editBtn.onclick = () => {
    const newTitle = prompt("Edit task title:", title);
    const newDesc = prompt("Edit description:", desc);
    if (newTitle !== null && newTitle.trim() !== "") {
      detailsDiv.querySelector(".task-title").textContent = newTitle.trim();
    }
    if (newDesc !== null) {
      detailsDiv.querySelector(".task-desc").textContent = newDesc.trim();
    }
  };

  // Delete icon (trash)
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.title = "Delete task";
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  deleteBtn.onclick = () => {
    taskList.removeChild(li);
  };

  actionDiv.appendChild(completeBtn);
  actionDiv.appendChild(editBtn);
  actionDiv.appendChild(deleteBtn);

  li.appendChild(detailsDiv);
  li.appendChild(actionDiv);
  taskList.appendChild(li);

  // Clear inputs
  titleInput.value = "";
  descInput.value = "";
}
