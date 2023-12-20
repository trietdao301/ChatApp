from __future__ import print_function
import sys
from flask import Blueprint
from flask import render_template, flash, redirect, url_for, request, jsonify
from config import Config
from app.Model.model import House
from app import db


bp_routes = Blueprint('routes', __name__)



@bp_routes.route('/', methods=['GET'])
@bp_routes.route('/index', methods=['GET'])
def index():
    data = House.query.all()
    houses_list = [{'id': house.id, 'address': house.address, 'price': house.price} for house in data]
    return {'products': houses_list}


