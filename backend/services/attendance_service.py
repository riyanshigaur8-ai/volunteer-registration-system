from datetime import datetime, timezone

from extensions import db
from models import Application, Attendance


def check_in_volunteer(application):
    if application.status != "APPROVED":
        raise ValueError(
            "Only approved applications can be checked in."
        )

    existing_attendance = Attendance.query.filter_by(
        application_id=application.id
    ).first()

    if existing_attendance:
        raise ValueError(
            "Attendance has already been recorded for this application."
        )

    now = datetime.now(timezone.utc)

    attendance = Attendance(
        application_id=application.id,
        check_in_time=now,
        status="CHECKED_IN",
    )

    application.status = "ATTENDED"

    db.session.add(attendance)
    db.session.commit()

    return attendance


def check_out_volunteer(application):
    attendance = Attendance.query.filter_by(
        application_id=application.id
    ).first()

    if not attendance:
        raise ValueError(
            "Volunteer has not been checked in."
        )

    if attendance.status != "CHECKED_IN":
        raise ValueError(
            "Volunteer is not currently checked in."
        )

    now = datetime.now(timezone.utc)

    check_in_time = attendance.check_in_time

    # MySQL may return DateTime values without timezone information.
    if check_in_time.tzinfo is None:
        check_in_time = check_in_time.replace(tzinfo=timezone.utc)

    if now <= check_in_time:
        raise ValueError(
            "Check-out time must be after check-in time."
        )

    duration_seconds = (
        now - check_in_time
    ).total_seconds()

    hours = round(duration_seconds / 3600, 2)

    attendance.check_out_time = now
    attendance.hours = hours
    attendance.status = "COMPLETED"

    application.status = "COMPLETED"

    volunteer = application.volunteer
    volunteer.total_hours = round(
        (volunteer.total_hours or 0) + hours,
        2,
    )

    db.session.commit()

    return attendance