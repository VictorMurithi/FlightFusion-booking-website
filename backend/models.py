from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(30), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)  
    password = db.Column(db.String(450), nullable=False)
    bookings = relationship("Booking", back_populates="user")
    flights = relationship("FlightPassenger", back_populates="user")

    def set_password(self, password):
        self.password = password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    booking_datetime = db.Column(db.DateTime, nullable=False)
    departure_datetime = db.Column(db.DateTime, nullable=False)

    user = relationship("User", back_populates="bookings")
    flight = relationship("Flight", back_populates="bookings")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'flight_id': self.flight_id,
            'booking_datetime': self.booking_datetime.strftime('%Y-%m-%d %H:%M:%S'),
            'departure_datetime': self.departure_datetime.strftime('%Y-%m-%d %H:%M:%S')
        }

class Flight(db.Model, SerializerMixin):
    __tablename__ = 'flights'

    id = db.Column(db.Integer, primary_key=True)
    airline = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    departure_datetime = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    departure_airport_id = db.Column(db.Integer, db.ForeignKey('airports.id'), nullable=False)
    arrival_airport_id = db.Column(db.Integer, db.ForeignKey('airports.id'), nullable=False)

    departure_airport = relationship("Airport", foreign_keys=[departure_airport_id], backref="departures")
    arrival_airport = relationship("Airport", foreign_keys=[arrival_airport_id], backref="arrivals")

    bookings = relationship("Booking", back_populates="flight")
    passengers = relationship("FlightPassenger", back_populates="flight")

class Airport(db.Model, SerializerMixin):
    __tablename__ = 'airports'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)

class FlightPassenger(db.Model, SerializerMixin):
    __tablename__ = 'flight_passengers'

    id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seat_number = db.Column(db.String(100), nullable=False)

    flight = relationship("Flight", back_populates="passengers")  
    user = relationship("User", back_populates="flights")
