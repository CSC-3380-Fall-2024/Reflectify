from typing import Any
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from core.account.serializers import UserSerializer
from core.account.models import User


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        data: dict[str, Any] = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class RegisterSerializer(UserSerializer):
    password: serializers.CharField = serializers.CharField(
        max_length=128, min_length=8, write_only=True, required=True
    )
    email: serializers.EmailField = serializers.EmailField(
        required=True, write_only=True, max_length=128
    )

    class Meta:
        model: type = User
        fields: list[str] = ['id', 'username', 'email', 'password', 'is_active']

    def create(self, validated_data: dict[str, Any]) -> User:
        try:
             user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user