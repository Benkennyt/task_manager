from rest_framework import serializers
from .models import Board

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["id", "name", "todo_column", 'overdue_column', 'inprogress_column', 'completed_column', "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}