import random
import requests
from urllib3 import HTTPResponse
from django.urls import reverse
from django.conf import settings
from urllib.parse import urlencode
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import login
from django.core.mail import send_mail
from .models import User, RideRequest, Member, Admin, Activity
from django.contrib.auth import get_user
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.core.files.storage import FileSystemStorage

from django.views.defaults import page_not_found

from django.core.management import call_command
from django.http import HttpResponse
import os

def run_migrations(request):
    if os.environ.get("RENDER") == "true":  # Optional safety check
        call_command('migrate')
        return HttpResponse("Migrations applied!")
    return HttpResponse("Not allowed", status=403)


# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync


# Create your views here.

def logout_user(request):
    request.session.pop('user_id', None)
    request.session.pop('user_email', None)
    return redirect('index')

def logout_member(request):
    request.session.pop('member_id', None)
    request.session.pop('member_email', None)
    return redirect('index02')

def logout_admin(request):
    request.session.pop('admin_id', None)
    request.session.pop('admin_email', None)
    return redirect('index03')

# User's All Logics

def index(request):
    return render(request, 'index.html')

def user_signIn(request):
    
    if request.method == "POST":
        email = request.POST.get("user")
        password = request.POST.get("pass")

        try:
            user = User.objects.get(email=email)
            if user.password == password:
                # Save essential info to session
                request.session['user_id'] = user.id
                request.session['user_email'] = user.email
                request.session['user_name'] = user.full_name
                request.session['user_phone'] = user.phone

                messages.success(request, f"Welcome, {user.full_name}!")
                return redirect('dashboard')  # or your own page
            else:
                messages.error(request, "Incorrect password.")
        except User.DoesNotExist:
            messages.error(request, "User not found.")
    try:
        return render(request, "user_signIn.html")
    except Exception as e:
        return page_not_found(request, exception=e, template_name='404.html')

@csrf_protect
def user_signUp(request):
    if request.method == "POST":
        email = request.POST.get("Email")
        full_name = request.POST.get("Fullname")
        phone = request.POST.get("Ph")
        password = request.POST.get("Password")
        re_password = request.POST.get("RePassword")

        if password != re_password:
            messages.error(request, "Passwords do not match.")
            return redirect("user_signUp")

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect("user_signUp")

        # Optionally hash password here
        user = User.objects.create(
            email=email,
            full_name=full_name,
            phone=phone,
            password=password  # You should hash this in production
        )

        # Log user creation in Activity model
        Activity.objects.create(
            user=user,
            action='user_created',
            description=f"New user registered: {full_name}" 
        )

        print("User created successfully.")

        messages.success(request, "Account created successfully.")
        return redirect("user_signIn")  # Redirect to login or other page
    try:
        return render(request, "user_signUp.html")
    except Exception as e:
        return page_not_found(request, exception=e, template_name='404.html')

def user_Main(request):
    user_id = request.session.get('user_id')

    if user_id:
        try:
            user = User.objects.get(id=user_id)
            return render(request, "user_Main.html", {'user': user})
        except User.DoesNotExist:
            messages.error(request, "Invalid session. Please log in again.")
            return redirect('user_signIn')

    elif request.session.get('Auth_email'):
        user_email = request.session.get('Auth_email')
        user_name = request.session.get('Auth_name')
        user_picture = request.session.get('Auth_picture')

        return render(request, "user_Main.html", {'email': user_email, 'name': user_name, 'picture': user_picture})
    else:
        messages.error(request, "Please log in to continue.")
        return redirect('user_signIn')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('Name')
        email = request.POST.get('Email')
        phone = request.POST.get('Number')
        message = request.POST.get('Message')

        print(name, email)

        # Create a new contact record in the database
        #Contact.objects.create(name=name, email=email, phone=phone, message=message)

        # Email subject and addresses
        subject = "New Contact Form Submission"
        from_email = email
        recipient_list = [settings.EMAIL_HOST_USER]

        # Email context
        context = {
            'Contact_name': name,
            'Contact_email': email,
            'Contact_phone': phone,
            'Contact_message': message
        }

        # Plain text fallback
        text_content = f"""
        Hallo Safe Stapes
        i am {name},
        My email is {email},
        My phone is {phone},
        {message}
        """

        # Load HTML email content
        html_content = render_to_string("contact_email.html", context)

        # Send the email
        email_message = EmailMultiAlternatives(subject, text_content, from_email, recipient_list)
        email_message.attach_alternative(html_content, "text/html")
        email_message.send()

        try:
            msg = User.objects.get(email=email)
        except User.DoesNotExist:
            msg = None

        Activity.objects.create(
            user=msg,
            action='message_submitted',
            description=f"Message submitted by {name} ({email})"
        )

        # channel_layer = get_channel_layer()
        # async_to_sync(channel_layer.group_send)(
        #     "main_updates",
        #     {
        #         "type": "send_update",
        #         "message": "New message!"
        #     }
        # )

        
        messages.success(request, 'Your message has been sent successfully!')
        return redirect('dashboard')
    
    return render(request, 'user_Main.html')

