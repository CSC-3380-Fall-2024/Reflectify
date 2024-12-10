from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.account.viewsets import AccountViewSet
from core.authorization.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet

router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'login', LoginViewSet, basename='login')
router.register(r'register', RegistrationViewSet, basename='register')
router.register(r'refresh', RefreshViewSet, basename='refresh')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(('core.routers', 'core'), namespace='core-api')),
]
