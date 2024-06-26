# myapp/admin.py

from django.contrib import admin
from .models import User, Hospital, UserRequest, UserDeleteRequest

class UserRequestAdmin(admin.ModelAdmin):
    list_display = ['user', 'status']
    list_filter = ['status']
    search_fields = ['user__username']
    actions = ['approve_requests', 'reject_requests']

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

    def approve_requests(self, request, queryset):
        for obj in queryset:
            obj.status = 'approved'
            obj.save()

    def reject_requests(self, request, queryset):
        for obj in queryset:
            obj.status = 'rejected'
            obj.save()

    approve_requests.short_description = 'Approve selected requests'
    reject_requests.short_description = 'Reject selected requests'



admin.site.register(UserRequest, UserRequestAdmin)
admin.site.register(UserDeleteRequest)
admin.site.register(User)
admin.site.register(Hospital)