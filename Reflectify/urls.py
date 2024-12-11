from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include
from core.account.viewsets import AccountViewSet
from core.authorization.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from core.habittracker.viewsets import HabitViewSet
from core.moodtracker.viewsets import MoodQuestionViewSet, MoodResponseViewSet, MoodLogViewSet
from core.journal.viewsets import JournalEntryViewSet

routes = DefaultRouter()

# AUTHENTICATION
routes.register(r'accounts', AccountViewSet, basename='account')
routes.register(r'login', LoginViewSet, basename='login')
routes.register(r'register', RegistrationViewSet, basename='register')
routes.register(r'refresh', RefreshViewSet, basename='refresh')


#APP FUNCTIONALITIES
routes.register(r'journal', JournalEntryViewSet, basename='journalentry')

routes.register(r'habittracker', HabitViewSet, basename ='habitlog')

routes.register(r'moodtracker', MoodQuestionViewSet, basename = 'moodquestion')
routes.register(r'moodtracker', MoodResponseViewSet, basename = 'moodresponse')
routes.register(r'moodtracker', MoodLogViewSet, basename = 'moodlog')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(('core.routers', 'core'), namespace='core-api')),
]