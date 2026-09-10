from datetime import datetime, timezone
from extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), nullable=False)

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = db.Column(db.String(255), nullable=False)

    role = db.Column(
        db.String(30),
        nullable=False,
        default="VOLUNTEER"
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="ACTIVE"
    )

    last_login = db.Column(db.DateTime, nullable=True)

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

    volunteer_profile = db.relationship(
        "VolunteerProfile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )

    organization_memberships = db.relationship(
        "OrganizationMember",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    created_events = db.relationship(
        "Event",
        back_populates="creator",
        foreign_keys="Event.created_by",
        lazy=True
    )

    def __repr__(self):
        return f"<User {self.email}>"