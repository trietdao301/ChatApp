from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class Product(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), unique = True, index =True)
    price = db.Column(db.Float)
    def __repr__(self):
        return '<ID {} - name {} - price {}>'.format(self.id, self.name, self.price)