def generate_otp(request):
    if request.method == "POST":
        email = request.POST.get("email")
        
        try:
            user = User.objects.get(email=email)

            # Generate 6-digit OTP
            otp = random.randint(100000, 999999)

            # Store OTP in session
            request.session['otp_created'] = str(otp)
            request.session['otp_email'] = email

            # Send OTP via email
            subject = "Your OTP Code"
            message = f"Dear {user.full_name},\n\nYour OTP code is: {otp}\n\nThank you!"
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]

            send_mail(subject, message, from_email, recipient_list)

            messages.success(request, "OTP has been sent to your email.")
            return render(request, "user_Otp.html", {'email' : email})
        except User.DoesNotExist:
            messages.error(request, "Email not found.")
            return redirect("generate_otp")

    return render(request, "user_GenerateOtp.html")

def verify_otp(request):
    if request.method == "POST":
        otp = request.POST.get("otp")
        email = request.session.get("otp_email")
        original_otp = request.session.get("otp_created")

        if not otp or not email:
            messages.error(request, "Invalid OTP or email.")
            return redirect("generate_otp")

        try:
            user = User.objects.get(email=email)
            if otp == original_otp:
                print("enterd")
                return render(request, 'user_ResetPassword.html', {'email': email})  # or your own page
            else:
                messages.error(request, "Incorrect OTP.")
        except User.DoesNotExist:
            messages.error(request, "User not found.")

    return render(request, "user_Otp.html")

def reset_password(request):
    if request.method == "POST":
        email = request.POST.get("email")
        new_password = request.POST.get("password")
        re_password = request.POST.get("rePassword")

        try:
            if new_password != re_password:
                messages.error(request, "Passwords do not match.")
                return redirect("reset_password")
            
            user = User.objects.get(email=email)
            user.password = new_password
            user.save()

            # For User
            Activity.objects.create(
                user=user,  # reference the logged-in user
                action='user_password_changed',
                description=f"User {user.full_name} changed their password."
            )

            messages.success(request, "Password reset successfully.")
            return redirect("user_signIn")
        except User.DoesNotExist:
            messages.error(request, "User not found.")

    return render(request, "user_ResetPassword.html")

def emergency(request):
    if request.method == "POST":
        message = request.POST.get("message")

        if request.session.get("user_id"):

            user_name = request.session.get("user_name")
            user = User.objects.get(email=request.session.get("user_email"))
        elif request.session.get("Auth_email") : 
            user_name = request.session.get("Auth_name")
            user = None
        else:
            messages.error(request, "User not found.")
            return redirect("user_signIn")
        # Get all rider emails
        rider_emails = Member.objects.values_list('email', flat=True)

        # Send email to all riders
        send_mail(
            subject=f'🚨 Emergency Alert from {user_name}',
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=list(rider_emails),
            fail_silently=False,
        )

        # Log user creation in Activity model
        Activity.objects.create(
            user=user,
            action='emergency_alert',
            description=f"Emergency alert sent by {user_name}" 
        )

        # channel_layer = get_channel_layer()
        # async_to_sync(channel_layer.group_send)(
        #     "main_updates",
        #     {
        #         "type": "send_update",
        #         "message": "Emergency alert sent successfully!"
        #     }
        # )

        messages.success(request, "Emergency alert sent successfully!")
        return redirect("dashboard")

    return render(request, "user_Main.html")

# Pictures/Aveter for Profiles...

def upload_avatar(request):
    if request.method == "POST" and request.FILES.get('avatar'):
        user_id = request.session.get('user_id')
        user = User.objects.get(id=user_id)
        user.avatar = request.FILES['avatar']
        user.save()
        return redirect('dashboard')
    # return redirect('dashboard')
    return HttpResponse("Avatar not uploaded.")

