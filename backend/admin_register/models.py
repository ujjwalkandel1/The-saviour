# admin_register/models.py
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    # Make related_name unique for the admin_register app
    groups = models.ManyToManyField(
        Group,
        related_name="admin_register_customuser_groups", 
        blank=True
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="admin_register_customuser_permissions",  
        blank=True
    )

    def __str__(self):
        return self.email
