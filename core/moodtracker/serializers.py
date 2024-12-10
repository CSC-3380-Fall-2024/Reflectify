from rest_framework import serializers
from core.moodtracker.models import MoodQuestion, MoodResponse, MoodLog

class MoodQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodQuestion
        fields: list[str] = ['id', 'question_text', 'options', 'category']


class MoodResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodResponse
        fields: list[str] = ['user', 'question', 'answer', 'response_date']


class MoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodLog
        fields: list[str] = ['user', 'score', 'log_date']