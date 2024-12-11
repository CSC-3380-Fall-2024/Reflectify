from django.db import models
from django.conf import settings
from typing import Type

class Habit(models.Model):
    user: Type[models.ForeignKey] = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='habits')
    name: Type[models.CharField] = models.CharField(max_length=100)
    target: Type[models.PositiveIntegerField] = models.PositiveIntegerField()
    frequency: Type[models.CharField] = models.CharField(
        max_length=50,
        choices=[
            ('daily', 'Daily'),
            ('weekly', 'Weekly'),
            ('monthly', 'Monthly'),
        ],
        default='daily'
    )
    created_at: Type[models.DateTimeField] = models.DateTimeField(auto_now_add=True)
    updated_at: Type[models.DateTimeField] = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name} ({self.user.username})"

class HabitLog(models.Model):
    habit: Type[models.ForeignKey] = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='logs')
    date: Type[models.DateField] = models.DateField()
    progress: Type[models.PositiveIntegerField] = models.PositiveIntegerField()

    class Meta:
        unique_together = ('habit', 'date')

    def __str__(self) -> str:
        return f"{self.habit.name} - {self.date}: {self.progress}/{self.habit.target}"