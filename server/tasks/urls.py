from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_tasks, name='user_tasks'),
    path('update/', views.update_tasks, name='update_tasks'),
    path('user/transactions/', views.user_transactions, name='transactions'),
] 