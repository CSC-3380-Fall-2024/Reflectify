from core.account.serializers import UserSerializer
from core.account.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters


class AccountViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        
        return User.objects.filter(id=self.request.user.id)

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        try:
            obj = User.objects.get(lookup_field_value)
        except User.DoesNotExist:
            raise NotaFound("User not found.")
        
        self.check_object_permissions(self.request, obj)

        return obj
