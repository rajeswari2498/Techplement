# Generated by Django 3.2.14 on 2024-07-01 16:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quotes', '0002_userdata'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserData',
        ),
    ]
