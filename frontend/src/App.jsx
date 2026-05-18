import { useState, useEffect } from 'react';
import { getTasks, logout, getMe } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState('login');
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const [taskRes, meRes] = await Promise.all([
                getTasks(),
                getMe()
            ]);
            setTasks(taskRes.data);
            setUsername(meRes.data.username);
            setPage('app');
        } catch (err) {
            if (err.response?.status === 401) {
                setPage('login');
            }
        }
    };

    const handleLogin = (user) => {
        setUsername(user);
        setPage('app');
        fetchTasks();
    };

    const handleRegister = () => setPage('login');

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Error al cerrar sesión');
        }
        setUsername('');
        setPage('login');
    };

    if (page === 'login') {
        return (
            <Login
                onLogin={handleLogin}
                goToRegister={() => setPage('register')}
            />
        );
    }

    if (page === 'register') {
        return (
            <Register
                onRegister={handleRegister}
                goToLogin={() => setPage('login')}
            />
        );
    }

    return (
        <div className="app">
            <div className="app-header">
                <h1>📝 Mi Lista de Tareas</h1>
                <div className="header-right">
                    <span className="welcome">
                        👋 Hola, <strong>{username}</strong>
                    </span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
            <TaskForm onTaskCreated={fetchTasks} />
            <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
        </div>
    );
}

export default App;