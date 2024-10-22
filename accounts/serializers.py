from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

def create(self, validated_data):
    user = User(
        username = validated_data['username'],
        email = validated_data['email']
    )
    user.setpassword(validated_data['password'])
    user.save()
    return user
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

def validate(self, data):
    user = authenticate(**data)
    if user is None:
        raise serializers.ValidationError("INVALID CREDENTIALS")
    return user