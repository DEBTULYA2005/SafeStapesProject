from django.db import models
from django.contrib.auth.models import User 

class User(models.Model):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)
    # avatar = models.ImageField(upload_to='avatars/', default='static/assets/images/no_user.jpg')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def __str__(self):
        return self.email

class Member(models.Model):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    # photo = models.ImageField(upload_to='member_photos/', default='static/assets/images/no_user.jpg')
    photo = models.ImageField(upload_to='member_photos/', blank=True, null=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)

    # Vehicle fields
    vehicle_type = models.CharField(max_length=20, null=True, blank=True)
    vehicle_number = models.CharField(max_length=20, null=True, blank=True)
    vehicle_color = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.email 

class Admin(models.Model):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    # photo = models.ImageField(upload_to='admin_photos/', default='static/assets/images/no_user.jpg')
    photo = models.ImageField(upload_to='admin_photos/', blank=True, null=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.full_name


class RideRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.CharField(max_length=255) 
    dropoff_location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default="Pending")  # Pending, Accepted
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ride by {self.user.full_name} - {self.status}"


class Activity(models.Model):
    ACTION_CHOICES = [
        ('user_created', 'User Created'),
        ('member_created', 'Member Created'),
        ('message_submitted', 'Message Submitted'),
        ('member_deleted', 'Member Deleted'),
        ('user_deleted', 'User Deleted'),
        ('user_password_changed', 'User Password Changed'),
        ('member_password_changed', 'Member Password Changed'),
        ('emergency_alert', 'Emergency Alert'),
    ]

    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.get_action_display()} at {self.timestamp.strftime('%Y-%m-%d %H:%M')}"