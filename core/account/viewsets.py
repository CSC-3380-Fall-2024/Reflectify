from typing import Any
from core.account.serializers import UserSerializer
from core.account.models import User
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django.db.models import QuerySet


class AccountViewSet(viewsets.ModelViewSet):
    http_method_names: list[str] = ['get']
    serializer_class: type = UserSerializer
    permission_classes: tuple = (IsAuthenticated,)
    filter_backends: list[type] = [filters.OrderingFilter]
    ordering_fields: list[str] = ['updated']
    ordering: list[str] = ['-updated']

    def get_queryset(self) -> QuerySet[User] | None:
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self) -> User:
        lookup_field_value: Any = self.kwargs[self.lookup_field]

        obj: User = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj