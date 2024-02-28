from models import db
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity,unset_jwt_cookies

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

# Delete user
@user_bp.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        response = jsonify({"success": "User deleted successfully"})
        unset_jwt_cookies(response)
        return response, 200
    else:
        response = jsonify({"error": "User does not exist"})
        return response, 404
    

from flask import request

from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import db, User

@user_bp.route('/user', methods=['PATCH'])
@jwt_required()
def update_user_details():
    user_id = get_jwt_identity()  
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json

    # Validate and sanitize the input data
    username = data.get('username', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()

    # Data validation
    if not username:
        return jsonify({"error": "Name is required"}), 400
    if email :
        return jsonify({"error": "Email is required"}), 400
    if phone and not phone.isdigit() or len(phone) != 10:
        return jsonify({"error": "Phone number must be 10 digits"}), 400

    # Check if the provided email is different from the current email
    if email != user.email:
        check_email = User.query.filter_by(email=email).first()
        if check_email:
            return jsonify({"error": f"The email: {email} already exists"}), 400
        user.email = email

    # Check if the provided phone is different from the current phone
    if phone != user.phone:
        check_phone = User.query.filter_by(phone=phone).first()
        if check_phone:
            return jsonify({"error": f"The phone: {phone} already exists"}), 400
        user.phone = phone

        # Update the user
        db.session.commit()
        return jsonify({"success": "User updated successfully"}), 200

    else:
        return jsonify({"error": "User not found"}), 404

    data = request.json

    # Validate and sanitize the input data
    username = data.get('username', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()

    # Data validation
    if not username:
        return jsonify({"error": "Name is required"}), 400
    if not email:
        return jsonify({"error": "Email is required"}), 400
    if phone and (not phone.isdigit() or len(phone) != 10):
        return jsonify({"error": "Phone number must be 10 digits"}), 400

    # Check if the provided email is different from the current email
    if email != user.email:
        check_email = User.query.filter_by(email=email).first()
        if check_email:
            return jsonify({"error": f"The email: {email} already exists"}), 400
        user.email = email

    # Check if the provided phone is different from the current phone
    if phone != user.phone:
        check_phone = User.query.filter_by(phone=phone).first()
        if check_phone:
            return jsonify({"error": f"The phone: {phone} already exists"}), 400
        user.phone = phone

    # Update the user
    user.username = username
    user.email = email
    user.phone = phone
    db.session.commit()

    return jsonify({"success": "User updated successfully"}), 200
