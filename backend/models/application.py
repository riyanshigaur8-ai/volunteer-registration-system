from datetime import datetime, timezone

from extensions import db


class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True)

    volunteer_id = db.Column(
        db.Integer,
        db.ForeignKey("volunteer_profiles.id"),
        nullable=False
    )

    event_id = db.Column(
        db.Integer,
        db.ForeignKey("events.id"),
        nullable=False
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="PENDING"
    )

    applied_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    reviewed_at = db.Column(db.DateTime)

    reviewed_by = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )

    rejection_reason = db.Column(db.Text)

    cancelled_at = db.Column(db.DateTime)

    volunteer = db.relationship(
        "VolunteerProfile",
        back_populates="applications"
    )

    event = db.relationship(
        "Event",
        back_populates="applications"
    )

    reviewer = db.relationship(
        "User",
        foreign_keys=[reviewed_by]
    )

    attendance = db.relationship(
        "Attendance",
        back_populates="application",
        uselist=False,
        cascade="all, delete-orphan"
    )

    __table_args__ = (
        db.UniqueConstraint(
            "volunteer_id",
            "event_id",
            name="uq_volunteer_event_application"
        ),
    )