from django.contrib import admin
from django.urls import path, include
from accounts import views

urlpatterns = [
    path('messages/', views.message_list), 
    path('users/', views.user_list),
    path('admin/', admin.site.urls),
]