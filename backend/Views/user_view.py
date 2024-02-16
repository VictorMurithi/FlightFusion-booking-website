from models import db
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import User

user_bp = Blueprint("user_bp", __name__)

@user_bp.route('/user')
@jwt_required()
def user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify(
            {
                "username" : user.username,
                "email" : user.email,
                "phone" : user.phone
            }
        ), 200
    
    return jsonify({"message": "User not found"}), 404