from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from core.account.serializers import UserSerializer
from core.account.models import User
from django.contrib.auth import get_user_model


class LoginSerializer(TokenObtainPairSerializer):
    username = serializers.CharField(max_length=128, required=False)
    email = serializers.EmailField(required=False) 
    password = serializers.CharField(max_length=128, required=True)  

    def validate(self, attrs):
        print('Validation input data:', attrs)
        
        if not attrs.get('username') and not attrs.get('email'):
            raise serializers.ValidationError('Username or email is required.')

        user = None
        if attrs.get('username'):
            user = get_user_model().objects.filter(username=attrs['username']).first()
        elif attrs.get('email'):
            user = get_user_model().objects.filter(email=attrs['email']).first()

        if not user:
            raise ValidationError('Invalid credentials.')

      
        if not user.check_password(attrs['password']):
            raise ValidationError('Invalid credentials.')

        
        refresh = self.get_token(user)
        return {
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }

        return data



class RegisterSerializer(UserSerializer):
    username = serializers.CharField(max_length=150, required=True, write_only=True)
    email = serializers.EmailField(required=True, write_only=True, max_length=128)
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_active']

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(
                username = validated_data['username'],
                email = validated_data['email'],
                password = validated_data['password'],
                is_active = True
        )
        return user
