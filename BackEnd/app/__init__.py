from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from app.Controller.event import socketio

db = SQLAlchemy()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    # blueprint registration

    from app.Controller.routes import bp_routes as routes    # Solve Not Found Issue
    app.register_blueprint(routes)                           # Solve Not Found Issue
    from app.Controller.auth_routes import bp_auth as auth
    app.register_blueprint(auth)
    
    
    socketio.init_app(app,cors_allowed_origins="*",  engineio_logger=True)
  
    if not app.debug and not app.testing:
        pass
    
    return app

