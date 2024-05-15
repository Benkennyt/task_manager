from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import BoardSerializer, TaskSerializer, SubTaskSerializer
from .models import Board, Task, SubTask

class BoardListCreate(generics.ListCreateAPIView):
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Board.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class BoardDelete(generics.DestroyAPIView):
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Board.objects.filter(author=user)

class BoardUpdate(generics.UpdateAPIView):
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Board.objects.filter(author=user)


# Task................

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        board_id = self.kwargs['board_id']
        return Task.objects.filter(board=board_id)

    def perform_create(self, serializer):
        if serializer.is_valid():
            board_instance = Board.objects.get(id=self.kwargs['board_id'])
            serializer.save(board=board_instance)
        else:
            print(serializer.errors)


class TaskList(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs['pk']
        return Task.objects.filter(id=task_id)

    


class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        board_id = self.kwargs['board_id']
        return Task.objects.filter(board=board_id)

class TaskUpdate(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        board_id = self.kwargs['board_id']
        return Task.objects.filter(board=board_id)
    

# subtask................

class SubTaskListCreate(generics.ListCreateAPIView):
    serializer_class = SubTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs['task_id']
        return SubTask.objects.filter(task=task_id)

    def perform_create(self, serializer):
        if serializer.is_valid():
            task_instance = Task.objects.get(id=self.kwargs['task_id'])
            serializer.save(task=task_instance)
        else:
            print(serializer.errors)


class SubTaskDelete(generics.DestroyAPIView):
    serializer_class = SubTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs['task_id']
        return SubTask.objects.filter(task=task_id)

class SubTaskUpdate(generics.UpdateAPIView):
    serializer_class = SubTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs['task_id']
        return SubTask.objects.filter(task=task_id)