from django.db.models.query import QuerySet
from django.shortcuts import redirect, render
from rest_framework import generics
from django.http import JsonResponse
from rest_framework.response import Response
from django.http import HttpResponse

from .models import Video, DetectResult
from .serializers import VideoSerializer, ResultSerializer

import datetime
import detect

location_dicts = {
            0:"동국대학교 팔정도",
            1:"동국대학교 상록원",
            2:"동국대학교 신공학관 9층",
            3:"동국대학교 본관 앞"
        }


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
        
        # detect_result 에 log 없을 시 yolo 실행
        if len(row) == 0:
            detect.main(url_date, url_loc)
        else:
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