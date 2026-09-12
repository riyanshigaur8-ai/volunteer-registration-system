from flask import Blueprint
from flask_jwt_extended import get_jwt_identity

from models import Application, Event, Attendance
from services.attendance_service import (
    check_in_volunteer,
    check_out_volunteer,
)
from utils.permissions import organization_role_required


attendance_bp = Blueprint(
    "attendance",
    __name__,
    url_prefix="/api",
)


@attendance_bp.post(
    "/organizations/<int:organization_id>/applications/"
    "<int:application_id>/check-in"
)
@organization_role_required("ORG_ADMIN")
def check_in(organization_id, application_id):
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

    try:
        attendance = check_in_volunteer(application)
    except ValueError as exc:
        return {
            "error": str(exc)
        }, 400

    return {
        "message": "Volunteer checked in successfully.",
        "attendance": {
            "id": attendance.id,
            "application_id": attendance.application_id,
            "check_in_time": attendance.check_in_time.isoformat(),
            "status": attendance.status,
        },
        "application": {
            "id": application.id,
            "status": application.status,
        },
    }, 201


@attendance_bp.post(
    "/organizations/<int:organization_id>/applications/"
    "<int:application_id>/check-out"
)
@organization_role_required("ORG_ADMIN")
def check_out(organization_id, application_id):
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

    try:
        attendance = check_out_volunteer(application)
    except ValueError as exc:
        return {
            "error": str(exc)
        }, 400

    return {
        "message": "Volunteer checked out successfully.",
        "attendance": {
            "id": attendance.id,
            "application_id": attendance.application_id,
            "check_in_time": attendance.check_in_time.isoformat(),
            "check_out_time": attendance.check_out_time.isoformat(),
            "hours": attendance.hours,
            "status": attendance.status,
        },
        "application": {
            "id": application.id,
            "status": application.status,
        },
        "volunteer": {
            "total_hours": application.volunteer.total_hours,
        },
    }, 200


@attendance_bp.get(
    "/organizations/<int:organization_id>/applications/"
    "<int:application_id>/attendance"
)
@organization_role_required("ORG_ADMIN")
def get_attendance(organization_id, application_id):
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

    attendance = Attendance.query.filter_by(
        application_id=application_id
    ).first()

    if not attendance:
        return {
            "attendance": None
        }, 200

    return {
        "attendance": {
            "id": attendance.id,
            "application_id": attendance.application_id,
            "check_in_time": (
                attendance.check_in_time.isoformat()
                if attendance.check_in_time
                else None
            ),
            "check_out_time": (
                attendance.check_out_time.isoformat()
                if attendance.check_out_time
                else None
            ),
            "hours": attendance.hours,
            "verification_method": attendance.verification_method,
            "status": attendance.status,
        }
    }, 200