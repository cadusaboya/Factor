from django.contrib import admin
from .models import Task, Transaction
from accounts.services import user_cash

class TaskAdmin(admin.ModelAdmin):
    def delete_model(self, request, obj):
        user = obj.user
        obj.delete()  # Delete the task
        user_cash(user)

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

admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Task, TaskAdmin)