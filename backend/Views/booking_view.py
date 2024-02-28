from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Booking, Flight
from datetime import datetime

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


    # delete_bookings

@booking_bp.route('/bookings/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def cancel_booking(booking_id):
    user_id = get_jwt_identity()  # current user

    booking = Booking.query.get(booking_id)

    if booking is None:
        return jsonify({"error": "Booking not found"}), 404

    if booking.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(booking)
    db.session.commit()

    return jsonify({"success": "Booking canceled successfully"}), 200    

@booking_bp.route('/bookings/add', methods=['POST'])
@jwt_required()  # Require JWT token for authentication
def add_flight_to_booking():
    data = request.json

    if not data or 'flight_id' not in data:
        return jsonify({"message": "Flight ID is required in the request body."}), 400

    flight_id = data['flight_id']

    # Retrieve the flight by its ID
    flight = Flight.query.get(flight_id)

    if not flight:
        return jsonify({"message": "Flight not found."}), 404

    # Get current user ID from JWT token
    current_user_id = get_jwt_identity()

    # Create a new booking with the flight information
    new_booking = Booking(
        user_id=current_user_id,
        flight_id=flight.id,
        departure_datetime=flight.departure_datetime.date(),
        booking_datetime=datetime.utcnow(), 
    )

    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"message": "Flight added to bookings successfully."}), 200
