from models import db, User
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, unset_jwt_cookies, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"msg": "Request body is missing or invalid"}), 400
        
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"msg": "Email or password is missing"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "Invalid credentials"}), 401

        if not check_password_hash(user.password, password):
            return jsonify({"msg": "Invalid credentials"}), 401

        access_token = create_access_token(identity=user.id, expires_delta=False)  # Set expires_delta to False for token to not expire

        response_data = {
            "message": "Login successful",
            "access_token": access_token
        }
        return jsonify(response_data), 200

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"msg": "An error occurred while processing your request"}), 500


@auth_bp.route("/signup", methods=['POST'])
def signup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"msg": "Request body is missing or invalid"}), 400
        
        username = data.get("username")
        email = data.get("email")
        phone = data.get("phone")
        password = data.get("password")

        if not username or not email or not phone or not password:
            return jsonify({"msg": "Username, email, phone, password"}), 400

        if len(phone) != 10:
            return jsonify({"msg": "Phone number must be 10 digits long"}), 400
            
        if User.query.filter_by(email=email).first():
            return jsonify({"msg": "User with this email already exists"}), 409

        new_user = User(username=username, email=email, phone=phone)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.id, expires_delta=False)  # Set expires_delta to False for token to not expire

        response_data = {
            "message": "User registered successfully",
            "access_token": access_token
        }
        return jsonify(response_data), 201

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"msg": "An error occurred while processing your request"}), 500
    
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"success": "Logged out successfully!"})
    unset_jwt_cookies(response)  # Clear JWT cookie
    return response, 201

@auth_bp.route("/forgot_password", methods=["POST"])
def forgot_password():
    new_password = request.json.get('new_password')
    email = request.json.get('email')

    if not new_password or not email:
        return jsonify({"error": "Both email and new password are required in the request body"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    hashed_password = generate_password_hash(new_password)
    user.password = hashed_password
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200
