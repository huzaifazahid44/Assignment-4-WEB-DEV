document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
  
    taskForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const taskTitleInput = document.getElementById('taskTitle');
      const taskTitle = taskTitleInput.value;
  
      if (!taskTitle) {
        alert('Please enter a task title.');
        return;
      }
  
      addTask(taskTitle);
      taskForm.reset();
    });
  
    function addTask(title) {
      const taskId = Date.now();
      const task = { id: taskId, title, completed: false };
  
      fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .then(response => response.json())
        .then(data => {
          displayTask(data);
        })
        .catch(error => console.error('Error adding task:', error));
    }
  
    function displayTask(task) {
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <span>${task.title}</span>
        <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
      `;
      taskList.appendChild(taskItem);
    }
  
    function deleteTask(id) {
      fetch(`/tasks/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          document.getElementById('taskList').innerHTML = '';
          loadTasks();
        })
        .catch(error => console.error('Error deleting task:', error));
    }
  
    function loadTasks() {
      fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
          tasks.forEach(task => {
            displayTask(task);
          });
        })
        .catch(error => console.error('Error loading tasks:', error));
    }
  
    loadTasks();
  });
  