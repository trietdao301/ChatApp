from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash



    
class House(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    description = db.Column(db.String(400))
    price = db.Column(db.Float)
    address = db.Column(db.String(400))
    def __repr__(self):
        return '<ID {} - name {} - price {}>'.format(self.id, self.description, self.price)

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), unique = True)
    password_hash = db.Column(db.String(100))
    email = db.Column(db.String(150),unique = True)
    house = db.relationship('House')    # many to one relationship to House 
    
    def set_password(self, password):
        self.password_hash= generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    
    
