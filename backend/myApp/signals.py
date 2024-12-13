from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import RegisterNumber, ViewNumber

@receiver(post_delete, sender=RegisterNumber)
def delete_view_number(sender, instance, **kwargs):
    ViewNumber.objects.filter(
        user=instance.user,
        name=instance.name,
        phone_number=instance.phone_number
    ).delete()
