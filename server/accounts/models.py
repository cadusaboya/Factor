from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver

class User(AbstractUser):
    fullname = models.CharField(max_length=255)
    cash = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cpf = models.CharField(max_length=11, default=0)
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

class Transaction(models.Model):
    date = models.DateField()
    antecipado = models.DecimalField(max_digits=10, decimal_places=2)
    recebido = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)  # Add a reference to Task

class Hospital(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    
    def __str__(self):
        return self.name


# Adding a many-to-many relationship to User model
User.add_to_class('hospitals', models.ManyToManyField(Hospital, related_name='employees'))

class UserRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hospitals = models.ManyToManyField(Hospital)
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.user.username}'s Request"