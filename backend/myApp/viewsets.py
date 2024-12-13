from rest_framework import serializers
from rest_framework.viewsets import ModelViewSet
from .models import RegisterNumber,TimeInterval, ViewNumber, DeletedNumber
from .serializers import RegisterNumberSerializer, TimeIntervalSerializer, ViewNumberSerializer, DeletedNumberSerializer
from rest_framework.response import Response
from rest_framework import status

class RegisterNumberViewSet(ModelViewSet):
    queryset = RegisterNumber.objects.all()
    serializer_class = RegisterNumberSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        register_number = serializer.save(user=user)
        ViewNumber.objects.create(
            user=user,
            name=register_number.name,
            phone_number=register_number.phone_number
        )
        return register_number

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        ViewNumber.objects.filter(
            user=self.request.user,
            name=instance.name,
            phone_number=instance.phone_number
        ).delete()
        self.perform_destroy(instance)
        return Response(
            {"message": f"Number {instance.phone_number} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )


class TimeIntervalViewSet(ModelViewSet):
    queryset = TimeInterval.objects.all()
    serializer_class = TimeIntervalSerializer
    def get_queryset(self):
        return self.queryset.all()
    
class ViewNumberViewSet(ModelViewSet):
    queryset = ViewNumber.objects.all()
    serializer_class = ViewNumberSerializer
    http_method_names = ['get']

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class DeletedNumberViewSet(ModelViewSet):
    queryset = DeletedNumber.objects.all()
    serializer_class = DeletedNumberSerializer
    http_method_names = ['get', 'delete','post']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        DeletedNumber.objects.create(
            user=request.user,
            name=instance.name,
            phone_number=instance.phone_number
        )
        ViewNumber.objects.filter(
            user=request.user,
            name=instance.name,
            phone_number=instance.phone_number
        ).delete()
        self.perform_destroy(instance)
        return Response(
            {"message": f"Number {instance.phone_number} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )
