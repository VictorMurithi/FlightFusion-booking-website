from models import db, Airport
from flask import Blueprint, jsonify

airport_bp = Blueprint("airport_bp", __name__)

@airport_bp.route('/airports')
def get_airports():
    airports = Airport.query.all()
    if airports:
        airports_data = [
            {
                "id": airport.id,
                "name": airport.name,
                "city": airport.city,
                "country": airport.country
            }
            for airport in airports
        ]
        return jsonify(airports_data), 200
    else:
        return jsonify({"message": "No airports found"}), 404

@airport_bp.route('/airports/<int:airport_id>')
def get_airport_details(airport_id):
    airport = Airport.query.get(airport_id)
    if airport:
        airport_data = {
            "id": airport.id,
            "name": airport.name,
            "city": airport.city,
            "country": airport.country
        }
        return jsonify(airport_data), 200
    else:
        return jsonify({"message": "Airport not found"}), 404
