from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Booking

booking_bp = Blueprint("booking_bp", __name__)

@booking_bp.route("/bookings", methods=['GET'])
@jwt_required()
def get_bookings():
    """
    Retrieve all bookings for the authenticated user.
    """
    # Get the current user's identity from the JWT token
    current_user_id = get_jwt_identity()

    # Query bookings associated with the current user
    bookings = Booking.query.filter_by(user_id=current_user_id).all()

    # Serialize the bookings and return the response
    return jsonify([booking.serialize() for booking in bookings]), 200
