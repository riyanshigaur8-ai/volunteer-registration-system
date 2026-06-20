from flask import Flask, request
from config import Config
from models import db, Volunteer, Event, Registration
import bcrypt
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)

@app.route("/")
def home():
    return {"message": "Volunteer Registration System API"}

@app.route("/register", methods=["POST"])
def register():
    data = request.json

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    volunteer = Volunteer(
    name=data["name"],
    email=data["email"],
    phone=data["phone"],
    password=hashed_password.decode("utf-8"),
    role="volunteer"
)
    db.session.add(volunteer)
    db.session.commit()

    return {"message": "Volunteer registered successfully"}

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    volunteer = Volunteer.query.filter_by(
        email=data["email"]
    ).first()

    existing_user = Volunteer.query.filter_by(
    email=data["email"]
    ).first()

    # if existing_user:
    #     return {"message": "Email already registered"}, 400

    if not volunteer:
        return {"message": "Invalid email or password"}, 401

    if bcrypt.checkpw(
        data["password"].encode("utf-8"),
        volunteer.password.encode("utf-8")
    ):
       return {
    "message": "Login successful",
    "id": volunteer.id,
    "name": volunteer.name,
    "email": volunteer.email,
    "phone": volunteer.phone,
    "role": volunteer.role,
    "dob": volunteer.dob,
    "address": volunteer.address,
    "city": volunteer.city,
    "state": volunteer.state,
    "pincode": volunteer.pincode
}

    return {"message": "Invalid email or password"}, 401


@app.route("/events", methods=["POST"])
def create_event():

    data = request.json

    event = Event(
        title=data["title"],
        description=data["description"],
        date=data["date"],
        location=data["location"],
        category=data["category"],
        image_url=data.get(
            "image_url",
            ""
        )
    )

    db.session.add(event)
    db.session.commit()

    return {
        "message":
        "Event created successfully"
    }

@app.route("/events", methods=["GET"])
def get_events():

    events = Event.query.all()

    result = []

    for event in events:

        result.append({

            "id": event.id,
            "title": event.title,
            "description": event.description,
            "date": event.date,
            "location": event.location,
            "category": event.category,
            "image_url": event.image_url

        })

    return result


@app.route("/events/<int:event_id>", methods=["PUT"])
def update_event(event_id):

    event = Event.query.get(event_id)

    if not event:

        return {
            "message": "Event not found"
        }, 404

    data = request.json

    event.title = data["title"]
    event.description = data["description"]
    event.date = data["date"]
    event.location = data["location"]
    event.category = data["category"]

    db.session.commit()

    return {
        "message":
        "Event updated successfully"
    }

@app.route("/join-event", methods=["POST"])
def join_event():

    data = request.json

    existing_registration = (
        Registration.query.filter_by(
            volunteer_id=data["volunteer_id"],
            event_id=data["event_id"]
        ).first()
    )

    if existing_registration:

        return {
            "message":
            "You have already joined this event"
        }, 400

    registration = Registration(
        volunteer_id=data["volunteer_id"],
        event_id=data["event_id"]
    )

    db.session.add(registration)
    db.session.commit()

    return {
        "message":
        "Successfully joined event"
    }



@app.route("/my-events/<int:volunteer_id>", methods=["GET"])
def my_events(volunteer_id):

    registrations = Registration.query.filter_by(
        volunteer_id=volunteer_id
    ).all()

    result = []

    for registration in registrations:

        event = Event.query.get(registration.event_id)

        result.append({
            
    "id": event.id,
    "title": event.title,
    "description": event.description,
    "date": event.date,
    "location": event.location,
    "category": event.category

        })

    return result

@app.route("/stats/volunteers")
def total_volunteers():

    count = Volunteer.query.count()

    return {"total": count}

@app.route("/stats/events")
def total_events():

    count = Event.query.count()

    return {"total": count}

@app.route("/stats/registrations")
def total_registrations():

    count = Registration.query.count()

    return {"total": count}

@app.route("/volunteers")
def get_volunteers():

    volunteers = Volunteer.query.all()

    result = []

    for volunteer in volunteers:

        result.append({
            "id": volunteer.id,
            "name": volunteer.name,
            "email": volunteer.email,
            "phone": volunteer.phone
        })

    return result

@app.route("/events/<int:id>", methods=["DELETE"])
def delete_event(id):

    event = Event.query.get(id)

    if not event:
        return {"message": "Event not found"}, 404

    db.session.delete(event)

    db.session.commit()

    return {
        "message": "Event deleted successfully"
    }


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)