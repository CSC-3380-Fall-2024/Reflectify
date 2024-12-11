from django.db import models
from django.conf import settings

class MoodQuestion(models.Model):
    question_text = models.TextField()
    options = models.JSONField()  
    category = models.CharField(max_length=50)  
    def __str__(self) -> str:
        return f"{self.category}: {self.question_text[:50]}..."


class MoodResponse(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="mood_responses")
    question = models.ForeignKey(MoodQuestion, on_delete=models.CASCADE, related_name="responses")
    answer = models.PositiveIntegerField()  
    response_date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Response by {self.user} to '{self.question}'"


class MoodLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="mood_logs")
    score = models.PositiveIntegerField()  
    log_date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"MoodLog for {self.user} on {self.log_date.date()}: {self.score}"