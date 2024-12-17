from django.contrib import admin
from django.urls import path, include  # Include is necessary for app routes
from rest_framework.routers import DefaultRouter
from Home.views import CategoryViewSet, BlogViewSet  # Replace `your_app_name` with your actual app name

# Create a router for the API
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'blogs', BlogViewSet, basename='blog')

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site
    path('api/', include(router.urls)),  # Include API routes with a prefix like `/api/`
]
