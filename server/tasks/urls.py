from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_tasks_view, name='user_tasks'),
    path('update-tasks/', views.update_tasks, name='update_tasks'),
    path('user/transactions/', views.transactions_view, name='transactions'),
]