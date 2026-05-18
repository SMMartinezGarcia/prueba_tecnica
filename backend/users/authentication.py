from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework import exceptions

class CookieJWTAuthentication(JWTAuthentication):
    """
    Autenticación que lee el token desde la cookie
    en vez del header Authorization
    """
    def authenticate(self, request):
        # Lee el token de la cookie
        token = request.COOKIES.get('token')

        if not token:
            return None

        try:
            validated_token = self.get_validated_token(token)
            return self.get_user(validated_token), validated_token
        except InvalidToken:
            raise exceptions.AuthenticationFailed('Token inválido o expirado')