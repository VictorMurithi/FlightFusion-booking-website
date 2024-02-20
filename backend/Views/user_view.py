from models import db
from flask import Blueprint, jsonify, request
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

#delete user
@user_bp.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity() 
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        response = jsonify({"success": "User deleted successfully"}), 200
    else:
        response = jsonify({"error": "User does not exist"}), 404

    return response
#update user details
@user_bp.route('/user', methods=['PATCH'])
@jwt_required()
def update_user_details():
    user_id = get_jwt_identity()  
    user = User.query.filter_by(id=user_id).first()

    if user:
        data = request.get_json()

        name = data.get('name', user.name)  
        email = data.get('email', user.email)  
        phone = data.get('phone', user.phone)  

        user.name = name.title()

        # Check if the provided email is different from the current email
        if email != user.email:
            check_email = User.query.filter_by(email=email).first()
            if check_email:
                return jsonify({"error": f"The email: {email} already exists"}), 404
            user.email = email

        # Check if the provided phone is different from the current phone
        if phone != user.phone:
            check_phone = User.query.filter_by(phone=phone).first()
            if check_phone:
                return jsonify({"error": f"The phone: {phone} already exists"}), 404
            user.phone = phone

        # Update the user
        db.session.commit()
        return jsonify({"success": "User updated successfully"}), 200

    else:
        return jsonify({"error": "User not found"}), 404
