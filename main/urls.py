from django.conf.urls import url
from .views import IndexView, TemplateView

urlpatterns = [
    url(r'^$', IndexView.as_view(), name='view'),
    url(r'^about-me/', TemplateView.as_view(template_name='main/about_me.html')),
]
