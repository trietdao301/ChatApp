from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)


    db.init_app(app)

    # blueprint registration

    from app.Controller.routes import bp_routes as routes    # Solve Not Found Issue
    app.register_blueprint(routes)                           # Solve Not Found Issue

    if not app.debug and not app.testing:
        pass
     

    return app