from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if not user:
            return Response(
                {'error': 'Usuario o contraseña incorrectos'},
                status=401
            )

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({'username': user.username})

        response.set_cookie(
            key='token',
            value=access_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=86400,
        )

        return response

class LogoutView(APIView):
    def post(self, request):
        response = Response({'message': 'Sesión cerrada'})
        response.delete_cookie('token')
        return response

class MeView(APIView):
    def get(self, request):
        # Devuelve el nombre del usuario autenticado
        return Response({'username': request.user.username})