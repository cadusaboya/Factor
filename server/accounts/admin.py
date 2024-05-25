# myapp/admin.py

from django.contrib import admin
from .models import User, Task, Hospital, UserRequest, Transaction

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

class TransactionAdmin(admin.ModelAdmin):
    list_display = ['task', 'status']  # Display task instead of transaction
    list_filter = ['status']
    search_fields = ['task__name']  # Search by task name
    actions = ['approve_requests', 'reject_requests', 'paid_requests']

    def approve_requests(self, request, queryset):
        queryset.update(status='Aprovado')

    def reject_requests(self, request, queryset):
        queryset.update(status='Recusado')

    def paid_requests(self, request, queryset):
        queryset.update(status='Recebido')

admin.site.register(UserRequest, UserRequestAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(User)
admin.site.register(Task, TaskAdmin)
admin.site.register(Hospital)