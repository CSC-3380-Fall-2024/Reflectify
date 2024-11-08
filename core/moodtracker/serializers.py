from rest_framework import serializers
from .models import MoodQuestion, MoodResponse, MoodLog

class MoodQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodQuestion
        fields = ['id', 'question_text', 'options', 'category']

class MoodResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodResponse
        fields = ['user', 'question', 'answer', 'response_date']

class MoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodLog
        fields = ['user', 'score', 'log_date']