from flask_socketio import SocketIO,emit
import sys
from flask import Blueprint

socketio = SocketIO()

@socketio.on('connect', namespace='/devices')
def test_connect2():
    print('someone connected to websocket!')
    emit('responseMessage', {'data': 'Connected devices! ayy'})