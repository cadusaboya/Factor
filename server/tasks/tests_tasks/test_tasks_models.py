from django.test import TestCase
from tasks.models import Task, Transaction
from accounts.models import User

class ModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="test_user", 
                                        fullname="Test User", 
                                        cash=100.00, 
                                        cpf="12345678901", 
                                        telefone="1234567890")
        
        self.task = Task.objects.create(name="Test Task",
                                        user=self.user,
                                        value=100)
    
    def test_task_creation(self):
        self.assertTrue(Task.objects.filter(name="Test Task").exists())
    
    def test_transaction_creation(self):
        self.transaction = Transaction.objects.create(date="2021-01-01", 
                                                      antecipado=100, 
                                                      recebido=100, 
                                                      task=self.task,
                                                      user=self.user)
        
        self.assertTrue(Transaction.objects.filter(task=self.task).exists())
