from datetime import datetime, timezone

from extensions import db


class Attendance(db.Model):
    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True)

    application_id = db.Column(
        db.Integer,
        db.ForeignKey("applications.id"),
        unique=True,
        nullable=False
    )

    check_in_time = db.Column(db.DateTime)

    check_out_time = db.Column(db.DateTime)

    hours = db.Column(
        db.Float,
        default=0
    )

    verification_method = db.Column(
        db.String(30)
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="PENDING"
    )

    verified_by = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    application = db.relationship(
        "Application",
        back_populates="attendance"
    )

    verifier = db.relationship(
        "User",
        foreign_keys=[verified_by]
    )