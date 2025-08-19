document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const clearCompletedButton = document.getElementById('clearCompletedButton');
    const emptyListButton = document.getElementById('emptyListButton');
    const saveListButton = document.getElementById('saveListButton');

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Add a new task
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
            taskInput.value = '';
        }
    });

    // Mark a task as completed on double-click
    taskList.addEventListener('dblclick', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
        }
    });

    // Clear completed tasks
    clearCompletedButton.addEventListener('click', () => {
        const completedTasks = document.querySelectorAll('#taskList .completed');
        completedTasks.forEach(task => {
            taskList.removeChild(task);
        });
    });

    // Empty the entire list
    emptyListButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to empty the entire list?')) {
            taskList.innerHTML = '';
        }
    });

    // Save the list to localStorage and reload
    saveListButton.addEventListener('click', () => {
        saveTasks();
        location.reload();
    });

    function addTask(taskText) {
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText.trim();
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => {
            tasks.push({
                text: li.textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;
                if (task.completed) {
                    li.classList.add('completed');
                }
                taskList.appendChild(li);
            });
        }
    }
});