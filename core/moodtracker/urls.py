from django.urls import path
from . import views

urlpatterns = [
    path('calculate-mood/', views.calculate_mood, name='calculate_mood'),  
]