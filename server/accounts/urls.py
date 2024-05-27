from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('user/profile/', views.profile, name='profile'),
    path('user/cash/', views.cash, name='cash'),
    path('user/requests/', views.submit_request, name='submit_request'),
    path('user/hospitals/', views.hospitals, name='user_hospitals'),
]