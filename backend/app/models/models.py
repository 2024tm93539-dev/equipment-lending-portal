from datetime import datetime
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='student')

    def __repr__(self):
        return f"<User {self.name}>"

class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))
    quantity = db.Column(db.Integer, default=1)
    available_quantity = db.Column(db.Integer, default=1)
    description = db.Column(db.String(255))

    def __repr__(self):
        return f"<Equipment {self.name}>"

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    equipment_id = db.Column(db.Integer, db.ForeignKey('equipment.id'))
    status = db.Column(db.String(20), default='requested')
    request_date = db.Column(db.DateTime, default=datetime.utcnow)
    return_date = db.Column(db.DateTime, nullable=True)

    user = db.relationship('User', backref='requests')
    equipment = db.relationship('Equipment', backref='requests')

    def __repr__(self):
        return f"<Request {self.id}>"

