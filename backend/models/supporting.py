from extensions import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    description = db.Column(db.Text)

    icon = db.Column(db.String(100))


class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    description = db.Column(db.Text)


class Interest(db.Model):
    __tablename__ = "interests"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )


class VolunteerSkill(db.Model):
    __tablename__ = "volunteer_skills"

    id = db.Column(db.Integer, primary_key=True)

    volunteer_id = db.Column(
        db.Integer,
        db.ForeignKey("volunteer_profiles.id"),
        nullable=False
    )

    skill_id = db.Column(
        db.Integer,
        db.ForeignKey("skills.id"),
        nullable=False
    )

    proficiency = db.Column(db.String(30))

    years_experience = db.Column(
        db.Float,
        default=0
    )

    volunteer = db.relationship(
        "VolunteerProfile",
        back_populates="skills"
    )

    skill = db.relationship("Skill")

    __table_args__ = (
        db.UniqueConstraint(
            "volunteer_id",
            "skill_id",
            name="uq_volunteer_skill"
        ),
    )


class VolunteerInterest(db.Model):
    __tablename__ = "volunteer_interests"

    id = db.Column(db.Integer, primary_key=True)

    volunteer_id = db.Column(
        db.Integer,
        db.ForeignKey("volunteer_profiles.id"),
        nullable=False
    )

    interest_id = db.Column(
        db.Integer,
        db.ForeignKey("interests.id"),
        nullable=False
    )

    volunteer = db.relationship(
        "VolunteerProfile",
        back_populates="interests"
    )

    interest = db.relationship("Interest")

    __table_args__ = (
        db.UniqueConstraint(
            "volunteer_id",
            "interest_id",
            name="uq_volunteer_interest"
        ),
    )


class EventSkill(db.Model):
    __tablename__ = "event_skills"

    id = db.Column(db.Integer, primary_key=True)

    event_id = db.Column(
        db.Integer,
        db.ForeignKey("events.id"),
        nullable=False
    )

    skill_id = db.Column(
        db.Integer,
        db.ForeignKey("skills.id"),
        nullable=False
    )

    required_level = db.Column(
        db.String(30)
    )

    event = db.relationship(
        "Event",
        back_populates="required_skills"
    )

    skill = db.relationship("Skill")


class EventInterest(db.Model):
    __tablename__ = "event_interests"

    id = db.Column(db.Integer, primary_key=True)

    event_id = db.Column(
        db.Integer,
        db.ForeignKey("events.id"),
        nullable=False
    )

    interest_id = db.Column(
        db.Integer,
        db.ForeignKey("interests.id"),
        nullable=False
    )

    event = db.relationship(
        "Event",
        back_populates="interests"
    )

    interest = db.relationship("Interest")