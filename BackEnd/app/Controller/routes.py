from __future__ import print_function
import sys
from flask import Blueprint
from flask import render_template, flash, redirect, url_for, request, jsonify
from config import Config
from app.Model.model import Product

from app import db

bp_routes = Blueprint('routes', __name__)



@bp_routes.route('/', methods=['GET'])
@bp_routes.route('/index', methods=['GET'])
def index():
    data = Product.query.all()
    # Convert the data to a list of dictionaries
    product_list = []
    for product in data:
        product_dict = {
            'id': product.id,
            'name': product.name,
            'price': product.price
            # Add other columns as needed
        }
        product_list.append(product_dict)

    # Return the data as JSON
    return jsonify(products=product_list)



