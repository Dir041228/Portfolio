from django.db import models

# --- PROJECT ---
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tools_used = models.CharField(max_length=200)
    github_link = models.URLField(blank=True)  # optional

    def __str__(self):
        return self.title  # shows title in admin panel


# --- SKILL ---
class Skill(models.Model):
    LEVEL_CHOICES = [
        ('beginner',     'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced',     'Advanced'),
    ]

    technical_skills = models.CharField(max_length=100)
    level            = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner')

    def __str__(self):
        return f"{self.technical_skills} - {self.get_level_display()}"

# --- EDUCATION ---
class Education(models.Model):
    LEVEL_CHOICES = [
        ('elementary', 'Elementary'),
        ('junior_high', 'Junior High School'),
        ('senior_high', 'Senior High School'),
        ('college', 'College'),
    ]

    level        = models.CharField(max_length=50, choices=LEVEL_CHOICES)
    school       = models.CharField(max_length=200)
    degree       = models.CharField(max_length=200, blank=True)
    year_started = models.CharField(max_length=10)   # e.g. "2012"
    year_graduated = models.CharField(max_length=20, blank=True)  # blank if currently enrolled

    is_current   = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.get_level_display()} - {self.school}"
# --- CONTACT ---
class Contact(models.Model):
    email = models.EmailField()
    github = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    def __str__(self):
        return self.email

class Info(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    birth_date = models.DateField()

    def __str__(self):
        return self.name