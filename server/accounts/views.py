from rest_framework import status # type: ignore
from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from django.contrib.auth import authenticate # type: ignore
from django.middleware.csrf import get_token # type: ignore
from .serializers import UserSerializer, UserRequestSerializer
from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from django.contrib.auth import authenticate # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore
from .services import update_user_cash

from django.shortcuts import redirect
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.http import JsonResponse
from .models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator

@api_view(['POST'])
def login(request):
    """
    Handle user login.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        response_data = {
            'message': 'Login successful',
            'token': str(refresh.access_token),
        }
        return Response(response_data, status=status.HTTP_200_OK)
    else:
        response_data = {
            'message': 'Login unsuccessful',
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def register(request):
        
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        response_data = {'data': serializer.data, 'message': 'User created successfully'}
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Add IsAuthenticated permission here
def user_cash(request):
    user = request.user
    cash_amount = update_user_cash(user)
    return Response({'cash': cash_amount})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_request(request):
    serializer = UserRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user_id=request.user.id)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_hospitals(request):
    user = request.user
    hospitals = user.hospitals.all()  # Assuming 'hospitals' is the related name of the ManyToMany field
    hospital_ids = [hospital.id for hospital in hospitals]
    return Response(hospital_ids)

@api_view(['POST'])
def password_reset(request):
    username = request.data.get('username')
    email = request.data.get('email')

    # Check if a user with the provided username or email exists
    try:
        user = User.objects.get(username=username, email=email)

        # Generate a token for password reset
        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        # Send password reset email
        reset_url = f'http://factorpa.xyz/reset-password/{uid}/{token}' # Need to build this
        send_mail(
            'Password Reset Request',
            f'Click the following link to reset your password: {reset_url}',
            'suporte@factorpa.xyz',
            [user.email],
            fail_silently=False,
        )
        return JsonResponse({'message': 'Password reset email sent'}, status=200)  # You can customize the response message as needed
    except:
        return JsonResponse({'error': 'User does not exist'}, status=400)

    