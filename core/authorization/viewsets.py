from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status, serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenRefreshView
from core.authorization.serializers import LoginSerializer, RegisterSerializer


class LoginViewSet(ViewSet):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        print("Request Data:", request.data)  
        serializer = self.serializer_class(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            print("Validated Data:", serializer.validated_data)  
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:  
            print("Validation Errors:", serializer.errors)  
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError as e:  
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)


class RegistrationViewSet(ViewSet):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        print("Request Data:", request.data)  # DEBUG: Log incoming data
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            "user": serializer.data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


class RefreshViewSet(ViewSet):
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        print("Request Data:", request.data)  
        serializer = TokenRefreshView.get_serializer(data=request.data)  

        try:
            serializer.is_valid(raise_exception=True)
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:  
            print("Validation Errors:", serializer.errors)  
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError as e: 
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
