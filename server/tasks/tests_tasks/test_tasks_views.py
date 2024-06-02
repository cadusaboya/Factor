from rest_framework.test import APIClient
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from tasks.models import Task, Transaction
from accounts.models import User


class TasksViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username="testuser", 
                                         email="teste@gmail.com", 
                                         fullname="Test User", 
                                         cash=100.00, 
                                         cpf="12345678901", 
                                         telefone="1234567890")
        self.user.set_password('12345')

        self.task = Task.objects.create(name="Test Task",
                                        user=self.user,
                                        value=100)
        
        self.transaction = Transaction.objects.create(date="2021-01-01",
                                                      user=self.user,
                                                      task=self.task,
                                                      antecipado=100,
                                                      recebido=94)


        self.client.force_authenticate(user=self.user)

    def test_user_tasks(self):
        response = self.client.get(reverse('user_tasks'))
        self.assertContains(response, "Test Task")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_tasks(self):
        response = self.client.post(reverse('update_tasks'), {'tasks': [self.task.id]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertTrue(self.task.is_completed)

    def test_user_transactions(self):
        response = self.client.get(reverse('transactions'))
        self.assertContains(response, "2021-01-01")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_transaction(self):
        data = {'date': "2021-01-01",
                'user': self.user,
                'task': self.task.id,
                'antecipado': 100,
                'recebido': 94}
        response = self.client.post(reverse('transactions'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)