from rest_framework import serializers
from .models import User, Task, Transaction, Hospital, UserRequest

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'

class UserRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRequest
        fields = ['hospitals', 'status']

class UserSerializer(serializers.ModelSerializer):
    hospitals = HospitalSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'cash', 'cpf', 'telefone', 'hospitals']
        extra_kwargs = {
            'password': {'write_only': True},  # Ensure password is write-only
            'cpf': {'required': True},         # Make cpf required
            'telefone': {'required': True},    # Make telefone required
        }

    def create(self, validated_data):
        # Create a new User instance using Django's create_user method
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            cpf=validated_data['cpf'],
            telefone=validated_data['telefone'],
        )
        return user

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'value', 'is_completed']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['task', 'date', 'antecipado', 'recebido', 'status']