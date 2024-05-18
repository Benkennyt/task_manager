from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
import uuid



class CustomUser(AbstractUser, models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile_pic = models.ImageField(default='blankProfile.png', null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)


# class Profile(models.Model):
#     user = models.OneToOneField(get_user_model(), null)



