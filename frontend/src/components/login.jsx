import { useForm } from 'react-hook-form';
import { login } from '../api';

function Login({ onLogin, goToRegister }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await login({
                username: data.username,
                password: data.password
            });
            // El token ya se guardó en cookie HttpOnly automáticamente
            // Solo guardamos el username para mostrarlo
            onLogin(response.data.username);
        } catch (err) {
            setError('root', { message: 'Usuario o contraseña incorrectos' });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>📝 ToDo App</h2>
                <h3>Iniciar Sesión</h3>

                {errors.root && (
                    <p className="error">{errors.root.message}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        {...register('username', {
                            required: 'El usuario es obligatorio'
                        })}
                    />
                    {errors.username && (
                        <p className="error">{errors.username.message}</p>
                    )}

                    <input
                        type="password"
                        placeholder="Contraseña"
                        {...register('password', {
                            required: 'La contraseña es obligatoria'
                        })}
                    />
                    {errors.password && (
                        <p className="error">{errors.password.message}</p>
                    )}

                    <button type="submit">Iniciar Sesión</button>
                </form>

                <p className="auth-switch">
                    ¿No tienes cuenta?{' '}
                    <span onClick={goToRegister}>Regístrate aquí</span>
                </p>
            </div>
        </div>
    );
}

export default Login;