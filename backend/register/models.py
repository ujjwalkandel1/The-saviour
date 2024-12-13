
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
#from django.utils.timezone import now, timedelta
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)   
    groups = models.ManyToManyField(
        Group,
        related_name="register_customuser_groups", 
        blank=True
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="register_customuser_permissions",  
        blank=True
    )

    def __str__(self):
        return self.username  

