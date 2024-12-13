from rest_framework import serializers
from .models import SOSMessage
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']  # User details fields to be shown in GET response

class SOSMessageSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)  # Serialize user details but in read-only mode

    class Meta:
        model = SOSMessage
        fields = ['user', 'message', 'latitude', 'longitude', 'timestamp']  # Include user details in the response
