from django.urls import path
from . import views

urlpatterns = [
    path("boards/", views.BoardListCreate.as_view(), name="board-list"),
    path("boards/delete/<str:pk>/", views.BoardDelete.as_view(), name="delete-board"),
    path("boards/edit/<str:pk>/", views.BoardUpdate.as_view(), name="edit-board"),
    path("board/tasks/<str:board_id>/", views.TaskListCreate.as_view(), name="task-list"),
    path("task/<str:pk>/", views.TaskList.as_view(), name="task-list"),
    path("board/<str:board_id>/tasks/delete/<str:pk>/", views.TaskDelete.as_view(), name="delete-task"),
    path("board/<str:board_id>/tasks/edit/<str:pk>/", views.TaskUpdate.as_view(), name="edit-task"),
    path("board/task/subtasks/<str:task_id>/", views.SubTaskListCreate.as_view(), name="subtask-list"),
    path("subtask/delete/<str:pk>/", views.SubTaskDelete.as_view(), name="delete-subtask"),
    path("task/<str:task_id>/subtasks/edit/<str:pk>/", views.SubTaskUpdate.as_view(), name="edit-subtask"),

]