from flask import Blueprint, request, jsonify
from app import db
from app.models.models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'student')

    if not name or not email or not password:
        return jsonify({"msg": "name, email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User with this email already exists"}), 400

    pw_hash = generate_password_hash(password)
    user = User(name=name, email=email, password_hash=pw_hash, role=role)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created", "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role}}), 201

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    # create token with user id as identity
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token, "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role}})

