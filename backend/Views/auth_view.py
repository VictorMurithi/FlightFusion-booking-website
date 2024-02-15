from flask import Blueprint, request, jsonify, make_response, current_app
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or 'username' not in data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({'error': 'Missing required fields'}), 400)

    username = data['username']
    email = data['email']
    password = data['password']

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return make_response(jsonify({'error': 'Username already exists'}), 400)

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return make_response(jsonify({'error': 'Email already exists'}), 400)

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return make_response(jsonify({'message': 'User registered successfully'}), 201)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return make_response(jsonify({'error': 'Missing required fields'}), 400)

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return make_response(jsonify({'error': 'Invalid username or password'}), 401)

    login_user(user)

    return make_response(jsonify({'message': 'Logged in successfully'}), 200)

@auth_bp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return make_response(jsonify({'message': 'Logged out successfully'}), 200)

@auth_bp.route('/user', methods=['GET'])
@login_required
def get_current_user():
    user = current_user
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
    }
    return jsonify(user_data)