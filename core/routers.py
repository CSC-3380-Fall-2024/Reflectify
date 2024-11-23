from rest_framework.routers import SimpleRouter
from core.account.viewsets import AccountViewSet
from core.authorization.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from core.habittracker.viewsets import HabitViewSet
from core.journal.viewsets import JournalEntryViewSet
routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', AccountViewSet, basename='user')

#APP FUNCTIONALITIES
routes.register(r'journal', JournalEntryViewSet, basename='journalentry')

routes.register(r'habittracker', HabitViewSet, basename ='habitlog')

urlpatterns = [
    *routes.urls
]