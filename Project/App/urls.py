from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # /auth/google/
    path('google/', views.google_auth, name='google-auth'),  
    # /auth/google/callback/        
    path('google/callback/', views.google_callback, name='google-callback'),  

    path('logout_user', views.logout_user, name='logout_user'),
    path('logout_member', views.logout_member, name='logout_member'),
    path('logout_admin', views.logout_admin, name='logout_admin'),

    # User's URLs

    path('', views.index, name='index'),
    path('index', views.index, name='index'),
    path('user_signin', views.user_signIn, name='user_signIn'),
    path('user_signUp', views.user_signUp, name='user_signUp'),
    path('dashboard', views.user_Main, name='dashboard'),
    path('contact', views.contact, name='contact'),
    path('upload-avatar/', views.upload_avatar, name='upload_avatar'),
    path('book-ride', views.book_ride, name='book_ride'),
        # UserReset Password URLs
    path('generate_otp', views.generate_otp, name='generate_otp'),
    path('verify_otp', views.verify_otp, name='verify_otp'),
    path('reset_password', views.reset_password, name='reset_password'),

    path('emergency', views.emergency, name='emergency'),

    # Member's URLs

    path('member_Signup', views.member_Signup, name='member_Signup'),
    path('index02', views.index02, name='index02'),
    path('member_mainpanel', views.member_mainpanel, name='member_mainpanel'),
    path('member_VehicleDetails', views.member_VehicleDetails, name='member_VehicleDetails'),
    path("accept_ride/<int:ride_id>/", views.accept_ride, name="accept_ride"),
    path("decline_ride/<int:ride_id>/", views.decline_ride, name="decline_ride"),

    path('send_ride_otp/<int:ride_id>/', views.send_ride_otp, name='send_ride_otp'),
    path('verify_ride_otp/<int:ride_id>/', views.verify_ride_otp, name='verify_ride_otp'),
        # Member Reset Password URLs
    path('member_get_otp', views.member_get_otp, name='member_get_otp'),
    path('member_verify_otp', views.member_verify_otp, name='member_verify_otp'),
    path('member_reset_password', views.member_reset_password, name='member_reset_password'),

    # Admin's URLs

    path('index03', views.index03, name='index03'), 
    path('admin_SignUp', views.admin_SignUp, name='admin_SignUp'),
    path('admin_panel', views.admin_panel, name='admin_panel'),
    path('delete_member/<int:m_id>/', views.delete_member, name='delete_member'),
    path('add_member', views.add_member, name='add_member'),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
