import { useState } from 'react';
import { deleteTask, updateTask } from '../api';

function TaskList({ tasks, onTaskUpdated }) {
    // Guarda el id de la tarea que se está editando
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    // Abre el modo edición de una tarea
    const handleEdit = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    // Guarda los cambios de la tarea editada
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

    // Cancela la edición sin guardar
    const handleCancel = () => {
        setEditingId(null);
    };

    // Marca o desmarca como completada
    const handleToggleComplete = async (task) => {
        try {
            await updateTask(task.id, { ...task, completed: !task.completed });
            onTaskUpdated();
        } catch (err) {
            console.error('Error al actualizar la tarea');
        }
    };

    // Elimina una tarea
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
                    {/* Modo edición */}
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
                        /* Modo normal */
                        <>
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <div className="task-actions">
                                <button className="btn-complete" onClick={() => handleToggleComplete(task)}>
                                    {task.completed ? '↩ Desmarcar' : '✓ Completar'}
                                </button>
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

/*se muestra todas las tareas como una tarjeta, boton para desmarca/marca de completado, boton de eliminacion de tarea y si no hay alguna trea se mietra un mensaje*/