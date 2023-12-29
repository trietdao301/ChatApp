from __future__ import print_function
import sys
from flask import Blueprint
from flask import render_template, flash, redirect, url_for, request, jsonify
from config import Config
from app.Model.model import House
from app import db
from flask_socketio import SocketIO

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
    



