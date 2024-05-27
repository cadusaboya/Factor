from rest_framework import status # type: ignore
from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from django.contrib.auth import authenticate # type: ignore
from django.middleware.csrf import get_token # type: ignore
from .models import Task, Transaction
from .serializers import TaskSerializer, TransactionSerializer
from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from django.contrib.auth import authenticate # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from rest_framework.permissions import IsAuthenticated
from accounts.services import update_user_cash

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_tasks(request):
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

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # Allow authenticated users
def user_transactions(request):
    if request.method == 'GET':
        # Retrieve transactions for the authenticated user
        transactions = Transaction.objects.filter(user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        try:
                # Extract the user ID from the JWT token
                user_id = request.user.id    
                
                # Proceed with creating the transaction
                serializer = TransactionSerializer(data=request.data)
                if serializer.is_valid():
                    # Set the user ID before saving the transaction
                    serializer.save(user_id=user_id)
                    update_user_cash(request.user)
                    return Response({'message': 'Transaction created successfully.'}, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


