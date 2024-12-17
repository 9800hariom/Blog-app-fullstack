from django.contrib import admin
from .models import Category, Blog

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name",)
    ordering = ("name",)  # Order categories by name

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "published_date", "is_published")  # Display relevant fields
    search_fields = ("title", "author")  # Enable search by title and author
    list_filter = ("is_published", "category")  # Add filters for published status and category
    ordering = ("-published_date",)  # Order blogs by published date descending
