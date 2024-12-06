from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port for frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB Atlas
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["myappdb"]
users_collection = db["users"]
admin_collection = db["admins"]
event_collection = db["event"]

@app.post("/create-user/")
async def create_user(request: Request):
    data = await request.json()
    user = data.get("username")
    email = data.get("email")
    password = data.get("password")
    

    if not email or not password or not user:
        raise HTTPException(status_code=400, detail="Email, user, and password are required")

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data = {"email": email, "username": user, "password": password}
    users_collection.insert_one(user_data)

    return {"message": "User created successfully"}

@app.post("/login")
async def login_user(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})

    if not user or user["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user_data = {
        "id": str(user["_id"]),
        "email": user["email"],
        "username": user["username"]
    }
    return user_data

@app.post("/create-admin/")
async def create_admin(request: Request):
    data = await request.json()
    club = data.get("clubname")
    email = data.get("email")
    password = data.get("password")
    

    if not email or not password or not club:
        raise HTTPException(status_code=400, detail="Email, clubname, and password are required")

    existing_admin = admin_collection.find_one({"email": email})
    if existing_admin:
        raise HTTPException(status_code=400, detail="Email already registered")

    admin_data = {"email": email, "clubname": club, "password": password}
    admin_collection.insert_one(admin_data)

    return {"message": "Admin created successfully"}

@app.post("/login-admin")
async def login_admin(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    admin = admin_collection.find_one({"email": email})

    if not admin or admin["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Placeholder response for successful login
    admin_data = {
        "id": str(admin["_id"]),
        "email": admin["email"],
        "clubname": admin["clubname"]
    }
    return admin_data

@app.post("/create-event/")
async def create_event(request: Request):
    data = await request.json()
    eventname = data.get("eventname")
    description = data.get("description")
    location = data.get("location")
    clubname = data.get("clubname")
    date = data.get("date")
    

    if not eventname or not clubname or not description or not location or not date:
        raise HTTPException(status_code=400, detail="All fields are required")

    existing_event = event_collection.find_one({"eventname": eventname, "clubname": clubname, "date": date})
    if existing_event:
        raise HTTPException(status_code=400, detail="Event Already Existing")

    event_data = {"eventname": eventname, "clubname": clubname, "description": description, "location": location, "date": date}
    event_collection.insert_one(event_data)

    return {"message": "Event created successfully"}

@app.get("/get-events/")
async def get_events():
    # Retrieve all events from the collection
    events = list(event_collection.find())

    # Convert ObjectId to string for JSON serialization
    for event in events:
        event["_id"] = str(event["_id"])

    return {"events": events}

@app.get("/get-clubs/")
async def get_clubs():
    # Retrieve all events from the collection
    clubs = list(admin_collection.find())

    # Convert ObjectId to string for JSON serialization
    for club in clubs:
        club["_id"] = str(club["_id"])

    return {"clubs": clubs}

@app.put("/join-club/")
async def join_club(request: Request):
    data = await request.json()

    # Validate the club ID in the request
    club_id = data.get("club_id")
    user_id = ObjectId(data.get("user_id"))
    if not club_id:
        raise HTTPException(status_code=400, detail="Club ID is required")

    # Check if the user exists
    user = users_collection.find_one({"_id": user_id})  # Use user_id as a string directly
    if not user:
        raise HTTPException(status_code=404, detail=user_id)

    # Add the club ID to the joinedClubIds array, ensuring no duplicates
    users_collection.update_one(
        {"_id": user_id},
        {"$addToSet": {"joinedClubIds": club_id}}  # $addToSet prevents duplicates
    )
    admin_collection.update_one(
        {"_id": ObjectId(club_id)},
        {"$addToSet": {"member": str(user_id)}}  # $addToSet prevents duplicates
    )

    return {"message": f"User successfully joined the club {club_id}"}

@app.put("/event-rsvp/")
async def event_rsvp(request: Request):
    data = await request.json()

    # Validate the club ID in the request
    event_id = data.get("event_id")
    user_id = ObjectId(data.get("user_id"))
    if not event_id:
        raise HTTPException(status_code=400, detail="Event ID is required")

    # Check if the user exists
    user = users_collection.find_one({"_id": user_id})  # Use user_id as a string directly
    if not user:
        raise HTTPException(status_code=404, detail=user_id)

    # Add the club ID to the joinedClubIds array, ensuring no duplicates
    users_collection.update_one(
        {"_id": user_id},
        {"$addToSet": {"eventRsvps": event_id}}  # $addToSet prevents duplicates
    )
    event_collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$addToSet": {"attending": str(user_id)}}  # $addToSet prevents duplicates
    )
    return {"message": f"User successfully rsvped to event {event_id}"}

@app.post("/unrsvp-event/")
async def unrsvp_event(request: Request):
    """
    Endpoint to un-RSVP a user from an event.
    Removes the user's ID from the `attending` array of the specified event.
    """
    data = await request.json()

    # Validate the event ID and user ID in the request
    event_id = data.get("event_id")
    user_id = ObjectId(data.get("user_id"))
    if not event_id or not user_id:
        raise HTTPException(status_code=400, detail="Event ID and User ID are required")

    # Check if the event exists
    event = event_collection.find_one({"_id": ObjectId(event_id)})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Remove the user ID from the attending array
    result = event_collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$pull": {"attending": str(user_id)}}  # Remove user ID from attending array
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User was not RSVPed to this event")

    # Also remove the event ID from the user's RSVP list, if applicable
    users_collection.update_one(
        {"_id": user_id},
        {"$pull": {"eventRsvps": event_id}}  # Remove event ID from user's RSVP list
    )

    return {"message": f"User successfully un-RSVPed from event {event_id}"}