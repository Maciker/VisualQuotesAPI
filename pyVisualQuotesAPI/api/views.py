from rest_framework import generics
from .models import Quote
from .serializers import QuoteSerializer
from django_filters.rest_framework import DjangoFilterBackend


class QuoteListCreateView(generics.ListCreateAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['side', 'author']


class QuoteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer