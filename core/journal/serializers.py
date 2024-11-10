from rest_framework import serializers
from core.journal.models import JournalEntry

class JournalEntrySerializer(serializers.ModelSerializer):
     class Meta:
        model = JournalEntry
        fields = ['id', 'user', 'title', 'content','created_at','updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']