def book_ride(request):
    if request.method == "POST":
        pickup = request.POST.get("pickup")
        dropoff = request.POST.get("dropoff")
        email = request.session.get("user_email")

        # User must be logged in
        if not email:
            messages.error(request, "You must be logged in to book a ride.")
            return redirect("user_signIn")

        # Validate pickup and dropoff inputs
        if not pickup or not dropoff:
            messages.error(request, "Pickup and dropoff locations are required.")
            return redirect("dashboard")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "User not found.")
            return redirect("user_signIn")

        # Save the ride
        ride = RideRequest.objects.create(
            user=user,
            pickup_location=pickup,
            dropoff_location=dropoff
        )

        # Debug logging
        print("Ride Saved:", ride)

        # channel_layer = get_channel_layer()
        # async_to_sync(channel_layer.group_send)(
        #     "main_updates",
        #     {
        #         "type": "send_update",
        #         "message": "New ride booked!"
        #     }
        # )

        # Success feedback
        messages.success(request, "Ride booked successfully!")

        # Store query parameters for later use
        query_string = urlencode({'pickup': pickup, 'dropoff': dropoff})
        request.session['pickup'] = pickup
        request.session['query_string'] = query_string

        # Redirect with GET params
        return redirect(f"{reverse('dashboard')}?{query_string}")

    return render(request, "book_ride.html")

# Member's All Logics 

def member_Signup(request):
    if request.method == "POST":
        email = request.POST.get("email")
        full_name = request.POST.get("name")
        phone = request.POST.get("number")
        password = request.POST.get("password")
        re_password = request.POST.get("rePassword")
        photo = request.FILES.get("photo")

        # Check password match
        if password != re_password:
            messages.error(request, "Passwords do not match.")
            return redirect("member_Signup")

        # Check for existing user
        if Member.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return redirect("member_Signup")

        # Save the profile picture (optional manual step)
        member = Member(
            email=email,
            full_name=full_name,
            phone=phone,
            password=password,  # In production, hash this
            photo=photo
        )
        member.save()

        request.session["member_email"] = member.email

        # after saving a new Member
        Activity.objects.create(
            user=None,
            action='member_created',
            description=f"New member created: {member.full_name}"
        )

        print("success!")

        messages.success(request, "Go to Vehicle Details.")
        return redirect("member_VehicleDetails")  # Change this if needed
    try:
        return render(request, "member_Signup.html") 
    except Exception as e:
        return page_not_found(request, exception=e, template_name='404.html')

def member_VehicleDetails(request):
    if request.method == "POST":
        v_type = request.POST.get("vType")
        v_number = request.POST.get("vNumber")
        v_color = request.POST.get("vColor")

        member_email = request.session.get("member_email")  # Must be set during login or signup

        if not member_email:
            messages.error(request, "Please sign in as a member first.")
            return redirect("member_Signup")

        try:
            member = Member.objects.get(email = member_email)
            member.vehicle_type = v_type
            member.vehicle_number = v_number
            member.vehicle_color = v_color
            member.save() 

            messages.success(request, "Vehicle details added successfully!")
            return redirect("index02")  # Or any page you want
        except Member.DoesNotExist:
            messages.error(request, "Member not found.")
            return redirect("member_Signup")
    try:
        return render(request, "member_VehicleDetails.html") 
    except Exception as e:
        return page_not_found(request, exception=e, template_name='404.html')

