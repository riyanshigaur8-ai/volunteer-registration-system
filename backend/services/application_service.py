from extensions import db
from models import Application, Event, VolunteerProfile


def create_application(volunteer_id, event_id):
    volunteer = db.session.get(VolunteerProfile, volunteer_id)

    if not volunteer:
        raise ValueError("Volunteer profile not found.")

    event = db.session.get(Event, event_id)

    if not event:
        raise ValueError("Event not found.")

    if event.status != "PUBLISHED":
        raise ValueError("Applications are only allowed for published events.")

    existing = Application.query.filter_by(
        volunteer_id=volunteer_id,
        event_id=event_id,
    ).first()

    if existing:
        raise ValueError("You have already applied to this event.")

    if event.capacity > 0:
        approved_count = Application.query.filter_by(
            event_id=event_id,
            status="APPROVED",
        ).count()

        if approved_count >= event.capacity:
            raise ValueError("This event has reached its capacity.")

    application = Application(
        volunteer_id=volunteer_id,
        event_id=event_id,
        status="PENDING",
    )

    db.session.add(application)
    db.session.commit()

    return application


def cancel_application(application):
    if application.status not in {"PENDING", "APPROVED"}:
        raise ValueError(
            "Only pending or approved applications can be cancelled."
        )

    application.status = "CANCELLED"
    db.session.commit()

    return application


def review_application(application, new_status, rejection_reason=None):
    if application.status != "PENDING":
        raise ValueError("Only pending applications can be reviewed.")

    if new_status not in {"APPROVED", "REJECTED"}:
        raise ValueError("Invalid application status.")

    if new_status == "APPROVED":
        event = application.event

        if event.status != "PUBLISHED":
            raise ValueError("This event is no longer accepting applications.")

        if event.capacity > 0:
            approved_count = Application.query.filter(
                Application.event_id == event.id,
                Application.status == "APPROVED",
                Application.id != application.id,
            ).count()

            if approved_count >= event.capacity:
                raise ValueError("This event has reached its capacity.")

    application.status = new_status
    application.rejection_reason = (
        rejection_reason if new_status == "REJECTED" else None
    )

    db.session.commit()

    return application