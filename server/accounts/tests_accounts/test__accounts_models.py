from django.test import TestCase
from accounts.models import User, Hospital, UserRequest

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="test_user", 
                                        fullname="Test User", 
                                        cash=100.00, 
                                        cpf="12345678901", 
                                        telefone="1234567890")

    def test_user_creation(self):
        self.assertTrue(User.objects.filter(username="test_user").exists())

class HospitalModelTest(TestCase):
    def setUp(self):
        self.hospital = Hospital.objects.create(name="Test Hospital", address="123 Test St", phone_number="1234567890")

    def test_hospital_creation(self):
        self.assertTrue(Hospital.objects.filter(name="Test Hospital").exists())

class UserRequestModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="test_user", fullname="Test User", cash=100.00, cpf="12345678901", telefone="1234567890")
        self.hospital = Hospital.objects.create(name="Test Hospital", address="123 Test St", phone_number="1234567890")
        self.user_request = UserRequest.objects.create(user=self.user, status="pending")
        self.user_request.hospitals.add(self.hospital)

    def test_user_request_creation(self):
        self.assertTrue(UserRequest.objects.filter(user=self.user).exists())