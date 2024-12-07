from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.journal.models import JournalEntry
from core.journal.serializers import JournalEntrySerializer

class JournalEntryViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'delete']
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    queryset = JournalEntry.objects.all()

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)