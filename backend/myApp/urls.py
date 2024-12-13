from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    RegisterNumberViewSet,TimeIntervalViewSet, ViewNumberViewSet, DeletedNumberViewSet)

router = DefaultRouter()
router.register(r'registernumbers', RegisterNumberViewSet, basename='registerNumber')
router.register(r'timeintervals', TimeIntervalViewSet, basename='timeinterval')
router.register(r'viewnumbers', ViewNumberViewSet, basename='viewnumber')
router.register(r'deleted-numbers', DeletedNumberViewSet, basename='deletednumber')

urlpatterns = [
    path('', include(router.urls)),
]
