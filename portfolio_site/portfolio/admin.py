from django.contrib import admin
from .models import Project, Skill, Education, Contact, Info

# Register your models here.
admin.site.register(Project)
admin.site.register(Skill)
admin.site.register(Education)
admin.site.register(Contact)
admin.site.register(Info)
