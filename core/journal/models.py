from django.db import models
from django.conf import settings
from core.account.models import User

class JournalEntryManager(models.Manager):
    def create_entry(self, user, title, content):
        entry = self.create(user=user, title=title, content=content)
        return entry

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length = 255, default = 'Untitled')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add= True)
    updated_at = models.DateTimeField(auto_now= True)

    objects = JournalEntryManager()

    class Meta:
            ordering = ['-created_at']
            db_table = 'journal_entries'

    def __str__(self):
        return self.title