from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, static_folder=None)
    app.config.from_mapping(
        SECRET_KEY='dev-secret',
        SQLALCHEMY_DATABASE_URI='sqlite:///data.db',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        JWT_SECRET_KEY='jwt-secret'
    )

    db.init_app(app)
    jwt.init_app(app)

    from app.routes import register_routes
    register_routes(app)

    return app

