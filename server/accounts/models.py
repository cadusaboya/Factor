from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver

class User(AbstractUser):
    cash = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cpf = models.DecimalField(max_digits=11, decimal_places=0, default=0.00)
    telefone = models.DecimalField(max_digits=11, decimal_places=0, default=0.00)

    def update_cash(self):
        # Calculate the sum of values for all tasks associated with the user
        cash_sum = Task.objects.filter(user_id=self.id, is_completed=False).aggregate(models.Sum('value'))['value__sum']
        # Update the cash field
        self.cash = cash_sum if cash_sum is not None else 0
        self.save()

    def __str__(self):
        return self.username

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    is_completed = models.BooleanField(default=False)


    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        super(Task, self).save(*args, **kwargs)
        self.user.update_cash()
