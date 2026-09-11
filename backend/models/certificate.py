from datetime import datetime, timezone

from extensions import db


class Certificate(db.Model):
    __tablename__ = "certificates"

    id = db.Column(db.Integer, primary_key=True)

    certificate_number = db.Column(
        db.String(100),
        unique=True,
        nullable=False,
        index=True
    )

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

    organization_id = db.Column(
        db.Integer,
        db.ForeignKey("organizations.id"),
        nullable=False
    )

    attendance_id = db.Column(
    db.Integer,
    db.ForeignKey("attendance.id"),
    unique=True,
    nullable=False
)

    hours = db.Column(
        db.Float,
        nullable=False
    )

    certificate_url = db.Column(db.String(500))

    verification_hash = db.Column(
        db.String(255),
        unique=True
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="ISSUED"
    )

    issued_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    volunteer = db.relationship(
        "VolunteerProfile",
        back_populates="certificates"
    )

    event = db.relationship(
        "Event",
        back_populates="certificates"
    )

    organization = db.relationship(
        "Organization",
        back_populates="certificates"
    )

    attendance = db.relationship(
        "Attendance"
    )