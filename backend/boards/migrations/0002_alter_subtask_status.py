# Generated by Django 5.0.4 on 2024-05-09 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subtask',
            name='status',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
