from rest_framework import serializers
from .models import Task, Transaction

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'value', 'is_completed']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['task', 'date', 'antecipado', 'recebido', 'status']