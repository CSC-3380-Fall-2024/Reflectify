from typing import Any, Optional
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, username: str, email: str, password: Optional[str], **kwargs: Any) -> 'User':
        if username is None:
            raise TypeError('Users must have a username!')
        if email is None:
            raise TypeError('Users must have an email!')
        user = self.model(username=username, email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username: str, email: str, password: str) -> 'User':
        if password is None:
            raise TypeError('Admins must have a password!')
        if email is None:
            raise TypeError('Admins must have an email!')
        if username is None:
            raise TypeError('Admins must have a username!')
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username: str = models.CharField(db_index=True, max_length=255, unique=True)
    email: str = models.EmailField(db_index=True, unique=True, default='no-reply@example.com')
    is_active: bool = models.BooleanField(default=True)
    is_staff: bool = models.BooleanField(default=False)

    USERNAME_FIELD: str = 'username'
    REQUIRED_FIELDS: list[str] = []

    objects: UserManager = UserManager()

    def __str__(self) -> str:
        return f"{self.username} ({self.email})"