from __future__ import print_function
import sys
from flask import Blueprint, jsonify,render_template, flash, redirect, url_for,request
from config import Config
from app import db
from app.Model.model import User
from flask_login import login_user, current_user,logout_user,login_required
from flask_cors import CORS
import jwt
import os


bp_auth = Blueprint('auth', __name__)
CORS(bp_auth)
access_token_secret = os.environ.get("ACCESS_TOKEN_SECRET")

def get_user_by_username(username):
    existed_user = User.query.filter_by(username = username).first()
    return existed_user

def check_if_user_is_valid(username, password):
    user = get_user_by_username(username)
    if user:
        return user.check_password(password)
    elif user is None:
        return False
    


@bp_auth.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        if get_user_by_username(username) is None:       # input data is valid
            new_user = User(username=username, email=data.get('email'))
            new_user.set_password(data.get('password'))
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': 'User registered successfully'}), 201  # HTTP status code for Created
        else:
            return jsonify({'error': 'Username already exists'}), 400  # HTTP status code for Bad Request
    except Exception as e:
            return jsonify({'error': f'Error during registration: {str(e)}'}), 500  # HTTP status code for Internal Server Error
        
@bp_auth.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        if check_if_user_is_valid(username,password) == True:
            jwtToken = jwt.encode({"name": username}, access_token_secret, algorithm="HS256").decode('utf-8')  # create jwt token
            return jsonify({'accessToken': jwtToken}), 201
        else:
            return jsonify({'error': 'Invalid inputs'}), 400 
    except Exception as e:
        return jsonify({'error': f'Error during login: {str(e)}'}), 500
    
@bp_auth.route('/verify_token', methods=['POST'])
def verify_token():
    token = request.get_json()
    if token:                
        data = jwt.decode(token, access_token_secret, algorithms=["HS256"])
        if data is not None:
            return jsonify(data), 201
        else:
            return jsonify({'error': 'account is not authorized.'}), 403
    else:
        return jsonify({'error': 'Token is empty'}), 500 
    
@bp_auth.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return "<div>hello</div>"