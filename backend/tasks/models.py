from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    # Cada tarea pertenece a un usuario
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Título de la tarea, máximo 200 caracteres
    title = models.CharField(max_length=200)
    
    # Descripción larga, también puede quedar vacía
    description = models.TextField(blank=True)
    
    # Si está completada o no, por defecto False
    completed = models.BooleanField(default=False)
    
    # Se guarda automáticamente cuando se CREA la tarea
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Se actualiza automáticamente cuando se EDITA
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title