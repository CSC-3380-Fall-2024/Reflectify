from rest_framework import serializers
from core.journal.models import JournalEntry

class JournalEntrySerializer(serializers.ModelSerializer):
     class Meta:
        model = JournalEntry
        fields = ['id','content','created_at','updated_at']
        read_only_fields = ['created_at', 'updated_at']
