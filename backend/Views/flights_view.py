from models import db, Flight
from flask import Blueprint, jsonify

flights_bp = Blueprint("flights_bp", __name__)

@flights_bp.route('/flights')
def get_flights():
    flights = Flight.query.all()
    if flights:
        flights_data = [
            {
                "id": flight.id,
                "airline": flight.airline,
                "flight_class": flight.flight_class,
                "destination": flight.destination,
                "arrival_time": flight.arrival_time,
                "departure_time": flight.departure_time,
                "price": flight.price,
                "departure_airport_id": flight.departure_airport_id,
                "arrival_airport_id": flight.arrival_airport_id
            }
            for flight in flights
        ]
        return jsonify(flights_data), 200
    else:
        return jsonify({"message": "No flights found"}), 404

@flights_bp.route('/flights/<int:flight_id>')
def get_flight_details(flight_id):
    flight = Flight.query.get(flight_id)
    if flight:
        flight_data = {
            "id": flight.id,
            "airline": flight.airline,
            "flight_class": flight.flight_class,
            "destination": flight.destination,
            "arrival_time": flight.arrival_time,
            "departure_time": flight.departure_time,
            "price": flight.price,
            "departure_airport_id": flight.departure_airport_id,
            "arrival_airport_id": flight.arrival_airport_id
        }
        return jsonify(flight_data), 200
    else:
        return jsonify({"message": "Flight not found"}), 404
