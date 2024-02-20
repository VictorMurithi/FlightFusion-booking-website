import requests
from app import app, db
from models import User, Booking, Flight, Airport, FlightPassenger
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta
from decimal import Decimal
from faker import Faker

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

        # Create some fake data for the User model
        num_users = 100
        for _ in range(num_users):
            username = fake.name()
            email = fake.email()
            password = fake.password()
            phone = fake.phone_number()

            # Hash the password
            hashed_password = generate_password_hash(password)

            user = User(
                username=username,
                email=email,
                phone=phone,
                password=hashed_password
            )
            db.session.add(user)

        # Commit the changes to the database to ensure we have user IDs available for foreign key assignment
        db.session.commit()

        # Create some fake data for the Flight model
        num_flights = 500
        for _ in range(num_flights):
            departure_airport = Airport.query.order_by(db.func.random()).first()
            destination_airport = Airport.query.order_by(db.func.random()).first()
            flight_date = fake.date_between(start_date='-1y', end_date='today')
            departure_time = fake.time_object()
            departure_datetime = datetime.combine(flight_date, departure_time)
            arrival_time = departure_datetime + timedelta(hours=fake.random_int(min=1, max=12))
            price = Decimal(fake.random_int(min=100, max=10000))  # Ensuring at least 3 digits

            flight_class = fake.random_element(elements=('first class', 'business class', 'economy class'))

            flight = Flight(
                airline=fake.company(),
                destination=destination_airport.city,
                departure_datetime=departure_datetime,
                price=price,
                departure_airport=departure_airport,
                arrival_airport=destination_airport
            )

            db.session.add(flight)

        # Commit the changes to the database to ensure we have flight IDs available for foreign key assignment
        db.session.commit()

        # Create some fake data for the Booking model
        num_bookings = 5000
        for _ in range(num_bookings):
            user_id = fake.random_int(min=1, max=num_users)
            flight_id = fake.random_int(min=1, max=num_flights)
            booking_datetime = fake.date_time_between(start_date='-1y', end_date='now')

            booking = Booking(
                user_id=user_id,
                flight_id=flight_id,
                booking_datetime=booking_datetime,
                departure_datetime=Flight.query.get(flight_id).departure_datetime
            )

            db.session.add(booking)

        # Commit the changes to the database
        db.session.commit()

        # Create some fake data for the FlightPassenger model
        num_passengers = 5000
        for _ in range(num_passengers):
            user_id = fake.random_int(min=1, max=num_users)
            flight_id = fake.random_int(min=1, max=num_flights)
            seat_number = fake.random_int(min=1, max=100)

            flight_passenger = FlightPassenger(
                user_id=user_id,
                flight_id=flight_id,
                seat_number=str(seat_number)
            )

            db.session.add(flight_passenger)

        # Commit all changes to the database
        db.session.commit()

        print(f"Seeded {len(airport_data)} real airports.")
        print(f"Seeded {num_flights} fake flights.")
        print(f"Seeded {num_users} fake users.")
        print(f"Seeded {num_bookings} fake bookings.")
        print(f"Seeded {num_passengers} fake flight passengers.")
