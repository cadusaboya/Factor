from django.db import models
from accounts.models import User
from accounts.services import update_user_cash

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Task, self).save(*args, **kwargs)
        update_user_cash(self.user)

class Transaction(models.Model):
    date = models.DateField()
    antecipado = models.DecimalField(max_digits=10, decimal_places=2)
    recebido = models.DecimalField(max_digits=10, decimal_places=2)
    STATUS_CHOICES = (
        ('Em análise', 'Em Análise'),
        ('Aprovado', 'Aprovado'),
        ('Recusado', 'Recusado'),
        ('Pago', 'Pago'),
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Em análise')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)  # Add a reference to Task

    def __str__(self):
        return f"{self.task.name}"