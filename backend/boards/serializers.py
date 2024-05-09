from rest_framework import serializers
from .models import Board, Task, SubTask

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["id", "name", "todo_column", 'overdue_column', 'inprogress_column', 'completed_column', "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Task
        fields = [
            "id","name", "description", "created_at", "status", "board"
        ]
        extra_kwargs = {"board": {"read_only": True}}

class SubTaskSerializer(serializers.ModelSerializer):
    class Meta: 
        model = SubTask
        fields = [
            'id', 'name', 'create_at', 'status', 'task'
        ]
        extra_kwargs = {'task': {"read_only": True}}