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
from rest_framework.permissions import IsAuthenticated
from .services import user_cash

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
def cash(request):
    user = request.user
    cash_amount = user_cash(user)
    return Response({'cash': cash_amount})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
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
def hospitals(request):
    user = request.user
    hospitals = user.hospitals.all()  # Assuming 'hospitals' is the related name of the ManyToMany field
    hospital_ids = [hospital.id for hospital in hospitals]
    return Response(hospital_ids)

    