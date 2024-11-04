from django.db import models
from django.contrib.auth.models import User

class MoodQuestion(models.Model):
    question_text = models.CharField(max_length = 255)
    options = models.JSONField()
    category = models.CharField(max_length = 50)

    def __str__(self):
        return self.question_text

class MoodResponse(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    question = models.ForeignKey(MoodQuestion, on_delete = models.CASCADE)
    answer = models.CharField(max_length = 50)
    response_date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.user.username} - {self.question.question_text} - {self.answer}"

class MoodLog(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    score = models.FLoatField()
    log_date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.user.username} - Mood Score: {self.score} on {self.log_date}"