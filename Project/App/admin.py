from django.contrib import admin
from .models import User, RideRequest, Member, Admin, Activity
# Register your models here.

admin.site.register(User)
admin.site.register(RideRequest)
admin.site.register(Member)
admin.site.register(Admin)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('action', 'user', 'description', 'timestamp')
    list_filter = ('action', 'timestamp')
    search_fields = ('description', 'user__username', 'user__email')
    ordering = ('-timestamp',)
