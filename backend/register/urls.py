from django.urls import path
from register import views
#from register.views import RefreshTokenView

urlpatterns = [
    path('login/',views.custom_login, name="login"),
    path('register/',views.register, name = "register"),
    #path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
]