from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from extensions import db, migrate

from routes.auth import auth_bp
from routes.organizations import organizations_bp
from routes.events import events_bp
from routes.applications import applications_bp
from routes.attendance import attendance_bp

from models import (
    User,
    VolunteerProfile,
    Organization,
    OrganizationMember,
    Event,
    Application,
    Attendance,
    Certificate,
    Category,
    Skill,
    Interest,
    VolunteerSkill,
    VolunteerInterest,
    EventSkill,
    EventInterest,
    AIRecommendation,
)


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    JWTManager(app)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(organizations_bp)
    app.register_blueprint(events_bp)
    app.register_blueprint(applications_bp)
    app.register_blueprint(attendance_bp)
    
    @app.route("/")
    def home():
        return {
            "message": "VolunteerHub V2 API",
            "version": "2.0",
            "status": "running"
        }

    @app.route("/health")
    def health():
        return {
            "status": "healthy"
        }

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)