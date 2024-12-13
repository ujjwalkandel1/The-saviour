from django.shortcuts import render
from sos.models import SOSMessage
# View to render the dashboard
def admin_dashboard(request):
    return render(request, 'admin_panel/index.html')

def sos_dashboard(request):
    sos_messages = SOSMessage.objects.all()
    return render(request, 'admin_panel/index.html', {'posts': sos_messages})