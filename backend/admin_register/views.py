from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AdminRegistrationSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model  
from rest_framework.authtoken.models import Token

User = get_user_model()  

@api_view(['POST'])
def admin_register(request):
    serializer = AdminRegistrationSerializer(data=request.data)
    data = {}

    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.get(user=user)  
        data['message'] = "Registration successful!"
        data['email'] = user.email
        data['token'] = token.key
        
        # You can return more info here
        return Response(data, status=201)
    else:
        return Response(serializer.errors, status=400)


# Admin Login API
@api_view(['POST'])
def admin_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required!'}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid email or password!'}, status=400)

    user = authenticate(username=user.username, password=password)
    if not user:
        return Response({'error': 'Invalid email or password!'}, status=400)

    
    token, created = Token.objects.get_or_create(user=user)
    return Response({
        'message': 'Login successful!',
        'token': token.key  # Send token back for authentication in future requests
    }, status=200)
