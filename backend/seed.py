from datetime import datetime, timedelta
from decimal import Decimal
from faker import Faker
from backend.app import app
from backend.models import db, Airport, Flight, Booking, FlightPassenger

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed with fake airport and flight data...")

        fake = Faker()

        # Create some fake data for the Airport model
        airport_data = []
        for _ in range(50):
            airport = Airport(
                name=fake.airport(),
                city=fake.city(),
                state=fake.state_abbr()
            )
            db.session.add(airport)
            airport_data.append(airport)

        # Create some fake data for the Flight model
        num_flights = 500
        for _ in range(num_flights):
            flight_date = fake.date_between(start_date='-1y', end_date='today')
            departure_time = fake.time_object()
            departure_datetime = datetime.combine(flight_date, departure_time)
            arrival_time = departure_time + timedelta(hours=fake.random_int(min=1, max=12))
            price = Decimal(fake.random_int(min=50, max=1000, step=50)) / 100

            departure_airport = airport_data[fake.random_int(min=0, max=len(airport_data) - 1)]
            destination_airport = airport_data[fake.random_int(min=0, max=len(airport_data) - 1)]

            flight = Flight(
                airline=fake.airport_code(),
                arrival_time=arrival_time,
                departure_time=departure_time,
                flight_date=flight_date,
                price=price,
                departure_airport=departure_airport,
                destination_airport=destination_airport
            )

            db.session.add(flight)

        # Create some fake data for the Booking model
        num_bookings = 5000
        for _ in range(num_bookings):
            user_id = fake.random_int(min=1, max=100)
            flight_id = fake.random_int(min=1, max=num_flights)
            booking_datetime = datetime.now()

            booking = Booking(
                user_id=user_id,
                flight_id=flight_id,
                booking_datetime=booking_datetime
            )

            db.session.add(booking)

        # Create some fake data for the FlightPassenger model
        num_passengers = 5000
        for _ in range(num_passengers):
            user_id = fake.random_int(min=1, max=100)
            flight_id = fake.random_int(min=1, max=num_flights)

            flight_passenger = FlightPassenger(
                user_id=user_id,
                flight_id=flight_id
            )

            db.session.add(flight_passenger)

        # Commit the changes to the database
        db.session.commit()

        print(f"Seeded {len(airport_data)} fake airports.")
        print(f"Seeded {num_flights} fake flights.")
        print(f"Seeded {num_bookings} fake bookings.")
        print(f"Seeded {num_passengers} fake flight passengers.")