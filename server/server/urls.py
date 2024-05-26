from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('users/', views.register_view, name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/cash/', views.user_cash_view, name='user_cash'),
    path('tasks/', views.user_tasks_view, name='user-tasks'),
    path('update-tasks/', views.update_tasks, name='update_tasks'),
    path('transactions/', views.transactions_view, name='create_transaction'),
    path('admin/', admin.site.urls),
    path('user/hospitals/', views.user_hospitals, name='user_hospitals'),
    path('submit_request/', views.submit_request, name='submit_request'),
    path('user/profile/', views.user_profile, name='user_profile'),
]