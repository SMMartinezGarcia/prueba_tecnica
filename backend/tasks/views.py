from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    Esta clase maneja automáticamente todos los endpoints:
    GET    /api/tasks/       → lista todas las tareas
    POST   /api/tasks/       → crea una tarea nueva
    PUT    /api/tasks/<id>/  → actualiza una tarea
    DELETE /api/tasks/<id>/  → elimina una tarea
    """
    # Trae todas las tareas, las más recientes primero
    queryset = Task.objects.all().order_by('-created_at')
    
    # Usa el serializer que creamos antes
    serializer_class = TaskSerializer

#