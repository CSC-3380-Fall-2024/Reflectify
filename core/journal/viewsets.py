from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.journal.models import JournalEntry
from core.journal.serializers import JournalEntrySerializer
from typing import Type

class JournalEntryViewSet(viewsets.ModelViewSet):
    http_method_names: list[str] = ['get', 'post', 'put', 'delete']
    serializer_class: Type[JournalEntrySerializer] = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    queryset = JournalEntry.objects.all()

    def perform_create(self, serializer: JournalEntrySerializer) -> None:
        serializer.save(user=self.request.user)