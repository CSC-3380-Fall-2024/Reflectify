from typing import Any
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.request import Request
from core.authorization.serializers import LoginSerializer, RegisterSerializer


class LoginViewSet(ViewSet):
    serializer_class: type = LoginSerializer
    permission_classes: tuple = (AllowAny,)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = self.serializer_class(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "refresh": serializer.validated_data.get("refresh"),
            "access": serializer.validated_data.get("access"),
            "user": serializer.validated_data.get("user"),
        }, status=status.HTTP_200_OK)


class RegistrationViewSet(ViewSet):
    serializer_class: type = RegisterSerializer
    permission_classes: tuple = (AllowAny,)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
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
    permission_classes: tuple = (AllowAny,)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = TokenRefreshView.get_serializer(self, data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)