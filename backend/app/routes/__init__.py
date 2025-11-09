from flask import Blueprint

def register_routes(app):
    from .user_routes import user_bp
    from .equipment_routes import equipment_bp
    from .request_routes import request_bp

    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(equipment_bp, url_prefix="/api/equipment")
    app.register_blueprint(request_bp, url_prefix="/api/requests")

