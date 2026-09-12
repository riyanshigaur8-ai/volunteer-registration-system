from datetime import datetime

from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from models import Event
from services.event_service import create_event, publish_event
from utils.permissions import organization_role_required


events_bp = Blueprint(
    "events",
    __name__,
    url_prefix="/api",
)


def parse_event_datetime(value):
    if not value:
        return None

    try:
        return datetime.fromisoformat(value)
    except ValueError:
        raise ValueError("Invalid date/time format.")


@events_bp.post("/organizations/<int:organization_id>/events")
@organization_role_required("ORG_ADMIN")
def create_event_route(organization_id):
    data = request.get_json(silent=True) or {}

    required_fields = [
        "title",
        "slug",
        "event_date",
    ]

    missing = [
        field
        for field in required_fields
        if not data.get(field)
    ]

    if missing:
        return {
            "error": "Missing required fields.",
            "fields": missing,
        }, 400

    try:
        event_date = datetime.strptime(
            data["event_date"],
            "%Y-%m-%d",
        ).date()

        start_time = None
        end_time = None

        if data.get("start_time"):
            start_time = datetime.strptime(
                data["start_time"],
                "%H:%M",
            ).time()

        if data.get("end_time"):
            end_time = datetime.strptime(
                data["end_time"],
                "%H:%M",
            ).time()

        event = create_event(
            organization_id=organization_id,
            created_by=int(get_jwt_identity()),
            title=data["title"],
            slug=data["slug"],
            description=data.get("description"),
            category_id=data.get("category_id"),
            image_url=data.get("image_url"),
            location_name=data.get("location_name"),
            address=data.get("address"),
            city=data.get("city"),
            state=data.get("state"),
            latitude=data.get("latitude"),
            longitude=data.get("longitude"),
            event_date=event_date,
            start_time=start_time,
            end_time=end_time,
            capacity=data.get("capacity", 0),
        )

    except ValueError as exc:
        return {
            "error": str(exc),
        }, 400

    return {
        "message": "Event created successfully.",
        "event": {
            "id": event.id,
            "organization_id": event.organization_id,
            "title": event.title,
            "slug": event.slug,
            "status": event.status,
            "event_date": event.event_date.isoformat(),
            "capacity": event.capacity,
        },
    }, 201


@events_bp.post("/organizations/<int:organization_id>/events/<int:event_id>/publish")
@organization_role_required("ORG_ADMIN")
def publish_event_route(organization_id, event_id):
    event = Event.query.filter_by(
        id=event_id,
        organization_id=organization_id,
    ).first()

    if not event:
        return {
            "error": "Event not found in this organization.",
        }, 404

    try:
        publish_event(event)
    except ValueError as exc:
        return {
            "error": str(exc),
        }, 400

    return {
        "message": "Event published successfully.",
        "event": {
            "id": event.id,
            "title": event.title,
            "status": event.status,
        },
    }, 200


@events_bp.get("/events")
@jwt_required()
def list_events():
    """
    Public event discovery for authenticated users.

    Volunteers see published events only.
    """

    events = (
        Event.query
        .filter_by(status="PUBLISHED")
        .order_by(
            Event.event_date.asc(),
            Event.start_time.asc(),
        )
        .all()
    )

    return {
        "events": [
            {
                "id": event.id,
                "organization_id": event.organization_id,
                "organization_name": event.organization.name,
                "title": event.title,
                "slug": event.slug,
                "description": event.description,
                "image_url": event.image_url,
                "location_name": event.location_name,
                "city": event.city,
                "state": event.state,
                "event_date": event.event_date.isoformat(),
                "start_time": (
                    event.start_time.strftime("%H:%M")
                    if event.start_time
                    else None
                ),
                "end_time": (
                    event.end_time.strftime("%H:%M")
                    if event.end_time
                    else None
                ),
                "capacity": event.capacity,
                "status": event.status,
            }
            for event in events
        ]
    }, 200


@events_bp.get("/events/<int:event_id>")
@jwt_required()
def get_event(event_id):
    event = Event.query.get(event_id)

    if not event:
        return {
            "error": "Event not found.",
        }, 404

    return {
        "event": {
            "id": event.id,
            "organization_id": event.organization_id,
            "organization_name": event.organization.name,
            "title": event.title,
            "slug": event.slug,
            "description": event.description,
            "image_url": event.image_url,
            "location_name": event.location_name,
            "address": event.address,
            "city": event.city,
            "state": event.state,
            "latitude": event.latitude,
            "longitude": event.longitude,
            "event_date": event.event_date.isoformat(),
            "start_time": (
                event.start_time.strftime("%H:%M")
                if event.start_time
                else None
            ),
            "end_time": (
                event.end_time.strftime("%H:%M")
                if event.end_time
                else None
            ),
            "capacity": event.capacity,
            "status": event.status,
        }
    }, 200