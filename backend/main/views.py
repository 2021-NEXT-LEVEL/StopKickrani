from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics
from django.http import JsonResponse
from rest_framework.response import Response

from .models import Video, DetectResult
from .serializers import VideoSerializer, ResultSerializer

import datetime
import pandas

location_dicts = {
            0:"충무로역 1번출구",
            1:"충무로역 2번출구",
            2:"동국대학교 명진관 앞"
        }


# Create your views here.
class ListVideo(generics.ListCreateAPIView):
    videos = Video.objects.all()
    serializer_class = VideoSerializer
    queryset = Video.objects.all()


class VideoURL(generics.ListCreateAPIView):
    videos = Video.objects.all()
    serializer_class = VideoSerializer
    
    def get_queryset(self):
        url_date = self.kwargs['date']
        url_loc = self.kwargs['loc']
        convert_date = datetime.datetime.strptime(url_date, "%Y%m%d").date()

        return Video.objects.filter(date = convert_date, location = location_dicts[url_loc])


class detailVideo(generics.ListCreateAPIView):
    results = DetectResult.objects.all()
    serializer_class = ResultSerializer

    def get_queryset(self):
        url_date = self.kwargs['date']
        url_loc = self.kwargs['loc']
        convert_date = datetime.datetime.strptime(url_date, "%Y%m%d").date()

        row = DetectResult.objects.filter(date = convert_date, location = location_dicts[url_loc])

        return row.order_by('log')


class graphInfo(generics.ListCreateAPIView):
    results = DetectResult.objects.all()
    serializer_class = ResultSerializer

    def get_queryset(self):
        url_date = self.kwargs['date']
        url_loc = self.kwargs['loc']
        convert_date = datetime.datetime.strptime(url_date, "%Y%m%d").date()

        return DetectResult.objects.filter(date = convert_date, location = location_dicts[url_loc])
    

    
class statisticsInfo(generics.ListCreateAPIView):
    results = DetectResult.objects.all()
    serializer_class = ResultSerializer

    def get_queryset(self):
        url_date = self.kwargs['date']
        getYear = url_date[0:4]
        getMonth = url_date[4:6]

        return DetectResult.objects.filter(date__year=getYear, date__month=getMonth)