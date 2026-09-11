from werkzeug.security import generate_password_hash

from extensions import db
from models import User, VolunteerProfile


def register_user(name, email, password):
    """
    Create a new volunteer user and their profile.
    """

    email = email.strip().lower()

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        raise ValueError("An account with this email already exists.")

    user = User(
        name=name.strip(),
        email=email,
        password_hash=generate_password_hash(password),
        role="VOLUNTEER",
        status="ACTIVE",
    )

    db.session.add(user)
    db.session.flush()

    profile = VolunteerProfile(
        user_id=user.id
    )

    db.session.add(profile)
    db.session.commit()

    return user