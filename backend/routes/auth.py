from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

from models import User
from services.auth_service import register_user
from utils.permissions import role_required


from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
)


auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.get("/me")
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return {"error": "User not found."}, 404

    volunteer_profile = user.volunteer_profile

    return {
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "status": user.status,
            "total_hours": (
                volunteer_profile.total_hours
                if volunteer_profile
                else 0
            ),
        }
    }, 200

@auth_bp.post("/register")
def register():
    data = request.get_json(silent=True) or {}

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return {
            "error": "Name, email and password are required."
        }, 400

    if len(password) < 8:
        return {
            "error": "Password must be at least 8 characters long."
        }, 400

    try:
        user = register_user(name, email, password)
    except ValueError as exc:
        return {"error": str(exc)}, 409

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role
        }
    )

    return {
        "message": "Registration successful.",
        "token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }, 201


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {
            "error": "Email and password are required."
        }, 400

    user = User.query.filter_by(email=email.strip().lower()).first()

    if not user or not check_password_hash(user.password_hash, password):
        return {
            "error": "Invalid email or password."
        }, 401

    if user.status != "ACTIVE":
        return {
            "error": "Your account is not active."
        }, 403

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role
        }
    )

    return {
        "message": "Login successful.",
        "token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }, 200

@auth_bp.get("/volunteer-test")
@role_required("VOLUNTEER")
def volunteer_test():
    return {
        "message": "Volunteer access granted."
    }, 200