from django.db import models
from accounts.models import User

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    @staticmethod
    def update_user_cash(user_id):
        # Calculate the sum of values for all tasks associated with the user
        cash_sum = Task.objects.filter(user_id=user_id, is_completed=False).aggregate(models.Sum('value'))['value__sum']

        # Retrieve the user object
        user = User.objects.get(pk=user_id)

        # Update the cash field
        user.cash = cash_sum if cash_sum is not None else 0
        user.save()

    def save(self, *args, **kwargs):
        super(Task, self).save(*args, **kwargs)
        self.update_user_cash(self.user_id)

class Transaction(models.Model):
    date = models.DateField()
    antecipado = models.DecimalField(max_digits=10, decimal_places=2)
    recebido = models.DecimalField(max_digits=10, decimal_places=2)
    STATUS_CHOICES = (
        ('Em análise', 'Em Análise'),
        ('Aprovado', 'Aprovado'),
        ('Recusado', 'Recusado'),
        ('Recebido', 'Recebido'),
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Em análise')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)  # Add a reference to Task

    def __str__(self):
        return f"{self.task.name}"