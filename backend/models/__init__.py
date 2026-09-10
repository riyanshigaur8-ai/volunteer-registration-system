from extensions import db 
from .user import User
from .volunteer import VolunteerProfile
from .organization import Organization, OrganizationMember
from .event import Event
from .application import Application
from .attendance import Attendance
from .certificate import Certificate

from .supporting import (
    Category,
    Skill,
    Interest,
    VolunteerSkill,
    VolunteerInterest,
    EventSkill,
    EventInterest,
)

from .ai import AIRecommendation