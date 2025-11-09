from flask import Blueprint, request, jsonify
from app import db
from app.models.models import Request as BorrowRequest, Equipment, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

request_bp = Blueprint('request_bp', __name__)

def is_admin(user_id):
    user = User.query.get(user_id)
    return user and user.role == 'admin'

# Student: Create a borrow request
@request_bp.route('/', methods=['POST'])
@jwt_required()
def create_request():
    current_user = int(get_jwt_identity())
    data = request.get_json() or {}
    equipment_id = data.get('equipment_id')

    if not equipment_id:
        return jsonify({"msg": "equipment_id is required"}), 400

    equipment = Equipment.query.get(equipment_id)
    if not equipment:
        return jsonify({"msg": "Equipment not found"}), 404

    if equipment.available_quantity < 1:
        return jsonify({"msg": "Equipment not available"}), 400

    borrow_request = BorrowRequest(user_id=current_user, equipment_id=equipment_id, status='requested')
    db.session.add(borrow_request)
    db.session.commit()

    return jsonify({"msg": "Request created", "id": borrow_request.id}), 201


# Admin: Approve or reject
@request_bp.route('/<int:request_id>/status', methods=['PUT'])
@jwt_required()
def update_request_status(request_id):
    current_user = int(get_jwt_identity())
    if not is_admin(current_user):
        return jsonify({"msg": "Admin privilege required"}), 403

    data = request.get_json() or {}
    status = data.get('status')
    if status not in ['approved', 'rejected']:
        return jsonify({"msg": "Status must be 'approved' or 'rejected'"}), 400

    borrow_request = BorrowRequest.query.get_or_404(request_id)
    equipment = Equipment.query.get(borrow_request.equipment_id)

    if status == 'approved':
        if equipment.available_quantity < 1:
            return jsonify({"msg": "No units left"}), 400
        equipment.available_quantity -= 1
    elif status == 'rejected' and borrow_request.status == 'approved':
        equipment.available_quantity += 1

    borrow_request.status = status
    db.session.commit()
    return jsonify({"msg": f"Request {status}"})


# Student: Return borrowed equipment
@request_bp.route('/<int:request_id>/return', methods=['PUT'])
@jwt_required()
def return_equipment(request_id):
    current_user = int(get_jwt_identity())
    borrow_request = BorrowRequest.query.get_or_404(request_id)

    if borrow_request.user_id != current_user:
        return jsonify({"msg": "Not your request"}), 403
    if borrow_request.status != 'approved':
        return jsonify({"msg": "Cannot return unless approved"}), 400

    borrow_request.status = 'returned'
    borrow_request.return_date = datetime.utcnow()

    equipment = Equipment.query.get(borrow_request.equipment_id)
    equipment.available_quantity += 1

    db.session.commit()
    return jsonify({"msg": "Equipment returned"})


# View all requests (admin)
@request_bp.route('/all', methods=['GET'])
@jwt_required()
def list_all_requests():
    current_user = int(get_jwt_identity())
    if not is_admin(current_user):
        return jsonify({"msg": "Admin privilege required"}), 403

    requests = BorrowRequest.query.all()
    return jsonify([
        {
            "id": r.id,
            "user_id": r.user_id,
            "equipment_id": r.equipment_id,
            "status": r.status,
            "request_date": r.request_date.isoformat(),
            "return_date": r.return_date.isoformat() if r.return_date else None
        } for r in requests
    ])


# View user’s own requests
@request_bp.route('/my', methods=['GET'])
@jwt_required()
def list_my_requests():
    current_user = int(get_jwt_identity())
    requests = BorrowRequest.query.filter_by(user_id=current_user).all()
    return jsonify([
        {
            "id": r.id,
            "equipment_id": r.equipment_id,
            "status": r.status,
            "request_date": r.request_date.isoformat(),
            "return_date": r.return_date.isoformat() if r.return_date else None
        } for r in requests
    ])

