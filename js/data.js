const initialData = {
    cyclesCompleted: 0,
    worktime: { completed: 0, nocompleted: 0 },
    breaktime: { completed: 0, nocompleted: 0 },
    resttime: { completed: 0, nocompleted: 0 },
    tasks: { completed: 0, nocompleted: 0 },
    tasksList: []
};

const STORAGE_KEY = "pomodoroData";

// 📌 Cargar datos desde localStorage o inicializar si no existen
function loadData() {
    let data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        console.log("Primera vez que accedes, inicializando datos.");
        // Si no hay datos, se inicializa y se guarda
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    } else {
        console.log("Datos cargados de localStorage.");
        return JSON.parse(data);  // Retorna los datos guardados
    }
}

// 📌 Guardar datos en localStorage
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 📌 Actualizar las estadísticas (cualquier categoría)
function updateStats(category, type) {
    let data = loadData();
    if (data[category]) {
        data[category][type]++;
    }
    saveData(data);
}

// 📌 Agregar una tarea
function addTask(taskText) {
    let data = loadData();
    const newTask = { id: Date.now(), text: taskText, completed: false };
    data.tasksList.push(newTask);
    saveData(data);
}

// 📌 Marcar tarea como completada
function completeTask(id) {
    let data = loadData();
    let task = data.tasksList.find(t => t.id === id);
    if (task) {
        task.completed = true;
        data.tasks.completed++;
        data.tasks.nocompleted--;
        saveData(data);
    }
}

// 📌 Eliminar tarea
function deleteTask(id) {
    let data = loadData();
    data.tasksList = data.tasksList.filter(t => t.id !== id);
    saveData(data);
}

/**************************** EXPORTS ******************************/
export { loadData, saveData, updateStats, addTask, completeTask, deleteTask };
