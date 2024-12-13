from rest_framework import serializers
from .models import RegisterNumber,TimeInterval, ViewNumber, DeletedNumber

class RegisterNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterNumber
        fields = ['user','id', 'name', 'phone_number', 'created_at']
        read_only_fields = ['user','created_at']

class TimeIntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeInterval
        fields = ['id', 'time']

class ViewNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewNumber
        fields = [#'id', 'user', 
        'name', 'phone_number']

class DeletedNumberSerializer(serializers.ModelSerializer):
    register_number_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = DeletedNumber
        fields = ['id', 'user', 'name', 'phone_number', 'deleted_at', 'register_number_id']
        read_only_fields = ['id', 'user', 'name', 'phone_number', 'deleted_at']

    def validate_register_number_id(self, value):
        user = self.context['request'].user
        if not RegisterNumber.objects.filter(id=value, user=user).exists():
            raise serializers.ValidationError("Register Number with this ID does not exist.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        register_number_id = validated_data.pop('register_number_id')
        register_number = RegisterNumber.objects.get(id=register_number_id, user=user)
        
        deleted_number = DeletedNumber.objects.create(
            user=user,
            name=register_number.name,
            phone_number=register_number.phone_number,
            deleted_at=register_number.created_at
        )
        register_number.delete()
        return deleted_number

