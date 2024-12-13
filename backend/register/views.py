from rest_framework.decorators import api_view
from rest_framework.response import Response
from register.serializers import RegistrationSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model  
from rest_framework.authtoken.models import Token

User = get_user_model()  

@api_view(['POST'])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    data = {}

    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.get(user=user)
        data['message'] = "Registration successful!"
        #data['phone_number'] = user.phone_number  
        data['token'] = token.key
        return Response(data, status=201)
    else:
        return Response(serializer.errors, status=400)


@api_view(['POST'])
def custom_login(request):
    phone_number = request.data.get('phone_number')
    password = request.data.get('password')

    if not phone_number or not password:
        return Response({'error': 'Phone number and password are required!'}, status=400)

    try:
        
        user = User.objects.get(phone_number=phone_number) 
    except User.DoesNotExist:  
        return Response({'error': 'Invalid phone number or password!'}, status=400)

    user = authenticate(username=user.username, password=password)
    if not user:
        return Response({'error': 'Invalid phone number or password!'}, status=400)


    token, created = Token.objects.get_or_create(user=user)
    return Response({'message': 'Login successful!',
    'token': token.key}, status=200)


# class RefreshTokenView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         # Delete old token
#         request.auth.delete()
        
#         # Create a new token
#         new_token = Token.objects.create(user=request.user)
#         return Response({'token': new_token.key})