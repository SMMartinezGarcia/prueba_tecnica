import { useForm } from 'react-hook-form';
import { register as registerUser } from '../api';

function Register({ onRegister, goToLogin }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await registerUser({
                username: data.username,
                email: data.email,
                password: data.password
            });
            // Después de registrarse va al login
            onRegister();
        } catch (err) {
            setError('root', { message: 'Error al registrarse, intenta con otro usuario' });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>📝 ToDo App</h2>
                <h3>Crear Cuenta</h3>

                {errors.root && (
                    <p className="error">{errors.root.message}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        {...register('username', {
                            required: 'El usuario es obligatorio',
                            minLength: {
                                value: 3,
                                message: 'El usuario debe tener al menos 3 caracteres'
                            }
                        })}
                    />
                    {errors.username && (
                        <p className="error">{errors.username.message}</p>
                    )}

                    <input
                        type="email"
                        placeholder="Email (opcional)"
                        {...register('email')}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        {...register('password', {
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <p className="error">{errors.password.message}</p>
                    )}

                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        {...register('confirmPassword', {
                            required: 'Confirma tu contraseña',
                            validate: (value) =>
                                value === watch('password') || 'Las contraseñas no coinciden'
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword.message}</p>
                    )}

                    <button type="submit">Crear Cuenta</button>
                </form>

                <p className="auth-switch">
                    ¿Ya tienes cuenta?{' '}
                    <span onClick={goToLogin}>Inicia sesión aquí</span>
                </p>
            </div>
        </div>
    );
}

export default Register;