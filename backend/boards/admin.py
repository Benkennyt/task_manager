from django.contrib import admin
from .models import Task, Board, SubTask

# Register your models here.
admin.site.register(Task)
admin.site.register(Board)
admin.site.register(SubTask)

