from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

# Token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['avatar'] = user.avatar.url

        return token

# Register
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        models = User
        fields = ['username', 'email', 'password']
