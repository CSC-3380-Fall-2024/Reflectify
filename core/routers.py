from rest_framework.routers import SimpleRouter
from core.account.viewsets import AccountViewSet
from core.authorization.viewsets import LoginViewSet, RegisterViewSet, RefreshViewSet
from core.journal.viewsets import JournalEntryViewSet
routes = SimpleRouter()

routes.register(r'authorization/login', LoginViewSet, basename = 'authorization-login')
routes.register(r'authorization/register', RegisterViewSet, basename= 'authorization-register')
routes.register(r'authorization/refresh', RefreshViewSet, basename = 'authorization-refresh' )

routes.register(r'user', AccountViewSet, basename = 'user')
routes.register(r'journal', JournalEntryViewSet, basename='journal-entry')



