from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from Views import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///flight.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

db.init_app(app)

migrate = Migrate(app, db)

app.register_blueprint(user_bp)
app.register_blueprint(flights_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(flight_passengers_bp)
app.register_blueprint(airport_bp)

if __name__ == "__main__":
    app.run(debug=True)
