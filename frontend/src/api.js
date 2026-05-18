import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks/';
const AUTH_URL = 'http://localhost:8000/api/auth/';

// Permite mandar y recibir cookies
axios.defaults.withCredentials = true;

// Tareas
export const getTasks = () => axios.get(API_URL);
export const createTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}${id}/`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}${id}/`);

// Autenticación
export const login = (credentials) => axios.post(`${AUTH_URL}login/`, credentials);
export const register = (userData) => axios.post(`${AUTH_URL}register/`, userData);
export const logout = () => axios.post(`${AUTH_URL}logout/`);
export const getMe = () => axios.get(`${AUTH_URL}me/`);