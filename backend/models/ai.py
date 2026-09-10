from datetime import datetime, timezone

from extensions import db


class AIRecommendation(db.Model):
    __tablename__ = "ai_recommendations"

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

    score = db.Column(
        db.Float,
        nullable=False
    )

    reason = db.Column(db.Text)

    model_version = db.Column(
        db.String(100)
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )