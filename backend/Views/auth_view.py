from models import db, User
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

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
            return jsonify({"msg": "User not found"}), 404

        if user.password != password:
            return jsonify({"msg": "Invalid email or password"}), 401

        access_token = create_access_token(identity=user.id)

        response_data = {
            "message": "Login successful",
            "access_token": access_token
        }
        return jsonify(response_data), 200

    except Exception as e:
        db.session.rollback()
        print(f"An error occurred: {str(e)}")
        return jsonify({"msg": "An error occurred while processing your request"}), 500
