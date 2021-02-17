from django.utils import timezone 
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Article(models.Model):
    objects = models.Manager()
    title = models.CharField(max_length=64)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)#user 넣는거 검색해보기

#title char 64
#content text field
#author Foreign Key
class Comment(models.Model):
    objects = models.Manager()
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
#article Foreign Key
#content text field
#author Foreign Key