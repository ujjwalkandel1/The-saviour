from django.urls import path
from .views import SOSMessageAPIView

urlpatterns = [
    path('sos/', SOSMessageAPIView.as_view(), name='sos_message'),
]

