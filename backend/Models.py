from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(30), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)  
    password_hash = db.Column(db.String(450), nullable=False)
    bookings = relationship("Booking", back_populates="user")
    flights = relationship("FlightPassenger", back_populates="user")

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    booking_datetime = db.Column(db.DateTime, nullable=False)
    departure_datetime = db.Column(db.DateTime, nullable=False)

    user = relationship("User", back_populates="bookings")
    flight = relationship("Flight", back_populates="bookings")

class Flight(db.Model, SerializerMixin):
    __tablename__ = 'flights'

    id = db.Column(db.Integer, primary_key=True)
    airline = db.Column(db.String(100), nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)

    bookings = relationship("Booking", back_populates="flight")
    passengers = relationship("FlightPassenger", back_populates="flight")

class FlightPassenger(db.Model, SerializerMixin):
    __tablename__ = 'flight_passengers'

    id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    flight = relationship("Flight", backref=backref("passengers", cascade="all, delete-orphan"))
    user = relationship("User", backref=backref("flights", cascade="all, delete-orphan"))