def index02(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            member = Member.objects.get(email=email, password=password)
            # Set session
            request.session['member_id'] = member.id
            request.session['member_email'] = member.email
            request.session['member_name'] = member.full_name
            request.session['member_phone'] = member.phone 

            request.session['member_vehicle_type'] = member.vehicle_type
            request.session['member_vehicle_number'] = member.vehicle_number
            request.session['member_vehicle_color'] = member.vehicle_color


            return redirect('member_mainpanel')  # Change this to your actual panel URL name
        except Member.DoesNotExist:
            messages.error(request, 'Invalid email or password')
            return redirect('index02')  # Stay on login page if error

    try:
        return render(request, "index02.html")
    except Exception as e:
        return page_not_found(request, exception=e, template_name='404.html')

def member_mainpanel(request):
    member_id = request.session.get('member_id')

    if not member_id:
        return redirect('index02')  # Redirect to login if not logged in

    member = Member.objects.get(id=member_id)
    ride_requests = RideRequest.objects.filter(status='Pending')  # Or all() if no filter

    try:
        return render(request, 'member_MainPanel.html', {
            'member': member,
            'ride_requests': ride_requests 
        })
    except Exception as e:
        return page_not_found(request, exception=e, template_name='404.html')

def accept_ride(request, ride_id): 
    email = request.session.get("member_email")
    
    print("Email:", email)

    if not email:
        messages.error(request, "You must be logged in to accept rides.")
        return redirect("index02")

    rider = Member.objects.get(email=email)
    ride = RideRequest.objects.get(id=ride_id)

    request.session['get_user'] = ride.user.email

    # Send fancy HTML email
    subject = "Ride Accepted - Safe Stapes"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [request.session.get('get_user')]  # Assuming this field exists; update accordingly
    print(recipient_list)

    context = {
        'user_name': ride.user.full_name,  # Or however the user’s name is stored
        'pickup': ride.pickup_location,
        'dropoff': ride.dropoff_location,
        'rider_name': rider.full_name,
        'contact_number': rider.phone,
        'v_number': rider.vehicle_number,
        'v_type': rider.vehicle_type,
        'v_color': rider.vehicle_color,
    }

    

    
    text_content = f"""
        Hi {ride.user.full_name},

        Your ride from {ride.pickup_location} to {ride.dropoff_location} has been accepted by {rider.full_name}.
        You can contact them at {rider.phone}.
    """
    html_content = render_to_string("ride_accepted_email.html", context)

    email_message = EmailMultiAlternatives(subject, text_content, from_email, recipient_list)
    email_message.attach_alternative(html_content, "text/html")
    email_message.send()

    # Save ride status
    # ride.status = "Accepted"
    # ride.save()

    # # Store accepted ride
    # AcceptedRide.objects.create(ride_request=ride, rider=rider)

    # channel_layer = get_channel_layer()
    # async_to_sync(channel_layer.group_send)(
    #     "main_updates",
    #     {
    #         "type": "send_update",
    #         "message": "New ride accepted!"
    #     }
    # )

    messages.success(request, f"Ride from {ride.pickup_location} to {ride.dropoff_location} accepted!")

    send_ride_otp(request, ride_id)

    return redirect("member_mainpanel")

def decline_ride(request, ride_id):
    email = request.session.get("member_email")
    print("Email:", email)

    if not email:
        messages.error(request, "You must be logged in to decline rides.")
        return redirect("index02")

    rider = Member.objects.get(email=email)
    ride = RideRequest.objects.get(id=ride_id)

    ride.delete()

    subject = "Ride Declined"
    message = f"Your ride from {ride.pickup_location} to {ride.dropoff_location} has been declined!"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list)

    # channel_layer = get_channel_layer()
    # async_to_sync(channel_layer.group_send)(
    #     "main_updates",
    #     {
    #         "type": "send_update",
    #         "message": "New ride declined!"
    #     }
    # )

    # Notify the user (optional: send email)
    messages.success(request, f"Ride from {ride.pickup_location} to {ride.dropoff_location} declined!")
    return redirect("member_mainpanel")

def member_get_otp(request):
    if request.method == "POST":
        email = request.POST.get("m_email")
        
        try:
            member = Member.objects.get(email=email)

            # Generate 6-digit OTP
            otp = random.randint(100000, 999999)

            # Store OTP in session
            request.session['otp_created'] = str(otp)
            request.session['otp_email'] = email

            # Send OTP via email
            subject = "Your OTP Code"
            message = f"Dear {member.full_name},\n\nYour OTP code is: {otp}\n\nThank you!"
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]

            send_mail(subject, message, from_email, recipient_list)

            messages.success(request, "OTP has been sent to your email.")
            return render(request, "member_Otp.html", {'email' : email})
        except Member.DoesNotExist:
            messages.error(request, "Email not found.")
            return redirect("member_get_otp")

    return render(request, "member_Forget.html")

def member_verify_otp(request):
    if request.method == "POST":
        otp = request.POST.get("m_otp")
        email = request.session.get("otp_email")
        original_otp = request.session.get("otp_created")

        if not otp or not email:
            print("invalid", otp, original_otp, email)
            messages.error(request, "Invalid OTP or email.")
            return redirect("member_get_otp")

        try:
            member = Member.objects.get(email=email)
            if otp == original_otp:
                print("enterd")
                return render(request, 'member_ResetPassword.html', {'email': email})  # or your own page
            else:
                messages.error(request, "Incorrect OTP.")
        except Member.DoesNotExist:
            messages.error(request, "User not found.")

    return render(request, "member_Otp.html")

