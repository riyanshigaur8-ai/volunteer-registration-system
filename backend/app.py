from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, migrate
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

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

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