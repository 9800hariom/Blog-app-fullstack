

# Create your models here.
from django.db import models



class Category(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically adds a timestamp when created

    def __str__(self):
        return self.name



class Blog(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()  # Fixed typo from 'desciption' to 'description'
    author = models.CharField(max_length=100)
    published_date = models.DateTimeField(auto_now_add=True)  # Renamed 'data' to 'published_date'
    image = models.ImageField(upload_to='blog_images')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="blogs")  # Changed to ForeignKey
    is_published = models.BooleanField(default=False)  # New field to indicate if the blog is published
    updated_at = models.DateTimeField(auto_now=True)  # New field to track updates

    def __str__(self):
        return f"{self.title} by {self.author}"  # Updated string representation