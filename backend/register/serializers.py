from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token

CustomUser = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['username', 'phone_number', 'password', #'confirm_password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        password = self.validated_data['password']
        if CustomUser.objects.filter(phone_number=self.validated_data.get('phone_number')).exists():
            raise serializers.ValidationError({'error': 'Phone number is already registered!'})

        user = CustomUser(
            username=self.validated_data['username'], 
            phone_number=self.validated_data.get('phone_number')
        )
        user.set_password(password)
        user.save()

        Token.objects.create(user=user)
        return user
