const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);
addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText, false);
  saveTaskToLocalStorage(taskText, false);

  taskInput.value = '';
}

function createTaskElement(text, isCompleted) {
  const li = document.createElement('li');
  if (isCompleted) li.classList.add('completed');

  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">Padam</button>
  `;

  li.querySelector('span').addEventListener('click', () => {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    updateLocalStorage();
  });

  taskList.appendChild(li);
}

function saveTaskToLocalStorage(text, isCompleted) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ text, completed: isCompleted });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}