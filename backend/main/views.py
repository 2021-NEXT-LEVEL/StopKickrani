from django.shortcuts import render
from .models import Video

# Create your views here.
def video_view(request):
    videos = Video.objects.all()
    return render(request, 'main/index.html', {"videos": videos})