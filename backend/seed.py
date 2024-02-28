import requests
from app import app, db
from models import User, Booking, Flight, Airport, FlightPassenger
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta
from decimal import Decimal
from faker import Faker
import random

def cleanup():
    """Delete all existing data from the tables."""
    db.session.query(User).delete()
    db.session.query(Booking).delete()
    db.session.query(Flight).delete()
    db.session.query(Airport).delete()
    db.session.query(FlightPassenger).delete()
    db.session.commit()

def get_airports():
    """Fetch real airport data from OpenFlights dataset."""
    response = requests.get("https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat")
    airports = response.text.split("\n")
    airport_data = []
    for airport in airports:
        data = airport.split(",")
        if len(data) >= 4:
            airport_name = data[1].strip('"')
            airport_city = data[2].strip('"')
            airport_country = data[3].strip('"')
            airport_data.append((airport_name, airport_city, airport_country))
    return airport_data

from datetime import datetime, timedelta

def seed_flights(destination, num_flights, faker):
    """Seed fake flights for a given destination."""
    airport_objects = Airport.query.all()
    for _ in range(num_flights):
        departure_airport = random.choice(airport_objects)
        arrival_airport = random.choice(airport_objects)
        
        # Generate a random flight date without time (only year, month, and day)
        flight_date = faker.date_between(start_date='-1y', end_date='today')
        
        # Set departure_datetime to the beginning of the day (00:00:00)
        departure_datetime = datetime.combine(flight_date, datetime.min.time())
        
        # Generate arrival time by adding random hours to departure datetime
        arrival_time = departure_datetime + timedelta(hours=random.randint(1, 12))
        
        # Generate price
        price = Decimal(faker.random_int(min=100, max=10000))  # Ensuring at least 3 digits

        flight_class = faker.random_element(elements=('first class', 'business class', 'economy class'))

        flight = Flight(
            airline=faker.company(),
            destination=destination,
            departure_datetime=departure_datetime,
            price=price,
            departure_airport=departure_airport,
            arrival_airport=arrival_airport,
        )

        db.session.add(flight)


def seed_users(num_users, faker):
    """Seed fake users."""
    for _ in range(num_users):
        username = faker.name()
        email = faker.email()
        password = faker.password()
        phone = faker.phone_number()

        # Hash the password
        hashed_password = generate_password_hash(password)

        user = User(
            username=username,
            email=email,
            phone=phone,
            password=hashed_password
        )
        db.session.add(user)

def seed_bookings(num_bookings, num_users, num_flights, faker):
    """Seed fake bookings."""
    for _ in range(num_bookings):
        user_id = faker.random_int(min=1, max=num_users)
        flight_id = faker.random_int(min=1, max=num_flights)
        booking_datetime = faker.date_time_between(start_date='-1y', end_date='now')

        booking = Booking(
            user_id=user_id,
            flight_id=flight_id,
            booking_datetime=booking_datetime,
            departure_datetime=Flight.query.get(flight_id).departure_datetime
        )

        db.session.add(booking)

def seed_flight_passengers(num_passengers, num_users, num_flights, faker):
    """Seed fake flight passengers."""
    for _ in range(num_passengers):
        user_id = faker.random_int(min=1, max=num_users)
        flight_id = faker.random_int(min=1, max=num_flights)
        seat_number = faker.random_int(min=1, max=100)

        flight_passenger = FlightPassenger(
            user_id=user_id,
            flight_id=flight_id,
            seat_number=str(seat_number)
        )

        db.session.add(flight_passenger)

if __name__ == '__main__':
    with app.app_context():
        print("Cleaning up existing data...")
        cleanup()
        print("Starting seed with real airport and flight data...")

        fake = Faker()

        # Get real airport data
        airport_data = get_airports()

        # Create Airport objects
        for airport_name, airport_city, airport_country in airport_data:
            airport = Airport(
                name=airport_name,
                city=airport_city,
                country=airport_country
            )
            db.session.add(airport)

        # Commit the changes to the database to ensure we have IDs available for foreign key assignment
        db.session.commit()

        # Define destinations and number of flights for each destination
        destinations = {
    "London": 20,
    "Paris": 15,
    "New York": 25,
    "Tokyo": 20,
    "Dubai": 15,
    "Los Angeles": 20,
    "Rome": 15,
    "Sydney": 20,
    "Singapore": 15,
    "Istanbul": 20,
    "Hong Kong": 15,
    "Barcelona": 20,
    "Bangkok": 15,
    "Amsterdam": 20,
    "Seoul": 15,
    "Vienna": 20,
    "Berlin": 15,
    "Toronto": 20,
    "Moscow": 15,
    "Madrid": 20,
    "Las Vegas": 15,
    "Athens": 20,
    "Florence": 15,
    "Prague": 20,
    "Venice": 15,
    "San Francisco": 20,
    "Miami": 15,
    "Cairo": 20,
    "Beijing": 15,
    "Shanghai": 20,
    "Dublin": 15,
    "Mumbai": 20,
    "Zurich": 15,
    "Osaka": 20,
    "Kuala Lumpur": 15,
    "Cape Town": 20,
    "Rio de Janeiro": 15,
    "São Paulo": 20,
    "Buenos Aires": 15,
    "Mexico City": 20,
    "Vancouver": 15,
    "Montreal": 20,
    "Auckland": 15,
    "Melbourne": 20,
    "Perth": 15,
    "Hawaii": 20,
    "Maui": 15,
    "Honolulu": 20,
    "Nairobi": 15,
    "Addis Ababa": 10,
    "Kigali": 10,
    "Dar es Salaam": 10,
    "Entebbe": 10,
    "Zanzibar": 5,
    "Mombasa": 5,
    "Lamu": 5,
    "Arusha": 5,
    "Dodoma": 5,
    "Turkey": 5
    # Add more destinations and corresponding numbers of flights as needed
}

        # Seed flights for each destination
        for destination, num_flights in destinations.items():
            seed_flights(destination, num_flights, fake)

        # Commit the changes to the database
        db.session.commit()

        print(f"Seeded {len(airport_data)} real airports.")
        print(f"Seeded flights for {len(destinations)} destinations.")

        # Seed fake users
        num_users = 100
        seed_users(num_users, fake)
        db.session.commit()
        print(f"Seeded {num_users} fake users.")
