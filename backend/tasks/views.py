
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.none()

    def get_queryset(self):
        # para que cada usuario solo ve sus propias tareas
        return Task.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Al crear una tarea se asigna automáticamente al usuario logueado
        serializer.save(user=self.request.user)