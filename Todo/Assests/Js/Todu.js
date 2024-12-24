let targetSectionId = ""; // To track which section the task is added to
let editingTaskId = null; // To track if a task is being edited

// Function to open the modal
function openAddTaskModal(sectionId) {
    targetSectionId = sectionId; // Set the target section
    editingTaskId = null; // Reset editing task ID
    document.getElementById("addTaskModal").classList.remove("hidden");
}

// Function to close the modal
function closeAddTaskModal() {
    document.getElementById("addTaskModal").classList.add("hidden");
    document.getElementById("taskTitleInput").value = ""; // Clear title input
    document.getElementById("taskDescriptionInput").value = ""; // Clear description input
    editingTaskId = null; // Reset editing task ID
}

// Function to add or update a task from the modal
function addTaskFromModal() {
    const taskTitle = document.getElementById("taskTitleInput").value.trim();
    const taskDescription = document.getElementById("taskDescriptionInput").value.trim();

    if (taskTitle && taskDescription) {
        if (editingTaskId) {
            // Update the existing task
            const taskItem = document.getElementById(editingTaskId);
            taskItem.querySelector(".task-title").textContent = taskTitle;
            taskItem.querySelector(".task-desc").textContent = taskDescription;
        } else {
            // Create a new task
            const taskItem = createTaskElement(taskTitle, taskDescription);
            document.getElementById(targetSectionId).appendChild(taskItem);
        }
    } else {
        alert("Both Title and Description are required!"); // Validate input
    }

    closeAddTaskModal(); // Close the modal after adding/updating
}

// Function to create a task element
function createTaskElement(taskTitle, taskDescription) {
    const taskId = "task-" + Date.now(); // Generate a unique ID for the task
    const taskItem = document.createElement("div");
    taskItem.id = taskId;
    taskItem.className =
        "bg-gray-100 p-4 rounded-md mb-2 cursor-pointer hover:bg-gray-200 shadow-md";
    taskItem.draggable = true; // Enable dragging

    // Task content
    taskItem.innerHTML = `
        <h4 class="font-bold text-lg task-title">${taskTitle}</h4>
        <p class="text-gray-600 task-desc">${taskDescription}</p>
        <div class="flex justify-end gap-2 mt-2">
            <button
                class="text-green-400"
                onclick="editTask('${taskId}')"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button
                class=" text-red-400"
                onclick="deleteTask('${taskId}')"
            >
               <i class="fa-regular fa-trash-can "></i>
            </button>
        </div>
    `;

    // Add drag-and-drop event listeners
    taskItem.addEventListener("dragstart", dragTask);
    taskItem.addEventListener("dragend", dragEnd);

    return taskItem;
}

// Function to edit a task
function editTask(taskId) {
    const taskItem = document.getElementById(taskId);
    const taskTitle = taskItem.querySelector(".task-title").textContent;
    const taskDescription = taskItem.querySelector(".task-desc").textContent;

    // Open modal with existing values
    document.getElementById("taskTitleInput").value = taskTitle;
    document.getElementById("taskDescriptionInput").value = taskDescription;
    editingTaskId = taskId; // Set editing task ID
    targetSectionId = taskItem.parentNode.id; // Set the target section
    document.getElementById("addTaskModal").classList.remove("hidden");
}

// Function to delete a task
function deleteTask(taskId) {
    const taskItem = document.getElementById(taskId);
    if (taskItem) {
        taskItem.remove(); // Remove the task from the DOM
    }
}

// Allow dropping tasks
function allowDrop(event) {
    event.preventDefault();
}

// Handle drag start
function dragTask(event) {
    event.dataTransfer.setData("text/plain", event.target.id); // Save the dragged task's ID
    setTimeout(() => {
        event.target.classList.add("hidden"); // Hide the task while dragging
    }, 0);
}

// Handle drag end
function dragEnd(event) {
    event.target.classList.remove("hidden");
}

// Handle drop
function dropTask(event, sectionId) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const taskItem = document.getElementById(taskId);
    const section = document.getElementById(sectionId);

    if (taskItem) {
        section.appendChild(taskItem); // Move the task to the dropped section
    }
}
