from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'completed',
            'created_at',
            'updated_at'
        ]
        # user se asigna automáticamente, no lo manda el frontend
        read_only_fields = ['created_at', 'updated_at', 'user']
#aqui en este archivo el archivo comviete de un objeto de python a .json(es decri lo combiente a texto) lo cuan es basicamente un tradructor en tre la base de datos y react