from typing import Type
from core.account.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model: Type[User] = User
        fields: list[str] = ['id', 'username', 'email', 'is_active']
        read_only_fields: list[str] = ['is_active']