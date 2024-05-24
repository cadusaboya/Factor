# myapp/admin.py

from django.contrib import admin
from .models import User, Task, Hospital

class TaskAdmin(admin.ModelAdmin):
    def delete_model(self, request, obj):
        user = obj.user
        obj.delete()  # Delete the task
        user.update_cash()  # Update the user's cash after task deletion

admin.site.register(User)
admin.site.register(Task, TaskAdmin)
admin.site.register(Hospital)