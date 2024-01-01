from app import create_app, db,socketio
from app.Model.model import House, User
from flask_cors import CORS
from flask_socketio import SocketIO, emit
#from scrapper_selenium import scrap_ebay,scrap_amazon
import jwt


app = create_app()
CORS(app)
keyword = "shoe"


@app.before_request
def initDB(*args, **kwargs):
    if app.got_first_request:
        with app.app_context():
            db.create_all()
        if House.query.count() == 0:
            house_object_1 = House(description= "4 by 4 house",price= "100", address = "SanFracis Co")
            house_object_2 = House(description= "Upper Deck house",price= "23", address = "New York 211th Ave")
            house_object_3 = House(description= "description 3",price= "50", address = "Liberlty 12")
            db.session.add(house_object_1)
            db.session.add(house_object_2)
            db.session.add(house_object_3)
            db.session.commit()
        
        if User.query.count() == 0:
            user_object_1 = User(username="john", email="john@gmail.com")
            user_object_1.set_password("123")
            db.session.add(user_object_1)
            
            user_object_2 = User(username="kim", email="kim@gmail.com")
            user_object_2.set_password("123")
            db.session.add(user_object_2)
            
            user_object_3 = User(username="kyle", email="kyle@gmail.com")
            user_object_3.set_password("123")
            db.session.add(user_object_3)
            
            user_object_4 = User(username="triet", email="triet@gmail.com")
            user_object_4.set_password("123")
            db.session.add(user_object_4)
            
            user_object_5 = User(username="kelly", email="kelly@gmail.com")
            user_object_5.set_password("123")
            db.session.add(user_object_5)
            
            user_object_1.add_friend(user_object_2)
            user_object_1.add_friend(user_object_3)
            user_object_1.add_friend(user_object_4)
            user_object_1.add_friend(user_object_5)
            user_object_2.add_friend(user_object_1)
            
            db.session.commit()
        # if Product.query.count() == 0:
        #     ebay_data = scrap_ebay(keyword)
        #     if (ebay_data is None):
        #         print("ebay data is None")
        #     for item in ebay_data:
        #         if item is not None:
        #             # Extract data from the dictionary
        #             name = list(item.keys())[0]
        #             price = list(item.values())[0]

        #             # Create a new Product instance
        #             new_item = Product(name=name, price=price)
        #             db.session.add(new_item)
                    
        #     amazon_data = scrap_amazon(keyword)
        #     for item in amazon_data:
        #         if item is not None:
        #             # Extract data from the dictionary
        #             name = list(item.keys())[0]
        #             price = list(item.values())[0]

        #             # Create a new Product instance
        #             new_item = Product(name=name, price=price)
        #             db.session.add(new_item)
                    
        #     db.session.commit()

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', debug=True)
