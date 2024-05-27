from accounts.models import User

def update_user_cash(user):
    tasks = user.projects.filter(is_completed=False)  # Assuming a related name 'tasks' for reverse relationship
    total_cash = sum(task.value for task in tasks)  # Example of summing task values
    user.cash = total_cash
    user.save()
    return total_cash