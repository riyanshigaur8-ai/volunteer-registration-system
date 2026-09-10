from datetime import datetime, timezone

from extensions import db


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)

    organization_id = db.Column(
        db.Integer,
        db.ForeignKey("organizations.id"),
        nullable=False
    )

    created_by = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    title = db.Column(
        db.String(255),
        nullable=False
    )

    slug = db.Column(
        db.String(280),
        unique=True,
        nullable=False
    )

    description = db.Column(db.Text)

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id")
    )

    image_url = db.Column(db.String(500))

    location_name = db.Column(db.String(255))

    address = db.Column(db.Text)

    city = db.Column(db.String(100))

    state = db.Column(db.String(100))

    latitude = db.Column(db.Float)

    longitude = db.Column(db.Float)

    event_date = db.Column(
        db.Date,
        nullable=False
    )

    start_time = db.Column(db.Time)

    end_time = db.Column(db.Time)

    capacity = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="DRAFT"
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

    organization = db.relationship(
        "Organization",
        back_populates="events"
    )

    creator = db.relationship(
        "User",
        back_populates="created_events",
        foreign_keys=[created_by]
    )

    category = db.relationship("Category")

    required_skills = db.relationship(
        "EventSkill",
        back_populates="event",
        cascade="all, delete-orphan"
    )

    interests = db.relationship(
        "EventInterest",
        back_populates="event",
        cascade="all, delete-orphan"
    )

    applications = db.relationship(
        "Application",
        back_populates="event",
        cascade="all, delete-orphan"
    )

    certificates = db.relationship(
        "Certificate",
        back_populates="event"
    )

    def __repr__(self):
        return f"<Event {self.title}>"