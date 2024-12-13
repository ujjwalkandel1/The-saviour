from django.db import models
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class SOSMessage(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    latitude = models.DecimalField(max_digits=58, decimal_places=50, null=True, blank=True)
    longitude = models.DecimalField(max_digits=58, decimal_places=50, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"SOS {self.message} at {self.timestamp}"
