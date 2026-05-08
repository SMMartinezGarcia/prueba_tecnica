from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# El router crea todas las rutas automáticamente
router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = router.urls