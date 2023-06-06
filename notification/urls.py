from django.urls import path
from . import views

urlpatterns = [
    path('', views.notification),
    path('no/', views.notification_no_read),
    path('leer/', views.notification_read),
]