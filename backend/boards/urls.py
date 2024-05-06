from django.urls import path
from . import views

urlpatterns = [
    path("boards/", views.BoardListCreate.as_view(), name="board-list"),
    path("boards/delete/<str:pk>/", views.BoardDelete.as_view(), name="delete-board"),
    path("boards/edit/<str:pk>/", views.BoardUpdate.as_view(), name="edit-board"),

]