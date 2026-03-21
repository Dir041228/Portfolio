from django.shortcuts import render
from .models import Project, Skill, Education, Contact, Info

def home(request):
    projects  = Project.objects.all()
    skills    = Skill.objects.all()
    education = Education.objects.all().order_by('level')  # ordered
    contact   = Contact.objects.first()
    infos = Info.objects.all()
    return render(request, 'portfolio/home.html', {
        'projects':  projects,
        'skills':    skills,
        'education': education,
        'contact':   contact,
        'infos': infos
    })