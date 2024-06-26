from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver

class User(AbstractUser):
    fullname = models.CharField(max_length=255)
    cash = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cpf = models.CharField(max_length=11, default=0, unique=True)
    telefone = models.DecimalField(max_digits=11, decimal_places=0, default=0.00)
    email = models.EmailField(unique=True)  # Making email field unique and non-null

    def __str__(self):
        return self.username

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

    def save(self, *args, **kwargs):
        if self.pk:  # Check if the object already exists in the database
            old_status = UserRequest.objects.get(pk=self.pk).status
            if old_status != 'approved' and self.status == 'approved':
                # Clear the user's existing hospital relationships
                self.user.hospitals.clear()
                # Update the user's associated hospitals
                for hospital in self.hospitals.all():
                    self.user.hospitals.add(hospital)
                self.user.save()
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username}'s Request"
    
class UserDeleteRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.user.username}'s Request"