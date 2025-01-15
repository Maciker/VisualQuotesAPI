import json
from django.core.management.base import BaseCommand
from api.models import Quote


class Command(BaseCommand):
    help = 'Load quotes from a JSON file into the database'

    def handle(self, *args, **kwargs):
        with open('quotes.json', 'r') as file:
            quotes = json.load(file)
            for quote_data in quotes:
                Quote.objects.create(
                    id=quote_data['id'],
                    quote=quote_data['quote'],
                    author=quote_data['author'],
                    side=quote_data['side']
                )
            self.stdout.write(self.style.SUCCESS('Successfully loaded quotes into the database'))
