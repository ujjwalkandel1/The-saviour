import json
from channels.generic.websocket import AsyncWebsocketConsumer

class SOSConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept the WebSocket connection
        await self.accept()

    async def disconnect(self, close_code):
        # Handle disconnection if needed
        pass

    async def receive(self, text_data):
        # Receive a message from WebSocket and broadcast to the admin dashboard
        message_data = json.loads(text_data)
        message = message_data['message']
        latitude = message_data['latitude']
        longitude = message_data['longitude']
        user_id = message_data['user_id']

        # Broadcast to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'latitude': latitude,
            'longitude': longitude,
            'user_id': user_id,
        }))
