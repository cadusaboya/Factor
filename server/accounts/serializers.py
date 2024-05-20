from rest_framework import serializers
from .models import Message, User

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'text']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'cash', 'cpf', 'telefone']
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