from rest_framework.routers import SimpleRouter
from core.account.viewsets import AccountViewSet
from core.authorization.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from core.journal.viewsets import JournalEntryViewSet
routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', AccountViewSet, basename='user')

routes.register(r'journal', JournalEntryViewSet, basename='journalentry')

urlpatterns = [
    *routes.urls
]