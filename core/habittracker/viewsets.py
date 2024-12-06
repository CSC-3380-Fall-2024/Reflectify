from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from core.habittracker.models import Habit, HabitLog
from core.habittracker.serializers import HabitSerializer, HabitLogSerializer

class HabitViewSet(viewsets.ModelViewSet):

    serializer_class = HabitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user= self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HabitLogViewSet(viewsets.ModelViewSet):
    serializer_class = HabitLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HabitLog.objects.filter(habit_user= self.request.user)

    def perform_create(self, serializer):
        habit = serializer.validated_data['habit']
        date = serializer.validated_data['date']
        if HabitLog.objects.filter(habit=habit, date=date).exists():
            raise ValidationError("Log for this habit on this date already exists.")
        serializer.save()
