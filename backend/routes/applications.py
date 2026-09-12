from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from models import Application, Event, VolunteerProfile
from services.application_service import (
    cancel_application,
    create_application,
    review_application,
)
from utils.permissions import (
    organization_role_required,
    role_required,
)


applications_bp = Blueprint(
    "applications",
    __name__,
    url_prefix="/api",
)


@applications_bp.post("/events/<int:event_id>/applications")
@jwt_required()
@role_required("VOLUNTEER")
def apply_to_event(event_id):
    user_id = int(get_jwt_identity())

    volunteer = VolunteerProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not volunteer:
        return {
            "error": "Volunteer profile not found."
        }, 404

    try:
        application = create_application(
            volunteer_id=volunteer.id,
            event_id=event_id,
        )
    except ValueError as exc:
        return {
            "error": str(exc)
        }, 400

    return {
        "message": "Application submitted successfully.",
        "application": {
            "id": application.id,
            "volunteer_id": application.volunteer_id,
            "event_id": application.event_id,
            "status": application.status,
            "applied_at": application.applied_at.isoformat(),
        },
    }, 201


@applications_bp.get("/my-applications")
@jwt_required()
@role_required("VOLUNTEER")
def my_applications():
    user_id = int(get_jwt_identity())

    volunteer = VolunteerProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not volunteer:
        return {
            "error": "Volunteer profile not found."
        }, 404

    applications = (
        Application.query
        .filter_by(volunteer_id=volunteer.id)
        .order_by(Application.applied_at.desc())
        .all()
    )

    return {
        "applications": [
            {
                "id": application.id,
                "event_id": application.event_id,
                "event_title": application.event.title,
                "organization_id": application.event.organization_id,
                "organization_name": application.event.organization.name,
                "status": application.status,
                "applied_at": application.applied_at.isoformat(),
                "reviewed_at": (
                    application.reviewed_at.isoformat()
                    if application.reviewed_at
                    else None
                ),
                "rejection_reason": application.rejection_reason,
            }
            for application in applications
        ]
    }, 200


@applications_bp.post("/applications/<int:application_id>/cancel")
@jwt_required()
@role_required("VOLUNTEER")
def cancel(application_id):
    user_id = int(get_jwt_identity())

    volunteer = VolunteerProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not volunteer:
        return {
            "error": "Volunteer profile not found."
        }, 404

    application = Application.query.filter_by(
        id=application_id,
        volunteer_id=volunteer.id,
    ).first()

    if not application:
        return {
            "error": "Application not found."
        }, 404

    try:
        cancel_application(application)
    except ValueError as exc:
        return {
            "error": str(exc)
        }, 400

    return {
        "message": "Application cancelled successfully.",
        "application": {
            "id": application.id,
            "status": application.status,
        },
    }, 200


@applications_bp.get(
    "/organizations/<int:organization_id>/applications"
)
@organization_role_required("ORG_ADMIN")
def list_organization_applications(organization_id):
    applications = (
        Application.query
        .join(Event)
        .filter(Event.organization_id == organization_id)
        .order_by(Application.applied_at.desc())
        .all()
    )

    return {
        "applications": [
            {
                "id": application.id,
                "event_id": application.event_id,
                "event_title": application.event.title,
                "volunteer_id": application.volunteer_id,
                "volunteer_name": application.volunteer.user.name,
                "volunteer_email": application.volunteer.user.email,
                "status": application.status,
                "applied_at": application.applied_at.isoformat(),
                "reviewed_at": (
                    application.reviewed_at.isoformat()
                    if application.reviewed_at
                    else None
                ),
                "rejection_reason": application.rejection_reason,
            }
            for application in applications
        ]
    }, 200


@applications_bp.post(
    "/organizations/<int:organization_id>/applications/"
    "<int:application_id>/review"
)
@organization_role_required("ORG_ADMIN")
def review(organization_id, application_id):
    application = (
        Application.query
        .join(Event)
        .filter(
            Application.id == application_id,
            Event.organization_id == organization_id,
        )
        .first()
    )

    if not application:
        return {
            "error": "Application not found in this organization."
        }, 404

    data = request.get_json(silent=True) or {}

    status = data.get("status")
    rejection_reason = data.get("rejection_reason")

    try:
        application = review_application(
            application=application,
            new_status=status,
            rejection_reason=rejection_reason,
        )
    except ValueError as exc:
        return {
            "error": str(exc)
        }, 400

    return {
        "message": "Application reviewed successfully.",
        "application": {
            "id": application.id,
            "event_id": application.event_id,
            "volunteer_id": application.volunteer_id,
            "status": application.status,
            "rejection_reason": application.rejection_reason,
        },
    }, 200