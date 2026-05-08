import axios from 'axios';

// URL base del backend
const API_URL = 'http://localhost:8000/api/tasks/';

// Obtener todas las tareas
export const getTasks = () => {
    return axios.get(API_URL);
};

// Crear una tarea nueva
export const createTask = (task) => {
    return axios.post(API_URL, task);
};

// Actualizar una tarea existente
export const updateTask = (id, task) => {
    return axios.put(`${API_URL}${id}/`, task);
};

// Eliminar una tarea
export const deleteTask = (id) => {
    return axios.delete(`${API_URL}${id}/`);
};

/*aqui sentralizamoss las urls el back de cada componete,poe si en algun moneto se cambia la url*/