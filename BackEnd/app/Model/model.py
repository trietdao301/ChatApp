from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class House(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(400))
    price = db.Column(db.Float)
    address = db.Column(db.String(400))
    def __repr__(self):
        return '<ID {} - name {} - price {}>'.format(self.id, self.description, self.price)

