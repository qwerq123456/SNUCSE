from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login,authenticate,logout
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Article, Comment
import json
from json import JSONDecodeError

def signup(request):
    if request.method =='GET':
        return HttpResponse(status=405)
    if request.method =='PUT':
        return HttpResponse(status=405)
    if request.method =='DELETE':
        return HttpResponse(status=405)
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']
    User.objects.create_user(username=username, password=password)
    return HttpResponse(status=201)


def signin(request):
    if request.method =='GET':
        return HttpResponse(status=405)
    if request.method =='PUT':
        return HttpResponse(status=405)
    if request.method =='DELETE':
        return HttpResponse(status=405)
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)

def signout(request):
    if request.method =='POST':
        return HttpResponse(status=405)
    if request.method =='PUT':
        return HttpResponse(status=405)
    if request.method =='DELETE':
        return HttpResponse(status=405)
    
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)

def article_list(request):
    if request.method =='PUT':
        return HttpResponse(status=405)
    if request.method =='DELETE':
        return HttpResponse(status=405)
    

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        article_all_list = [article for article in Article.objects.all().values()]
        return JsonResponse(article_all_list, safe=False)

    else:
        req_data = json.loads(request.body.decode())
        article_title = req_data['title']
        article_content = req_data['content']
        article_author = request.user

        article = Article(title=article_title, content=article_content, author=article_author)
        article.save()
        response_dict = {'title': article.title, 'content': article.content}
        return JsonResponse(response_dict, status=201)

def article_detail(request, id=0):
    if request.method == 'POST':
        return HttpResponse(status=405)

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    article = Article.objects.filter(id=id)

    if request.method == 'GET':
        return JsonResponse(article, safe=False)

    elif request.method == 'PUT':
        body = request.body.decode()
        article = Article.objects.get(id=id)
        article_title = json.loads(body)['title']
        article_content = json.loads(body)['content']
        article_author = json.loads(body)['author']
        article = Article(id=id, title=article_title, content=article_content, author=article_author)
        article.save()
        return JsonResponse(article, status=200)

    else:
        article.delete()
        return HttpResponse(status=200)

def comment_list(request, id=0):
    if request.method == 'PUT':
        return HttpResponse(status=405)
    if request.method == 'DELETE':
        return HttpResponse(status=405)
    

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        comment_all_list = [comment for comment in Comment.objects.all().values()]
        return JsonResponse(comment_all_list, safe=False)

    else:
        req_data = json.loads(request.body.decode())

        comment_article = req_data['article']
        comment_content = req_data['content']
        comment_author = request.user
        comment = Comment(article=comment_article, content=comment_content, author=comment_author)
        comment.save()
        response_dict = { 'article': comment_article, 'content': comment_content}
        return JsonResponse(response_dict, status=201)

def comment_detail(request, id=0):
    if request.method == 'POST':
        return HttpResponse(status=405)

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    comment = Comment.objects.filter(id=id)

    if request.method == 'GET':
        return JsonResponse(comment, safe=False)

    elif request.method == 'PUT':
        body = request.body.decode()
        comment_article = json.loads(body)['article']
        comment_content = json.loads(body)['content']
        comment_author = json.loads(body)['author']
        comment = Comment(id=id, article=comment_article, content=comment_content, author=comment_author)
        comment.save()
        return JsonResponse(comment, status=200)

    else:
        comment.delete()
        return HttpResponse(status=200)

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
