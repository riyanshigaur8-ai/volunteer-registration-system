from datetime import datetime, timezone

from extensions import db


class VolunteerProfile(db.Model):
    __tablename__ = "volunteer_profiles"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    phone = db.Column(db.String(30))

    date_of_birth = db.Column(db.Date)

    gender = db.Column(db.String(30))

    address = db.Column(db.Text)

    city = db.Column(db.String(100))

    state = db.Column(db.String(100))

    pincode = db.Column(db.String(20))

    bio = db.Column(db.Text)

    profile_image = db.Column(db.String(500))

    availability = db.Column(db.String(255))

    total_hours = db.Column(
        db.Float,
        nullable=False,
        default=0
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    # -------------------------
    # Relationships
    # -------------------------

    user = db.relationship(
        "User",
        back_populates="volunteer_profile"
    )

    skills = db.relationship(
        "VolunteerSkill",
        back_populates="volunteer",
        cascade="all, delete-orphan"
    )

    interests = db.relationship(
        "VolunteerInterest",
        back_populates="volunteer",
        cascade="all, delete-orphan"
    )

    applications = db.relationship(
        "Application",
        back_populates="volunteer",
        cascade="all, delete-orphan"
    )

    certificates = db.relationship(
        "Certificate",
        back_populates="volunteer",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<VolunteerProfile {self.id}>"