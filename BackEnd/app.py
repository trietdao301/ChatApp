from app import create_app, db
from app.Model.model import Product
from flask_cors import CORS
from scrapper_selenium import scrap

app = create_app()
CORS(app)


@app.before_request
def initDB(*args, **kwargs):
    if app.got_first_request:
        with app.app_context():
            db.create_all()
        if Product.query.count() == 0:
            ebay_data = scrap()
            for item in ebay_data:
                if item is not None:
                    # Extract data from the dictionary
                    name = list(item.keys())[0]
                    price = list(item.values())[0]

                    # Create a new Product instance
                    new_item = Product(name=name, price=price)
                   
                    db.session.add(new_item)
            db.session.commit()

if __name__ == "__main__":
    app.run(host='0.0.0.0')