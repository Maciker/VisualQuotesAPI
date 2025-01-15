from django.urls import path
from .views import QuoteListCreateView, QuoteRetrieveUpdateDestroyView

urlpatterns = [
    path('quotes/', QuoteListCreateView.as_view(), name='quote-list-create'),
    path('quotes/<int:pk>/', QuoteRetrieveUpdateDestroyView.as_view(), name='quote-retrieve-update-destroy'),
]