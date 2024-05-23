from rest_framework import status # type: ignore
from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from django.contrib.auth import authenticate # type: ignore
from django.middleware.csrf import get_token # type: ignore
from .models import User, Task, Transaction
from .serializers import UserSerializer, TaskSerializer, TransactionSerializer
from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from django.contrib.auth import authenticate # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def login_view(request):
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
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def register_view(request):
        
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        response_data = {'data': serializer.data, 'message': 'User created successfully'}
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Add IsAuthenticated permission here
def user_cash_view(request):
    request.user.update_cash()
    user_cash = request.user.cash  # Assuming profile is related to the user model
    return Response({'cash': user_cash})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_tasks_view(request):
    tasks = Task.objects.filter(user=request.user)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_tasks(request):
    try:
        task_ids = request.data.get('tasks')
        # Update tasks: Set is_completed to True for the specified task IDs
        Task.objects.filter(id__in=task_ids).update(is_completed=True)
        return Response({'message': 'Tasks updated successfully.'})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_transaction(request):
    try:
        # Extract the user ID from the JWT token
        user_id = request.user.id
        
        # Now you have the user ID, you can use it as needed in your view logic
        
        # Proceed with creating the transaction
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            # Set the user ID before saving the transaction
            serializer.save(user_id=user_id)
            return Response({'message': 'Transaction created successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)