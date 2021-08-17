from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListVideo.as_view()),
    path('detail/<int:loc>/<str:date>', views.detailVideo.as_view()),
]