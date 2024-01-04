from flask_socketio import SocketIO,emit,join_room, leave_room, send
import sys
from flask import Blueprint

socketio = SocketIO()

@socketio.on('connect', namespace='/')
def connect():
    print('someone connected to websocket!')

@socketio.on('join_room')
def on_join(data):
    current_user = data['current_user']
    room = data['room']
    join_room(room)
    print("hi===============================================================================================")
    send(current_user + ' has entered the room.', to=room)

@socketio.on('leave_room')
def on_leave(data):
    room = data['room']
    leave_room(room)
    print('Left room')
    
@socketio.on('send_message')
def send_message(data):
    room = data['room']
    print(room)
    emit('receive_message', data, to=room)  # data = {'message': "....", 'room':"....", 'sender':...,'currentTime':...}