import { useState } from 'react';
import { deleteTask, updateTask } from '../api';

function TaskList({ tasks, onTaskUpdated }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleEdit = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleSave = async (task) => {
        if (!editTitle.trim()) return;
        try {
            await updateTask(task.id, {
                ...task,
                title: editTitle,
                description: editDescription,
            });
            setEditingId(null);
            onTaskUpdated();
        } catch (err) {
            console.error('Error al editar la tarea');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    // Cambia el estado desde el select
    const handleStatusChange = async (task, value) => {
        try {
            await updateTask(task.id, {
                ...task,
                completed: value === 'completado'
            });
            onTaskUpdated();
        } catch (err) {
            console.error('Error al actualizar estado');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            onTaskUpdated();
        } catch (err) {
            console.error('Error al eliminar la tarea');
        }
    };

    if (tasks.length === 0) {
        return <p className="no-tasks">No hay tareas todavía. ¡Crea una! 😊</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`task-card ${task.completed ? 'completed' : ''}`}
                >
                    {editingId === task.id ? (
                        <div className="task-edit">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                            <div className="edit-actions">
                                <button className="btn-save" onClick={() => handleSave(task)}>
                                    💾 Guardar
                                </button>
                                <button className="btn-cancel" onClick={handleCancel}>
                                    ✕ Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <div className="task-actions">
                                {/* Lista desplegable de estado */}
                                <select
                                    className="select-status"
                                    value={task.completed ? 'completado' : 'pendiente'}
                                    onChange={(e) => handleStatusChange(task, e.target.value)}
                                >
                                    <option value="pendiente">⏳ Pendiente</option>
                                    <option value="completado">✅ Completado</option>
                                </select>
                                <button className="btn-edit" onClick={() => handleEdit(task)}>
                                    ✏️ Editar
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(task.id)}>
                                    🗑 Eliminar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TaskList;

/*se muestra todas las tareas como una tarjeta, boton para desmarca/marca de completado o pendiente, boton de eliminacion de tarea, boton de editar tareas y si no hay alguna trea se mietra un mensaje*/