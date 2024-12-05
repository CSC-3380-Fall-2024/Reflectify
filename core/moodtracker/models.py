from django.db import models
from django.contrib.auth.models import User

class MoodQuestion(models.Model):
    question_text = models.TextField()
    options = models.JSONField()  # Stores possible answers as JSON, e.g., ["1", "2", "3", "4", "5"]
    category = models.CharField(max_length=50)  # Category of the question (e.g., "stress", "happiness")

    def __str__(self):
        return f"{self.category}: {self.question_text[:50]}..."


class MoodResponse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mood_responses")
    question = models.ForeignKey(MoodQuestion, on_delete=models.CASCADE, related_name="responses")
    answer = models.PositiveIntegerField()  # User's selected option (e.g., 1-5)
    response_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response by {self.user.username} to '{self.question}'"


class MoodLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mood_logs")
    score = models.PositiveIntegerField()  # Aggregated score from mood responses
    log_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"MoodLog for {self.user.username} on {self.log_date.date()}: {self.score}"