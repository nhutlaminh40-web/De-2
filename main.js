
const MY_MSSV = "231A010214";
const STORAGE_KEY = `tasks_${MY_MSSV}`;


const displayMssvEl = document.getElementById('display-mssv');
if(displayMssvEl) {
    displayMssvEl.textContent = MY_MSSV;
}


document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});


function addTask() {
    const nameInput = document.getElementById('taskName');
    const priorityInput = document.getElementById('taskPriority');
    
    const taskName = nameInput.value.trim();
    const priority = priorityInput.value;

    if (!taskName) {
        alert("Vui lòng nhập tên công việc!");
        return;
    }

    
    let textColor = "black";
    
    
    if (taskName.length > 10) {
        
        const lastDigit = parseInt(MY_MSSV.slice(-1));
        
        
        if (lastDigit % 2 === 0) {
            textColor = "red";
        } else {
            textColor = "blue";
        }
    }

    
    const newTask = {
        id: Date.now(),
        name: taskName,
        priority: priority,
        color: textColor
    };

    
    saveTaskToStorage(newTask);

    
    renderSingleTask(newTask);

    
    nameInput.value = "";
    nameInput.focus();
}


function saveTaskToStorage(task) {
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    tasks.push(task);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}


function loadTasks() {
    
    document.getElementById('list-1').innerHTML = '';
    document.getElementById('list-2').innerHTML = '';
    document.getElementById('list-3').innerHTML = '';
    document.getElementById('list-4').innerHTML = '';

    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    tasks.forEach(task => {
        renderSingleTask(task);
    });
}


function renderSingleTask(task) {
    
    const li = document.createElement('li');
    li.textContent = task.name;
    li.style.color = task.color;
    
    
    const listId = `list-${task.priority}`;
    const targetList = document.getElementById(listId);
    
    if (targetList) {
        targetList.appendChild(li);
    }
}
