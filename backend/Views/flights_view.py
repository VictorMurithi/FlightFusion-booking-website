from models import db, Flight
from flask import Blueprint, jsonify, request, jsonify

from models import Flight, Airport

flights_bp = Blueprint("flights_bp", __name__)


@flights_bp.route('/flights', methods=['POST'])
def filter_flights_by_airport_and_destination():
    data = request.json

    if not data or 'airport_name' not in data or 'destination' not in data:
        return jsonify({"message": "Airport name and destination are required in the request body."}), 400

    airport_name = data['airport_name']
    destination = data['destination']

    # Query airport to get the airport ID
    airport = Airport.query.filter_by(name=airport_name).first()

    if not airport:
        return jsonify({"message": f"No airport found with name '{airport_name}'"}), 404

    airport_id = airport.id

    # Filter flights based on the provided airport and destination
    flights = Flight.query.filter_by(departure_airport_id=airport_id, destination=destination).all()

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
        return jsonify({"message": f"No flights found for destination '{destination}' from '{airport_name}'"}), 404
