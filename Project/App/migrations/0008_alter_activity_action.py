# Generated by Django 5.1.7 on 2025-05-03 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0007_activity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='action',
            field=models.CharField(choices=[('user_created', 'User Created'), ('member_created', 'Member Created'), ('message_submitted', 'Message Submitted'), ('member_deleted', 'Member Deleted'), ('user_deleted', 'User Deleted')], max_length=50),
        ),
    ]
