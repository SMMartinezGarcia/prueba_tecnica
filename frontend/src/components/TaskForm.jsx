import { useState } from 'react';
import { createTask } from '../api';

function TaskForm({ onTaskCreated }) {
    // Estado del formulario
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación: el título es obligatorio
        if (!title.trim()) {
            setError('El título es obligatorio');
            return;
        }

        try {
            // Envía la tarea al backend
            await createTask({ title, description, completed: false });
            
            // Limpia el formulario
            setTitle('');
            setDescription('');
            setError('');
            
            // Avisa al componente padre que se creó una tarea
            onTaskCreated();
        } catch (err) {
            setError('Error al crear la tarea, intenta de nuevo');
        }
    };

    return (
        <div className="task-form">
            <h2>Nueva Tarea</h2>

            {/* Muestra el error si hay alguno */}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Descripción (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Agregar Tarea</button>
            </form>
        </div>
    );
}

export default TaskForm;
/*aqui se tiene el formamulario(tuitulo y descripcion),la validacion del titulo que no se encuentre vacio para antes del envio, la limpieza del fomrmulario al envialo, si se genera algun error se muestra en la patalaa*/