from datetime import datetime, timezone

from extensions import db


class Organization(db.Model):
    __tablename__ = "organizations"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(200),
        nullable=False
    )

    slug = db.Column(
        db.String(220),
        unique=True,
        nullable=False,
        index=True
    )

    description = db.Column(db.Text)

    logo_url = db.Column(db.String(500))

    website = db.Column(db.String(500))

    email = db.Column(db.String(255))

    phone = db.Column(db.String(30))

    address = db.Column(db.Text)

    city = db.Column(db.String(100))

    state = db.Column(db.String(100))

    pincode = db.Column(db.String(20))

    registration_number = db.Column(
        db.String(100),
        unique=True
    )

    verification_status = db.Column(
        db.String(30),
        nullable=False,
        default="PENDING"
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    # -------------------------
    # Relationships
    # -------------------------

    members = db.relationship(
        "OrganizationMember",
        back_populates="organization",
        cascade="all, delete-orphan"
    )

    events = db.relationship(
        "Event",
        back_populates="organization",
        cascade="all, delete-orphan"
    )

    certificates = db.relationship(
        "Certificate",
        back_populates="organization"
    )

    def __repr__(self):
        return f"<Organization {self.name}>"


class OrganizationMember(db.Model):
    __tablename__ = "organization_members"

    id = db.Column(db.Integer, primary_key=True)

    organization_id = db.Column(
        db.Integer,
        db.ForeignKey("organizations.id"),
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    role = db.Column(
        db.String(50),
        nullable=False,
        default="ORG_ADMIN"
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="ACTIVE"
    )

    joined_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    organization = db.relationship(
        "Organization",
        back_populates="members"
    )

    user = db.relationship(
        "User",
        back_populates="organization_memberships"
    )

    __table_args__ = (
        db.UniqueConstraint(
            "organization_id",
            "user_id",
            name="uq_organization_user"
        ),
    )