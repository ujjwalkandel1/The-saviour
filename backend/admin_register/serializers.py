# serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token

CustomUser = get_user_model()

class AdminRegistrationSerializer(serializers.ModelSerializer):
    # confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        password = self.validated_data['password']
        
        # Validate if the email already exists
        if CustomUser.objects.filter(email=self.validated_data.get('email')).exists():
            raise serializers.ValidationError({'error': 'Email is already registered!'})

        user = CustomUser(
            username=self.validated_data['username'], 
            email=self.validated_data.get('email')
        )
        user.set_password(password)
        user.save()

        Token.objects.create(user=user) #helps to create token for new user when the user is created
        return user
