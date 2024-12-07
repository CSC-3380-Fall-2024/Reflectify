from django.db import models
from django.conf import settings

class Habit(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name = 'habits')
    name = models.CharField(max_length = 100)
    target = models.PositiveIntegerField()
    frequency = models.CharField(max_length = 50, choices =[
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ], default = 'daily')
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, on_delete = models.CASCADE, related_name = 'logs')
    date = models.DateField()
    progress = models.PositiveIntegerField()

    class Meta:
        unique_together = ('habit', 'date')

    def __str__(self):
        return f"{self.habit.name} - {self.date}: {self.progress}/{self.habit.target}"