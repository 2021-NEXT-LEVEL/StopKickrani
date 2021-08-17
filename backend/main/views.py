from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics
from django.http import JsonResponse

from .models import Video, DetectResult
from .serializers import VideoSerializer, ResultSerializer

import datetime
# Create your views here.
class ListVideo(generics.ListCreateAPIView):
    videos = Video.objects.all()
    serializer_class = VideoSerializer
    queryset = Video.objects.all()


class ListResult(generics.ListCreateAPIView):
    results = DetectResult.objects.all()
    serializer_class = ResultSerializer
    queryset = DetectResult.objects.all()

class detailVideo(generics.ListCreateAPIView):
    videos = Video.objects.all()
    serializer_class = VideoSerializer
    queryset = Video.objects.all()

    def get_queryset(self):
        url_date = self.kwargs['date']
        url_loc = self.kwargs['loc']
        convert_date = datetime.datetime.strptime(url_date, "%Y%m%d").date()

        dict = {
            1:"충무로역 1번출구",
            2:"충무로역 2번출구"
        }

        return Video.objects.filter(date = convert_date, location = dict[url_loc])