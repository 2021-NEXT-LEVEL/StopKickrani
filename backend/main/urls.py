from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListVideo.as_view()), # return video object in locationPage
    path('video/<int:loc>/<str:date>', views.VideoURL.as_view()), # return videoURL in detailpage
    path('detail/<int:loc>/<str:date>', views.detailVideo.as_view()), # return (log, value) in detailPage
    path('graph/<int:loc>/<str:date>', views.graphInfo.as_view()), # return number of (log, value) in graphPage
    path('statistics/<str:date>', views.statisticsInfo.as_view()) # return (log, value) in statisticsPage
]