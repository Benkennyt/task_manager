from django.urls import path
from . import views

urlpatterns = [
    path("boards/", views.BoardListCreate.as_view(), name="board-list"),
    path("boards/delete/<str:pk>/", views.BoardDelete.as_view(), name="delete-board"),
    path("boards/edit/<str:pk>/", views.BoardUpdate.as_view(), name="edit-board"),
    path("tasks/<str:board_id>/", views.TaskListCreate.as_view(), name="task-list"),
    path("boards/<str:board_id>/tasks/delete/<str:pk>/", views.TaskDelete.as_view(), name="delete-task"),
    path("tasks/edit/<str:pk>/", views.TaskUpdate.as_view(), name="edit-task"),
    path("tasks/<str:task_id>/subtasks/", views.SubTaskListCreate.as_view(), name="subtask-list"),
    path("tasks/<str:task_id>/subtask/delete/<str:pk>/", views.SubTaskDelete.as_view(), name="delete-subtask"),
    path("subtasks/edit/<str:pk>/", views.SubTaskUpdate.as_view(), name="edit-subtask"),

]