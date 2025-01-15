from django.db import models

class Quote(models.Model):
    quote = models.TextField()
    author = models.CharField(max_length=100)
    side = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.author}: {self.quote}"