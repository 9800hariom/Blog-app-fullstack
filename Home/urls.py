from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BlogViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'blogs', BlogViewSet, basename='blog')

urlpatterns = [
    # Include the router's URLs
    *router.urls,
]
