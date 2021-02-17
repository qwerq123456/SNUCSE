from django.conf.urls import url
from blog import views

urlpatterns = [
    url('signup/', views.signup),
    url('token/', views.token),
    url('signin/', views.signin),
    url('signout/', views.signout),
    url('article/', views.article_list),
    url('article/<int:id>/',views.article_detail),
    url('article/<int:id>/comment/',views.comment_list),
    url('article/comment/<int:id>/',views.comment_detail)
]