def member_reset_password(request):
    if request.method == "POST":
        email = request.POST.get("email")
        new_password = request.POST.get("password")
        re_password = request.POST.get("rePassword")

        try:
            if new_password != re_password:
                messages.error(request, "Passwords do not match.")
                return redirect("member_reset_password")
            
            member = Member.objects.get(email=email)
            member.password = new_password
            member.save()

            # For Member (if using a separate Member model)
            Activity.objects.create(
                user=member,
                action='member_password_changed',
                description=f"Member {member.full_name} changed their password."
            )

            messages.success(request, "Password reset successfully.")
            return redirect("index02")
        except Member.DoesNotExist:
            messages.error(request, "User not found.")

    return render(request, "member_ResetPassword.html")

def send_ride_otp(request, ride_id):
    print("hi")
    ride = RideRequest.objects.get(id=ride_id)
    otp = str(random.randint(100000, 999999)) 

    email = request.session.get('get_user')
    print("OTP for Accept ride:", email)

    # Store OTP in session
    request.session[f"ride_otp_{ride_id}"] = otp
    request.session.modified = True

    # Prepare email content
    subject = 'Ride Verification OTP'
    from_email = settings.EMAIL_HOST_USER
    to_email = [email]

    text_content = f"""
        Your One-Time Password (OTP) for ride verification is: {otp}
    """
    html_content = render_to_string('ride_otp.html', {'otp': otp, 'user': ride.user})

    # Send email with both plain text and HTML
    email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    email.attach_alternative(html_content, "text/html")
    email.send()

    # return JsonResponse({'status': 'OTP sent'})

@csrf_exempt
def verify_ride_otp(request, ride_id):
    if request.method == 'POST':
        user_otp = request.POST.get('otp')
        ride = RideRequest.objects.get(id=ride_id)
        stored_otp = request.session.get(f"ride_otp_{ride_id}")

        if stored_otp and user_otp == stored_otp:
            # ride.otp_verified = True
            # ride.dropoff = ride.final_dropoff  # Update destination
            # ride.save()

            # Remove OTP from session
            del request.session[f"ride_otp_{ride_id}"]

            return JsonResponse({'status': 'verified'})
        else:
            return JsonResponse({'status': 'failed', 'message': 'Invalid OTP'})

# Open Authentication with Google for Users only...

def google_auth(request):
    # Step 1: Redirect to Google's OAuth screen
    auth_url = (
        f"https://accounts.google.com/o/oauth2/auth?"
        f"client_id={settings.GOOGLE_CLIENT_ID}&"
        f"redirect_uri={settings.GOOGLE_REDIRECT_URI}&"
        f"scope=email%20profile&"  # %20 for space encoding
        f"response_type=code"
    )
    return redirect(auth_url)

def google_callback(request):
    # Step 1: Get the authorization code from Google
    code = request.GET.get('code')
    if not code:
        return redirect('/')  # or show an error page

    # Step 2: Exchange the code for an access token
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        'code': code,
        'client_id': settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'redirect_uri': settings.GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code',
    }
    response = requests.post(token_url, data=data).json()
    access_token = response.get('access_token')

    if not access_token:
        return redirect('/')  # failed to get token

    # Step 3: Get user info from Google
    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={'Authorization': f'Bearer {access_token}'}
    ).json()

    # Step 4: Create or get user in Django
    UserModel = get_user_model()
    user, _ = UserModel.objects.get_or_create(
        email=user_info['email'],
        # defaults={'username': user_info.get('email', '').split('@')[0]}
    ) 

    # Step 5: Log the user in
    user.backend = 'django.contrib.auth.backends.ModelBackend'
    login(request, user)

    # Optional: customize username if you store full name elsewhere
    # if User.objects.filter(email=user.email).exists():
    #     user_1 = User.objects.get(email=user.email)
    #     if hasattr(user_1, 'full_name'):
    #         first_name = user_1.full_name.split()[0]
    #         user.username = first_name
    #         user.save()

    # Step 6: Store session data and render user info
    request.session['user'] = user.username
    request.session['email'] = user.email
    request.session['Auth_name'] = user_info.get('name')
    request.session['Auth_email'] = user_info.get('email')
    request.session['Auth_picture'] = user_info.get('picture')

    return redirect('dashboard')

    # return render(request, 'user_Main.html', {
    #     'name': user_info.get('name'),
    #     'email': user_info.get('email'),
    #     'picture': user_info.get('picture'),
    # })

