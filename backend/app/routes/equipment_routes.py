from flask import Blueprint, request, jsonify
from app import db
from app.models.models import Equipment, User
from flask_jwt_extended import jwt_required, get_jwt_identity

equipment_bp = Blueprint('equipment_bp', __name__)

def is_admin(user_id):
    user = User.query.get(user_id)
    return user and user.role == 'admin'

@equipment_bp.route('/', methods=['GET'])
def list_equipment():
    items = Equipment.query.all()
    result = []
    for e in items:
        result.append({
            "id": e.id,
            "name": e.name,
            "category": e.category,
            "quantity": e.quantity,
            "available_quantity": e.available_quantity,
            "description": e.description
        })
    return jsonify(result)

@equipment_bp.route('/<int:item_id>', methods=['GET'])
def get_equipment(item_id):
    e = Equipment.query.get_or_404(item_id)
    return jsonify({
        "id": e.id,
        "name": e.name,
        "category": e.category,
        "quantity": e.quantity,
        "available_quantity": e.available_quantity,
        "description": e.description
    })

@equipment_bp.route('/', methods=['POST'])
@jwt_required()
def create_equipment():
    current_user = get_jwt_identity()
    current_user = int(current_user)
    if not is_admin(current_user):
        return jsonify({"msg": "Admin privilege required"}), 403

    data = request.get_json() or {}
    name = data.get('name')
    if not name:
        return jsonify({"msg": "name is required"}), 400

    category = data.get('category')
    quantity = int(data.get('quantity', 1))
    description = data.get('description')

    e = Equipment(name=name, category=category, quantity=quantity, available_quantity=quantity, description=description)
    db.session.add(e)
    db.session.commit()

    return jsonify({"msg": "Equipment created", "id": e.id}), 201

@equipment_bp.route('/<int:item_id>', methods=['PUT', 'PATCH'])
@jwt_required()
def update_equipment(item_id):
    current_user = get_jwt_identity()
    current_user = int(current_user)
    if not is_admin(current_user):
        return jsonify({"msg": "Admin privilege required"}), 403

    e = Equipment.query.get_or_404(item_id)
    data = request.get_json() or {}
    if 'name' in data: e.name = data['name']
    if 'category' in data: e.category = data['category']
    if 'quantity' in data:
        new_q = int(data['quantity'])
        # Adjust available_quantity conservatively
        diff = new_q - e.quantity
        e.quantity = new_q
        e.available_quantity = max(0, e.available_quantity + diff)
    if 'available_quantity' in data:
        e.available_quantity = int(data['available_quantity'])
    if 'description' in data:
        e.description = data['description']

    db.session.commit()
    return jsonify({"msg": "Equipment updated"})

@equipment_bp.route('/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_equipment(item_id):
    current_user = get_jwt_identity()
    current_user = int(current_user)
    if not is_admin(current_user):
        return jsonify({"msg": "Admin privilege required"}), 403

    e = Equipment.query.get_or_404(item_id)
    db.session.delete(e)
    db.session.commit()
    return jsonify({"msg": "Equipment deleted"})

