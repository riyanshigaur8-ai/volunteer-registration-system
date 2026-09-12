import hashlib
import uuid

from extensions import db
from models import Application, Certificate


def issue_certificate(application):
    """
    Issue one certificate for a completed application.
    """

    if application.status != "COMPLETED":
        raise ValueError(
            "Certificates can only be issued for completed applications."
        )

    if not application.attendance:
        raise ValueError(
            "Attendance record not found for this application."
        )

    attendance = application.attendance

    if attendance.status != "COMPLETED":
        raise ValueError(
            "Attendance must be completed before issuing a certificate."
        )

    existing = Certificate.query.filter_by(
        attendance_id=attendance.id
    ).first()

    if existing:
        raise ValueError(
            "A certificate has already been issued for this application."
        )

    certificate_number = (
        f"VH-{application.event.organization_id:04d}-"
        f"{application.event.id:04d}-"
        f"{application.volunteer_id:06d}-"
        f"{uuid.uuid4().hex[:8].upper()}"
    )

    verification_payload = (
        f"{certificate_number}|"
        f"{application.volunteer_id}|"
        f"{application.event_id}|"
        f"{attendance.id}|"
        f"{attendance.hours}"
    )

    verification_hash = hashlib.sha256(
        verification_payload.encode("utf-8")
    ).hexdigest()

    certificate = Certificate(
        certificate_number=certificate_number,
        volunteer_id=application.volunteer_id,
        event_id=application.event_id,
        organization_id=application.event.organization_id,
        attendance_id=attendance.id,
        hours=attendance.hours,
        verification_hash=verification_hash,
        status="ISSUED",
    )

    db.session.add(certificate)
    db.session.commit()

    return certificate