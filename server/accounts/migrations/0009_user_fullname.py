# Generated by Django 5.0.6 on 2024-05-24 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_userrequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='fullname',
            field=models.CharField(default='Carlos Eduardo Petrola Saboya', max_length=255),
            preserve_default=False,
        ),
    ]
