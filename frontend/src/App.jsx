import { useState, useEffect } from 'react';
import { getTasks } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
    // Estado que guarda todas las tareas
    const [tasks, setTasks] = useState([]);

    // Función que obtiene las tareas del backend
    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (err) {
            console.error('Error al obtener las tareas');
        }
    };

    // Se ejecuta automáticamente cuando carga la página
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="app">
            <h1>ToDo List</h1>

            {/* Formulario para crear tareas */}
            <TaskForm onTaskCreated={fetchTasks} />

            {/* Lista de tareas */}
            <TaskList
                tasks={tasks}
                onTaskUpdated={fetchTasks}
            />
        </div>
    );
}

export default App;

/* se carga las tareas, cuando se crea o se actuliza alguna tareea se rcarga auto, tambien pasa los datos que estan en TaskList y TaskForm  */
