# myapp/admin.py

from django.contrib import admin
from .models import User, Task, Hospital, UserRequest

class TaskAdmin(admin.ModelAdmin):
    def delete_model(self, request, obj):
        user = obj.user
        obj.delete()  # Delete the task
        user.update_cash()  # Update the user's cash after task deletion

class UserRequestAdmin(admin.ModelAdmin):
    list_display = ['user', 'status']
    list_filter = ['status']
    search_fields = ['user__username']
    actions = ['approve_requests', 'reject_requests']

    def approve_requests(self, request, queryset):
        queryset.update(status='approved')

    def reject_requests(self, request, queryset):
        queryset.update(status='rejected')

admin.site.register(UserRequest, UserRequestAdmin)
admin.site.register(User)
admin.site.register(Task, TaskAdmin)
admin.site.register(Hospital)