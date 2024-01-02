from __future__ import print_function
import sys
from flask import Blueprint
from flask import render_template, flash, redirect, url_for, request, jsonify
from config import Config
from app.Model.model import House, User, ChatHistory, Message
from app import db


bp_routes = Blueprint('routes', __name__)

@bp_routes.route('/', methods=['GET'])
@bp_routes.route('/index', methods=['GET'])
def index():
    data = House.query.all()
    houses_list = [{'id': house.id, 'address': house.address, 'price': house.price} for house in data]
    return houses_list

@bp_routes.route('/api/create_house', methods=['POST'])
def create_house():
    data = request.get_json()
    try:
        if data:
            new_item = House(address = data.get('address'), price = data.get('price'))
            db.session.add(new_item)
            db.session.commit()
            return jsonify({'message': 'House created successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error creating house: {str(e)}'}), 500
    
@bp_routes.route('/api/list_friend/<string:name>', methods=['GET'])
def list_friend(name):
    if name is not None:
        current_user = User.query.filter_by(username=name).first()
        friends = [friend.username for friend in current_user.friends]
        return jsonify({current_user.username: friends}), 201
    else:
        return jsonify({'error': f'Error listing friend: {str(e)}'}), 500
    
def add_new_message(chatHistory,message,sender,sender_time):
    new_message = Message(message=message, sender=sender, sender_time=sender_time)
    db.session.add(new_message)
    chatHistory.messages.append(new_message)
    print('new message')
    db.session.commit()

def check_identical_message(message_one, message_two):
    for key in message_one.keys():
        print(key + 'here')
        if message_one[key] != message_two[key]:
            return False
    return True

@bp_routes.route('/api/update/chat', methods=['POST'])
def update_chat():
    data = request.get_json()               #data = { message ,sender,senderTime,room}
    if data:
        print(data)
        message = data.get('message')    
        sender = data.get('sender')    
        room = data.get('room')  
        sender_time = data.get('senderTime')    
    
        chatHistory = ChatHistory.query.filter_by(room=room).first()
        if chatHistory is not None:
            add_new_message(chatHistory,message,sender,sender_time)
        return jsonify({}), 201
            
@bp_routes.route('/api/load/chat/<string:room_name>', methods=['GET'])
def load_chat(room_name):
    chat_history = ChatHistory.query.filter_by(room=room_name).first()
    if chat_history is None:
        new_chat_history = ChatHistory(room=room_name)
        db.session.add(new_chat_history)
        db.session.commit()
        return jsonify([]),201
    elif chat_history is not None:
        all_messages = []
        print(chat_history.room)
        if len(chat_history.messages) > 0:                 
            for item in chat_history.messages:
                all_messages.append({'message': item.message,'sender': item.sender, 'senderTime': item.sender_time})
        return jsonify(all_messages), 201

