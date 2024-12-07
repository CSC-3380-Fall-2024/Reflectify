from rest_framework.routers import SimpleRouter
from core.account.viewsets import AccountViewSet
from core.authorization.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from core.habittracker.viewsets import HabitViewSet
from core.moodtracker.viewsets import MoodQuestionViewSet, MoodResponseViewSet, MoodLogViewSet
from core.journal.viewsets import JournalEntryViewSet
routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/token/refresh', RefreshViewSet, basename='auth-token-refresh')

# USER
routes.register(r'user', AccountViewSet, basename='user')

#APP FUNCTIONALITIES
routes.register(r'journal', JournalEntryViewSet, basename='journalentry')

routes.register(r'habittracker', HabitViewSet, basename ='habitlog')

routes.register(r'moodtracker', MoodQuestionViewSet, basename = 'moodquestion')
routes.register(r'moodtracker', MoodResponseViewSet, basename = 'moodresponse')
routes.register(r'moodtracker', MoodLogViewSet, basename = 'moodlog')

urlpatterns = [
    *routes.urls
]