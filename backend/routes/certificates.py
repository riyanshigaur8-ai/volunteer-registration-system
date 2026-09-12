from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required

from models import Certificate, Application, Event, VolunteerProfile
from services.certificate_service import issue_certificate
from utils.permissions import (
    organization_role_required,
    role_required,
)


certificates_bp = Blueprint(
    "certificates",
    __name__,
    url_prefix="/api",
)


@certificates_bp.post(
    "/organizations/<int:organization_id>/applications/"
    "<int:application_id>/certificate"
)
@organization_role_required("ORG_ADMIN")
def issue(organization_id, application_id):
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
        certificate = issue_certificate(application)
    except ValueError as exc:
        return {
            "error": str(exc)
        }, 400

    return {
        "message": "Certificate issued successfully.",
        "certificate": {
            "id": certificate.id,
            "certificate_number": certificate.certificate_number,
            "volunteer_id": certificate.volunteer_id,
            "event_id": certificate.event_id,
            "organization_id": certificate.organization_id,
            "hours": certificate.hours,
            "status": certificate.status,
            "issued_at": certificate.issued_at.isoformat(),
        },
    }, 201


@certificates_bp.get("/my-certificates")
@jwt_required()
@role_required("VOLUNTEER")
def my_certificates():
    user_id = int(get_jwt_identity())

    volunteer = VolunteerProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not volunteer:
        return {
            "error": "Volunteer profile not found."
        }, 404

    certificates = (
        Certificate.query
        .filter_by(volunteer_id=volunteer.id)
        .order_by(Certificate.issued_at.desc())
        .all()
    )

    return {
        "certificates": [
            {
                "id": certificate.id,
                "certificate_number": certificate.certificate_number,
                "event_id": certificate.event_id,
                "event_title": certificate.event.title,
                "organization_id": certificate.organization_id,
                "organization_name": certificate.organization.name,
                "hours": certificate.hours,
                "status": certificate.status,
                "issued_at": certificate.issued_at.isoformat(),
            }
            for certificate in certificates
        ]
    }, 200


@certificates_bp.get(
    "/certificates/verify/<string:certificate_number>"
)
def verify_certificate(certificate_number):
    certificate = Certificate.query.filter_by(
        certificate_number=certificate_number
    ).first()

    if not certificate:
        return {
            "valid": False,
            "message": "Certificate not found."
        }, 404

    return {
        "valid": certificate.status == "ISSUED",
        "certificate": {
            "certificate_number": certificate.certificate_number,
            "volunteer_name": certificate.volunteer.user.name,
            "event_title": certificate.event.title,
            "organization_name": certificate.organization.name,
            "hours": certificate.hours,
            "status": certificate.status,
            "issued_at": certificate.issued_at.isoformat(),
            "verification_hash": certificate.verification_hash,
        },
    }, 200