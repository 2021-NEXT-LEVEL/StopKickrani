from django.db import models

# Create your models here.
class Video(models.Model):
    url = models.CharField(max_length=1000)
    date = models.DateField()
    location = models.CharField(max_length=100)

    class Meta:
        #managed = False
        db_table = 'video'

class DetectResult(models.Model):
    rid = models.AutoField(primary_key=True)
    log = models.TimeField()
    value = models.CharField(max_length=45)
    date = models.DateField()
    location = models.CharField(max_length=100)

    class Meta:
        #managed = False
        db_table = 'detect_result'