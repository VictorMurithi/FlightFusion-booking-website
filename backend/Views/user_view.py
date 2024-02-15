from flask_restful import Api, Resource
from psycopg2 import apilevel
from models import db, User
from flask import Blueprint, request, session, jsonify, Response
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash


user_bp = Blueprint("user_bp", __name__)
 

class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)

        if user:
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }

            return jsonify(user_data)

        return {"message": "User not found"}, 404

    def put(self, user_id):
        data = request.get_json()

        if not data:
            return {"message": "No data provided"}, 400

        try:
            username = data.get("username")
            email = data.get("email")
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            password = data.get("password")

            if password:
                hashed_password = generate_password_hash(password)
                User.query.filter_by(id=user_id).update({'password': hashed_password})

            User.query.filter_by(id=user_id).update({
                'username': username,
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
            })

            db.session.commit()

            return {"message": "User updated successfully"}, 200

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500


class AuthResource(Resource):
    def post(self):
        data = request.get_json()

        if not data:
            return {"message": "No data provided"}, 400

        try:
            username = data.get("username")
            password = data.get("password")

            user = User.query.filter_by(username=username).first()

            if not user or not check_password_hash(user.password, password):
                return {"message": "Invalid username or password"}, 401

            session['user_id'] = user.id

            return {"message": "User authenticated successfully"}, 200

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500


apilevel.add_resource(UserResource, '/api/users/<int:user_id>')
Api.add_resource(AuthResource, '/api/auth')