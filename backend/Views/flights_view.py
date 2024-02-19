from models import db, Flight
from flask import Blueprint, jsonify, request, jsonify

from models import Flight

flights_bp = Blueprint("flights_bp", __name__)


@flights_bp.route('/flights', methods=['POST'])
def filter_flights_by_destination():
    data = request.json

    if not data or 'destination' not in data:
        return jsonify({"message": "Destination is required in the request body."}), 400

    destination = data['destination']

    # Filter flights based on the provided destination
    flights = Flight.query.filter_by(destination=destination).all()

    if flights:
        flights_data = [
            {
                "id": flight.id,
                "airline": flight.airline,
                "destination": flight.destination,
                "departure_datetime": flight.departure_datetime,
                "price": flight.price,
                "departure_airport_id": flight.departure_airport_id,
                "arrival_airport_id": flight.arrival_airport_id
            }
            for flight in flights
        ]
        return jsonify(flights_data), 200
    else:
        return jsonify({"message": f"No flights found for destination '{destination}'"}), 404
