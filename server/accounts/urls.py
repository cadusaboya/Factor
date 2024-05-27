from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('user/profile/', views.user_profile, name='profile'),
    path('user/cash/', views.user_cash_view, name='cash'),
    path('requests/', views.submit_request, name='submit_request'),
    path('user/hospitals/', views.user_hospitals, name='user_hospitals'),
    path('tasks/', views.user_tasks_view, name='user_tasks'),
    path('update-tasks/', views.update_tasks, name='update_tasks'),
    path('user/transactions/', views.transactions_view, name='transactions'),
]