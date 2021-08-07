from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListVideo.as_view()),
    path('<int:pk>/', views.ListResult.as_view()),
]