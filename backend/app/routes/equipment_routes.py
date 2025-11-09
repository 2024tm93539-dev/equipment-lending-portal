from flask import Blueprint, jsonify

equipment_bp = Blueprint('equipment_bp', __name__)

@equipment_bp.route('/', methods=['GET'])
def get_equipment():
    return jsonify({"message": "Equipment routes working!"})

