from rest_framework import serializers
from .models import MoodQuestion, MoodResponse, MoodLog
from rest_framework import serializers

class MoodInputSerializer(serializers.Serializer):
    answers = serializers.ListField(
        child=serializers.IntegerField(min_value=1, max_value=5),
        min_length=5,
        max_length=5,
        allow_empty=False
    )

class MoodOutputSerializer(serializers.Serializer):
    mood = serializers.CharField()
    score = serializers.IntegerField()