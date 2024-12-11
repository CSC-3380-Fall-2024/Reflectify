from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from core.habittracker.models import Habit, HabitLog
from core.habittracker.serializers import HabitSerializer, HabitLogSerializer
from typing import Type

class HabitViewSet(viewsets.ModelViewSet):
    serializer_class: Type[HabitSerializer] = HabitSerializer
    permission_classes: list[permissions.BasePermission] = [permissions.IsAuthenticated]

    def get_queryset(self) -> Habit.objects:
        return Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer: HabitSerializer) -> None:
        serializer.save(user=self.request.user)

class HabitLogViewSet(viewsets.ModelViewSet):
    serializer_class: Type[HabitLogSerializer] = HabitLogSerializer
    permission_classes: list[permissions.BasePermission] = [permissions.IsAuthenticated]

    def get_queryset(self) -> HabitLog.objects:
        return HabitLog.objects.filter(habit_user=self.request.user)

    def perform_create(self, serializer: HabitLogSerializer) -> None:
        habit = serializer.validated_data['habit']
        date = serializer.validated_data['date']
        if HabitLog.objects.filter(habit=habit, date=date).exists():
            raise ValidationError("Log for this habit on this date already exists.")
        serializer.save()
