from datetime import date, time

from extensions import db
from models import Event, Organization


def create_event(
    organization_id,
    created_by,
    title,
    slug,
    description=None,
    category_id=None,
    image_url=None,
    location_name=None,
    address=None,
    city=None,
    state=None,
    latitude=None,
    longitude=None,
    event_date=None,
    start_time=None,
    end_time=None,
    capacity=0,
):
    organization = db.session.get(Organization, organization_id)

    if not organization:
        raise ValueError("Organization not found.")

    slug = slug.strip().lower()

    existing = Event.query.filter_by(slug=slug).first()

    if existing:
        raise ValueError("An event with this slug already exists.")

    event = Event(
        organization_id=organization_id,
        created_by=created_by,
        title=title.strip(),
        slug=slug,
        description=description,
        category_id=category_id,
        image_url=image_url,
        location_name=location_name,
        address=address,
        city=city,
        state=state,
        latitude=latitude,
        longitude=longitude,
        event_date=event_date,
        start_time=start_time,
        end_time=end_time,
        capacity=capacity or 0,
        status="DRAFT",
    )

    db.session.add(event)
    db.session.commit()

    return event


def publish_event(event):
    if event.status != "DRAFT":
        raise ValueError("Only draft events can be published.")

    if not event.event_date:
        raise ValueError("Event date is required before publishing.")

    event.status = "PUBLISHED"

    db.session.commit()

    return event