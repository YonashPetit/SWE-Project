from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
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