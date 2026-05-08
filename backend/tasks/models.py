from django.db import models

class Task(models.Model):
    # Título de la tarea, máximo 200 caracteres
    title = models.CharField(max_length=200)
    
    # Descripción larga, tambien puede queda vacia
    description = models.TextField(blank=True)
    
    # Si está completada o no, por defecto debe ir en false
    completed = models.BooleanField(default=False)
    
    # Se guarda automáticamente cuando se crea la tarea
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Se actualiza automáticamente cuando se edita
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # Lo que se da a monstrar Django en el panel admin
        return self.title