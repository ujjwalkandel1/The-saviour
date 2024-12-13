from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SOSMessage
from .serializers import SOSMessageSerializer
from rest_framework.permissions import AllowAny

class SOSMessageAPIView(APIView):
    permission_classes = [AllowAny]  # No authentication required

    def get(self, request):
        sos_messages = SOSMessage.objects.all()
        serializer = SOSMessageSerializer(sos_messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data

        # Check if the user is authenticated, if not, assign a default user or None
        if request.user.is_authenticated:
            data['user'] = request.user.id  # Automatically assign the logged-in user
        else:
            data['user'] = None  # No user is assigned for unauthenticated requests

        serializer = SOSMessageSerializer(data=data)
        if serializer.is_valid():
            sos_message = serializer.save(user=request.user if request.user.is_authenticated else None)
            return Response(SOSMessageSerializer(sos_message).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
