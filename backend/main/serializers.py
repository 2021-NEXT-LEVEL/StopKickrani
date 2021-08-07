from rest_framework import serializers
from .models import Video, DetectResult

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = (
            'url',
            'date',
            'location',
            'graph',
        )

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetectResult
        fields = (
            'rid',
            'log',
            'class_field',
        )