from extensions import db
from models import Organization, OrganizationMember, User


def create_organization(
    name,
    slug,
    description=None,
    logo_url=None,
    website=None,
    email=None,
    phone=None,
    address=None,
    city=None,
    state=None,
    pincode=None,
    registration_number=None,
):
    slug = slug.strip().lower()

    existing = Organization.query.filter_by(slug=slug).first()

    if existing:
        raise ValueError("An organization with this slug already exists.")

    if registration_number:
        existing_registration = Organization.query.filter_by(
            registration_number=registration_number.strip()
        ).first()

        if existing_registration:
            raise ValueError(
                "An organization with this registration number already exists."
            )

    organization = Organization(
        name=name.strip(),
        slug=slug,
        description=description,
        logo_url=logo_url,
        website=website,
        email=email,
        phone=phone,
        address=address,
        city=city,
        state=state,
        pincode=pincode,
        registration_number=registration_number,
        verification_status="PENDING",
    )

    db.session.add(organization)
    db.session.commit()

    return organization


def add_organization_member(organization_id, user_id, role="ORG_ADMIN"):
    organization = db.session.get(Organization, organization_id)

    if not organization:
        raise ValueError("Organization not found.")

    user = db.session.get(User, user_id)

    if not user:
        raise ValueError("User not found.")

    existing = OrganizationMember.query.filter_by(
        organization_id=organization_id,
        user_id=user_id,
    ).first()

    if existing:
        raise ValueError("User is already a member of this organization.")

    if role not in {"ORG_ADMIN"}:
        raise ValueError("Invalid organization member role.")

    membership = OrganizationMember(
        organization_id=organization_id,
        user_id=user_id,
        role=role,
        status="ACTIVE",
    )

    db.session.add(membership)
    db.session.commit()

    return membership