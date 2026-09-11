from functools import wraps

from flask import jsonify
from flask_jwt_extended import get_jwt, verify_jwt_in_request


def role_required(*allowed_roles):
    """
    Restrict a route to one or more user roles.

    Example:
        @role_required("ORG_ADMIN", "PLATFORM_ADMIN")
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