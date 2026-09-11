from functools import wraps

from flask import jsonify
from flask_jwt_extended import get_jwt, get_jwt_identity, verify_jwt_in_request

from models import OrganizationMember


def role_required(*allowed_roles):
    """
    Restrict a route using the user's global role.

    Use this for roles such as:
    VOLUNTEER and PLATFORM_ADMIN.
    """

    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()

            claims = get_jwt()
            user_role = claims.get("role")

            if user_role not in allowed_roles:
                return jsonify({
                    "error": "Forbidden",
                    "message": "You do not have permission to access this resource."
                }), 403

            return fn(*args, **kwargs)

        return wrapper

    return decorator


def organization_role_required(*allowed_roles):
    """
    Restrict a route using the user's role inside a specific organization.

    The protected route must contain:
        organization_id

    The organization membership is checked from the database.
    """

    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()

            organization_id = kwargs.get("organization_id")

            if organization_id is None:
                return jsonify({
                    "error": "Organization ID is required."
                }), 400

            user_id = int(get_jwt_identity())
            claims = get_jwt()

            # Platform admins have platform-wide organization access.
            if claims.get("role") == "PLATFORM_ADMIN":
                return fn(*args, **kwargs)

            membership = OrganizationMember.query.filter_by(
                organization_id=organization_id,
                user_id=user_id,
                status="ACTIVE",
            ).first()

            if not membership or membership.role not in allowed_roles:
                return jsonify({
                    "error": "Forbidden",
                    "message": "You do not have permission to manage this organization."
                }), 403

            return fn(*args, **kwargs)

        return wrapper

    return decorator