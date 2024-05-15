from django.db import models
from django.contrib.auth import get_user_model
import uuid

class Board(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=60)
    todo_column = models.BooleanField(default=False)
    overdue_column = models.BooleanField(default=False)
    inprogress_column = models.BooleanField(default=False)
    completed_column = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="boards")

    def __str__(self):
        return self.name
    

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(default='description')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=60)
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="tasks")
    

    def __str__(self):
        return self.name

class SubTask(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="subtasks")
    def __str__(self):
        return self.name
