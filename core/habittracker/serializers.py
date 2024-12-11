from rest_framework import serializers
from core.habittracker.models import Habit, HabitLog
from typing import Dict, Any

class HabitSerializer(serializers.ModelSerializer):
    logs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Habit
        fields = ['id', 'user', 'name', 'target', 'frequency', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def create(self, validated_data: Dict[str, Any]) -> Habit:
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class HabitLogSerializer(serializers.ModelSerializer):
    habit_name = serializers.ReadOnlyField(source='habit.name')

    class Meta:
        model = HabitLog
        fields = ['id', 'habit', 'habit_name', 'date', 'progress']
        read_only_fields = ['id', 'habit_name']