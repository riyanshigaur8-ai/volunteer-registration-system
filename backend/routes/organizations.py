from flask import Blueprint, request
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required

from models import Organization, OrganizationMember
from services.organization_service import (
    add_organization_member,
    create_organization,
)
from utils.permissions import (
    organization_role_required,
    role_required,
)


organizations_bp = Blueprint(
    "organizations",
    __name__,
    url_prefix="/api/organizations",
)


@organizations_bp.post("")
@jwt_required()
@role_required("PLATFORM_ADMIN")
def create():
    data = request.get_json(silent=True) or {}

    name = data.get("name")
    slug = data.get("slug")

    if not name or not slug:
        return {
            "error": "Organization name and slug are required."
        }, 400

    try:
        organization = create_organization(
            name=name,
            slug=slug,
            description=data.get("description"),
            logo_url=data.get("logo_url"),
            website=data.get("website"),
            email=data.get("email"),
            phone=data.get("phone"),
            address=data.get("address"),
            city=data.get("city"),
            state=data.get("state"),
            pincode=data.get("pincode"),
            registration_number=data.get("registration_number"),
        )
    except ValueError as exc:
        return {
            "error": str(exc)
        }, 409

    return {
        "message": "Organization created successfully.",
        "organization": {
            "id": organization.id,
            "name": organization.name,
            "slug": organization.slug,
            "verification_status": organization.verification_status,
        },
    }, 201


@organizations_bp.get("")
@jwt_required()
@role_required("ORG_ADMIN", "PLATFORM_ADMIN")
def list_organizations():
    user_id = int(get_jwt_identity())
    claims = get_jwt()

    if claims.get("role") == "PLATFORM_ADMIN":
        organizations = Organization.query.order_by(
            Organization.created_at.desc()
        ).all()
    else:
        organizations = (
            Organization.query
            .join(OrganizationMember)
            .filter(
                OrganizationMember.user_id == user_id,
                OrganizationMember.status == "ACTIVE",
                OrganizationMember.role == "ORG_ADMIN",
            )
            .order_by(Organization.created_at.desc())
            .all()
        )

    return {
        "organizations": [
            {
                "id": organization.id,
                "name": organization.name,
                "slug": organization.slug,
                "verification_status": organization.verification_status,
            }
            for organization in organizations
        ]
    }, 200


@organizations_bp.get("/<int:organization_id>")
@organization_role_required("ORG_ADMIN")
def get_organization(organization_id):
    organization = Organization.query.get(organization_id)

    if not organization:
        return {
            "error": "Organization not found."
        }, 404

    return {
        "organization": {
            "id": organization.id,
            "name": organization.name,
            "slug": organization.slug,
            "description": organization.description,
            "logo_url": organization.logo_url,
            "website": organization.website,
            "email": organization.email,
            "phone": organization.phone,
            "address": organization.address,
            "city": organization.city,
            "state": organization.state,
            "pincode": organization.pincode,
            "registration_number": organization.registration_number,
            "verification_status": organization.verification_status,
        }
    }, 200


@organizations_bp.post("/<int:organization_id>/members")
@organization_role_required("ORG_ADMIN")
def add_member(organization_id):
    data = request.get_json(silent=True) or {}

    user_id = data.get("user_id")

    if not user_id:
        return {
            "error": "user_id is required."
        }, 400

    try:
        membership = add_organization_member(
            organization_id=organization_id,
            user_id=int(user_id),
            role="ORG_ADMIN",
        )
    except ValueError as exc:
        return {
            "error": str(exc)
        }, 400

    return {
        "message": "Organization member added successfully.",
        "membership": {
            "id": membership.id,
            "organization_id": membership.organization_id,
            "user_id": membership.user_id,
            "role": membership.role,
            "status": membership.status,
        },
    }, 201


@organizations_bp.get("/<int:organization_id>/members")
@organization_role_required("ORG_ADMIN")
def list_members(organization_id):
    organization = Organization.query.get(organization_id)

    if not organization:
        return {
            "error": "Organization not found."
        }, 404

    members = OrganizationMember.query.filter_by(
        organization_id=organization_id
    ).all()

    return {
        "members": [
            {
                "id": member.id,
                "user_id": member.user_id,
                "user_name": member.user.name,
                "email": member.user.email,
                "role": member.role,
                "status": member.status,
            }
            for member in members
        ]
    }, 200