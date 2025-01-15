# api/models.py
from django.db import models


class Quote(models.Model):
    id = models.IntegerField(primary_key=True)  # Ensure 'id' is defined as the primary key
    quote = models.TextField()
    author = models.CharField(max_length=100)
    side = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.author}: {self.quote}"
