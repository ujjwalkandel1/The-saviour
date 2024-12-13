from django.contrib import admin
from .models import RegisterNumber,TimeInterval,ViewNumber,DeletedNumber

admin.site.register(RegisterNumber)
admin.site.register(TimeInterval)
admin.site.register(ViewNumber)
admin.site.register(DeletedNumber)

