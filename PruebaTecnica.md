# Prueba Técnica: Aplicación ToDo con Django Rest Framework y React

## Instrucciones:

a. Crea una aplicación ToDo que permita a los usuarios gestionar su lista de tareas.

b. Desarrolla el backend utilizando Django Rest Framework y el frontend utilizando React.

c. Organiza tu código de manera clara y adhiérete a las mejores prácticas de desarrollo.

d. Proporciona comentarios explicativos donde sea necesario para aclarar tus decisiones y enfoques.

e. Al finalizar, comparte tu código a través de un repositorio Git en una plataforma como GitHub.

## Tareas a Completar

1. **Backend (Django Rest Framework):**

   a. Modela una entidad llamada `Task` con los siguientes campos:

   - `title` (CharField)
   - `description` (TextField)
   - `completed` (BooleanField)
   - `created_at` (DateTimeField, auto_now_add=True)
   - `updated_at` (DateTimeField, auto_now=True)

   b. Define vistas y rutas para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en las tareas.

   - Listar: GET /api/tasks/ que devuelve todas las tareas en formato JSON.
   - Crear: POST /api/tasks/ que permite crear una nueva tarea enviando los datos en formato JSON.
   - Actualizar: PUT /api/tasks/<task_id>/ que permite actualizar los datos de una tarea específica enviando los cambios en formato JSON.
   - Eliminar: DELETE /api/tasks/<task_id>/ que permite eliminar una tarea específica.

2. **Frontend (React):**

   a. Configura una aplicación de React utilizando `vite` para el frontend.

   b. Diseña el componente `TaskList` para mostrar la lista de tareas obtenida desde el backend. Utiliza componentes de React para presentar la información de manera atractiva y legible.

   - Utiliza el método fetch o una librería como axios para obtener la lista de tareas desde la API.
   - Muestra las tareas en una lista, indicando su título, descripción y estado de completado.

   c. Crea el formulario `TaskForm` que permita a los usuarios crear nuevas tareas. Realiza validaciones de datos antes de enviarlos al backend.

   - Crea un formulario que capture el título y la descripción de la nueva tarea.
     -Al enviar el formulario, utiliza el método POST para enviar los datos a la API y crear la tarea.

   d. Habilita la función de marcar tareas como completadas y actualizar su estado a través del frontend. Asegúrate de que los cambios se reflejen en tiempo real en la interfaz de usuario.

   - Proporciona una opción para marcar o desmarcar una tarea como completada.
   - Utiliza el método PUT para actualizar el estado de la tarea en la API.

   e. Proporciona la capacidad de eliminar tareas mediante el frontend:

   - Agrega la opción de eliminar una tarea.
   - Utiliza el método DELETE para eliminar la tarea en la API.

3. **Integración y Opcionales:**

   a. Conecta el frontend de React con el backend de Django Rest Framework para que las operaciones CRUD de tareas se realicen a través de la API.

   - Asegúrate de que las rutas de la API en el frontend coincidan con las rutas en el backend.
   - Utiliza las funciones de fetch o una librería como axios para realizar las solicitudes HTTP al backend.

   b. Implementa una interfaz de usuario intuitiva y atractiva utilizando estilos y componentes de React.

   - Utiliza CSS o una librería de estilos como styled-components para dar estilo a tu aplicación.
   - Organiza la interfaz de usuario de manera que sea fácil de entender y utilizar para los usuarios.

4. **Organización y Comentarios:**

   a. Organiza tu código de manera clara y siguiendo las mejores prácticas de desarrollo. Utiliza una estructura de archivos coherente para separar las diferentes partes de la aplicación.

   b. Proporciona comentarios en tu código para explicar tus decisiones de diseño, enfoques y cualquier punto que consideres relevante.



server:http://localhost:8000/api/tasks/
front:http://localhost:5173/