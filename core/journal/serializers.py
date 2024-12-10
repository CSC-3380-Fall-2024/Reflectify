from rest_framework import serializers
from core.journal.models import JournalEntry
from typing import Type

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model: Type[JournalEntry] = JournalEntry
        fields: list[str] = ['id', 'user', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields: list[str] = ['user', 'created_at', 'updated_at']