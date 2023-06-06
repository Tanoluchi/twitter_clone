from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . models import Notification
from . serializers import NotificationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notification(request):
    user = request.user
    notifications = Notification.objects.filter(to_user=user, is_read=True)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notification_no_read(request):
    user = request.user
    notifications = Notification.objects.filter(to_user=user, is_read=False)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def notification_read(request):
    user = request.user
    notifications = Notification.objects.filter(to_user=user, is_read=False)
    for notification in notifications:
        notification.is_read = True
        notification.save()
    return Response({ 'message': 'Leido'})
