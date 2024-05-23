from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('users/', views.register_view, name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-cash/', views.user_cash_view, name='user_cash'),  # Add this URL pattern
    path('admin/', admin.site.urls),
]