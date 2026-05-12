import { useForm } from 'react-hook-form';
import { createTask } from '../api';

function TaskForm({ onTaskCreated }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Envía la tarea al backend con los datos del formulario
            await createTask({ ...data, completed: false });
            
            // Limpia el formulario después de crear
            reset();
            
            // Avisa al componente padre que se creó una tarea
            onTaskCreated();
        } catch (err) {
            console.error('Error al crear la tarea');
        }
    };

    return (
        <div className="task-form">
            <h2>Nueva Tarea</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Título de la tarea"
                    {...register('title', {
                        required: 'El título es obligatorio',
                        maxLength: {
                            value: 200,
                            message: 'El título no puede tener más de 200 caracteres'
                        }
                    })}
                />
                {/* Muestra error del título si hay */}
                {errors.title && (
                    <p className="error">{errors.title.message}</p>
                )}

                <textarea
                    placeholder="Descripción (opcional)"
                    {...register('description')}
                />

                <button type="submit">Agregar Tarea</button>
            </form>
        </div>
    );
}

export default TaskForm;