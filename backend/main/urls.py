"""
URL configuration for main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('django/', admin.site.urls),
    path('dashboard/', include('admin_dash.urls')),
    path('api/', include('myApp.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('account/', include('register.urls')),
    path('',include('sos.urls')),
    path('admin/',include('admin_register.urls')),
]
