from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    """
    Convierte objetos Task a JSON y viceversa.
    Ejemplo:
    Task(title="Comprar leche") → {"title": "Comprar leche", ...}
    """
    class Meta:
        model = Task
        # Campos que se incluyen en el JSON
        fields = [
            'id',
            'title', 
            'description', 
            'completed', 
            'created_at', 
            'updated_at'
        ]
        # Estos campos los genera Django solo, el usuario no los manda
        read_only_fields = ['created_at', 'updated_at']

#aqui en este archivo el archivo comviete de un objeto de python a .json(es decri lo combiente a texto) lo cuan es basicamente un tradructor en tre la base de datos y react