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
        return self.title
    

class Task(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
