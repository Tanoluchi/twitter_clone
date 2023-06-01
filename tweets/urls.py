from django.urls import path
from . import views

urlpatterns = [
    path('', views.TweetList.as_view()),
    path('my/<str:username>/', views.get_user_tweets),
    path('like/<int:pk>/', views.like),
    path('<int:pk>/', views.TweetDetail.as_view()),
]
