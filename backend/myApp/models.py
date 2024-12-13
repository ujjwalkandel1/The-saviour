from django.db import models
from django.conf import settings  # Import settings to use AUTH_USER_MODEL

class RegisterNumber(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Use AUTH_USER_MODEL
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.phone_number} - {self.user.username}"

class TimeInterval(models.Model):
    TIME_CHOICES = [
        (3, "3 sec"),
        (5, "5 sec"),
        (10, "10 sec"),
        (15, "15 sec"),
        (20, "20 sec"),
        (30, "30 sec"),
    ]
    time = models.IntegerField(choices=TIME_CHOICES, default=3)  # Default time is 3 seconds

    def __str__(self):
        return f"{self.time} sec"

class ViewNumber(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,null=True, related_name="registered_numbers")  # Use AUTH_USER_MODEL
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.name} - {self.phone_number} (User: {self.user.username})"

class DeletedNumber(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="deleted_numbers")  # Use AUTH_USER_MODEL
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    deleted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.phone_number} (Deleted by: {self.user.username})"

