from django.contrib import admin
from django.urls import path, include
from accounts import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('users/', views.register_view, name='register'),
    path('admin/', admin.site.urls),
]