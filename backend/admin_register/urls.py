from django.urls import path
from .views import admin_login,admin_register

urlpatterns = [
    path('admin_login/', admin_login, name='admin_login'),
    path('admin_register/', admin_register, name='admin_register'),
]
