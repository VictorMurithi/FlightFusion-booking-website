from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from Views import *
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret"

jwt = JWTManager(app)
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
