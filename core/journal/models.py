from django.db import models
from core.account.models import User

class JournalEntryManager(models.Manager):
    def create_entry(self, user: User, title: str, content: str):
        entry = self.create(user=user, title=title, content=content)
        return entry

class JournalEntry(models.Model):
    user: models.ForeignKey[User] = models.ForeignKey(User, on_delete=models.CASCADE)
    title: str = models.CharField(max_length=255)
    content: str = models.TextField()
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)

    objects: JournalEntryManager = JournalEntryManager()

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.title