# Admin's All Logic

def index03(request):
    if request.method == 'POST':
        email = request.POST.get('Admin_email')
        password = request.POST.get('Admin_password')

        try:
            admin = Admin.objects.get(email=email)

            if password == admin.password:
                # Store session variables
                request.session['admin_id'] = admin.id
                request.session['admin_email'] = admin.email
                request.session['admin_name'] = admin.full_name

                messages.success(request, "Sign-in successful.")
                return redirect('admin_panel')  # Replace with your actual dashboard view
            else:
                messages.error(request, "Incorrect password.")
        except Admin.DoesNotExist:
            messages.error(request, "Admin with this email does not exist.")

    return render(request, 'index03.html')

def admin_SignUp(request):
    if request.method == 'POST':
        email = request.POST.get('Admin_email')
        full_name = request.POST.get('Admin_full_name')
        password = request.POST.get('Admin_password')
        re_password = request.POST.get('Admin_rePassword')
        photo = request.FILES.get('Admin_photo')

        # Check if passwords match
        if password != re_password:
            messages.error(request, "Passwords do not match!")
            return render(request, 'admin_SignUp.html')

        # Check if email already exists
        if Admin.objects.filter(email=email).exists():
            messages.error(request, "An account with this email already exists.")
            return render(request, 'admin_SignUp.html')

        if Admin.objects.count() > 5: return HTTPResponse("Signup No Longer Available!")

        # Save the new Admin
        new_admin = Admin(email=email, full_name=full_name, password=password, photo=photo)
        new_admin.save()

        messages.success(request, "Registration successful. You can now sign in.")
        return redirect('index03')  # Assuming this is your login page

    return render(request, 'admin_SignUp.html')

def admin_panel(request):
    admin_id = request.session.get('admin_id')

    if not admin_id:
        return redirect('index03')  # Redirect to login if not logged in

    admin = Admin.objects.get(id=admin_id)
    members = Member.objects.all()
    # Fetch the latest 5 activities from the Activity table
    recent_activities = Activity.objects.all()[:5]

    message_activities = Activity.objects.filter(action='message_submitted')

     # Try to fetch last sent locations from session store
    user_location = request.session.get('user_location', None)
    member_location = request.session.get('member_location', None)

    return render(request, 'admin_Panel.html', {
        'members': members,
        'admin': admin,
        'members_count': Member.objects.count(), 
        'users_count': User.objects.count(), 
        'recent_activities': recent_activities,
        'message_activities': message_activities,
        'user_location': user_location,
        'member_location': member_location
    })

def delete_member(request, m_id):
    m = Member.objects.get(id=m_id)
    print(m)
    # Log the deletion
    Activity.objects.create(
        user=None,  # no linked user object
        action='member_deleted',
        description=f"Member deleted: {m.full_name}"
    )

    # channel_layer = get_channel_layer()
    # async_to_sync(channel_layer.group_send)(
    #     "main_updates",
    #     {
    #         "type": "send_update",
    #         "message": "New member deleted!"
    #     }
    # )
    m.delete()
    return redirect('admin_panel')

def add_member(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        full_name = request.POST.get('full_name')
        phone = request.POST.get('phone')
        photo = request.FILES.get('photo')
        password = request.POST.get('password')
        re_password = request.POST.get('re_password')

        # Check if passwords match
        if password != re_password:
            messages.error(request, "Passwords do not match!")
            return render(request, 'admin_Panel.html')

        # Check if email already exists
        if Member.objects.filter(email=email).exists():
            messages.error(request, "An account with this email already exists.")
            return render(request, 'admin_Panel.html')

        # Save the new Member
        new_member = Member(email=email, full_name=full_name, phone=phone, photo=photo, password=password)
        new_member.save()

        # after saving a new Member
        Activity.objects.create(
            user=None,
            action='member_created',
            description=f"New member created: {new_member.full_name}"
        )

        # channel_layer = get_channel_layer()
        # async_to_sync(channel_layer.group_send)(
        #     "main_updates",
        #     {
        #         "type": "send_update",
        #         "message": "New member created!"
        #     }
        # )

        messages.success(request, "Member added successfully.")
        return redirect('admin_panel')
    
    return render(request, 'admin_Panel.html')

