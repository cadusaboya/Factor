from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    cash = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cpf = models.DecimalField(max_digits=11, decimal_places=0, default=0.00)
    telefone = models.DecimalField(max_digits=11, decimal_places=0, default=0.00)

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name