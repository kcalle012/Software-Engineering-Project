import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
// import db, { auth } from "../../FirebaseConfig"; // Commenting out Firebase import
// import { signOut } from "firebase/auth"; // Commenting out Firebase import
import EventCard from "../Events/EventCard";

// Commenting out Firebase methods
// import {
//   collection,
//   getDocs,
//   doc,
//   deleteDoc,
//   getDoc,
// } from "firebase/firestore";

import eventImage1 from "../../Assets/Images/onepiececlub.png";
import eventImage2 from "../../Assets/Images/MikuConcert2.png";
import eventImage3 from "../../Assets/Images/sarahhh.webp";
import eventImage4 from "../../Assets/Images/BobaTime.png";
import eventImage5 from "../../Assets/Images/HostClub.webp";


import onepiece_logo from "../../Assets/Images/onepiece_logo.png";
import miku_logo from "../../Assets/Images/miku_logo.png";
import pokemon_logo from "../../Assets/Images/pokemon_logo.png";
import boba_logo from "../../Assets/Images/food_logo.png";
import host_logo from "../../Assets/Images/host_logo.png";
import "../../"


const ProfilePage = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userEmail, setUserEmail] = useState("demo@demo.com"); // Mock email for demo
  const fileInputRef = useRef(null);
  const [registeredEvents, setRegisteredEvents] = useState([
    // Mock events for demo
    { id: "1", name: "Event 1", description: "Description for Event 1" },
    { id: "2", name: "Event 2", description: "Description for Event 2" },
  ]);

  useEffect(() => {
    // Mock function to simulate user data fetching
    const simulateUserData = () => {
      setUserEmail("demo@demo.com");
      // Fetch mock events
      setRegisteredEvents([
        {
          id: 1,
          title: "Ice Cream Social",
          time: "Wednesday | March 5 | 12:45 pm",
          location: "Student Center Ballrooms",
          organization: "One Piece Club",
          tags: ["free-food"],
          date: "2025-03-05",
          startTime: "12:45",
          endTime: "14:00",
          image: eventImage1,
          groupIcon: onepiece_logo,
          description: `
    Ice Cream Social
      Event Information
      Ahoy, crew! ⚓
      Set sail for a One Piece-themed ice cream adventure! Whether you're a Straw Hat Pirate or a Marine, come feast on delicious frozen treats worthy of a Grand Line voyage.
      
      What's in store? 🍨
      • Devil Fruit-inspired ice cream flavors
      • Pirate-themed toppings & treats
      • One Piece trivia & games
      • Wanted poster photo booth
      • Sea shanties & anime OST vibes
      
      Dress as your favorite character (optional but fun!), bring your nakama, and get ready for a legendary time!
      
      Don’t be a landlubber—join the crew for an adventure of flavors! ⛵`,
        },
        {
          id: 2,
          title: "Miku Concert",
          organization: "Miku Enthusiasts",
          time: "Thursday | March 6 | 2:30 pm",
          location: "Student Center 2C04 - 2nd Floor Lobby",
          tags: [],
          date: "2025-03-06",
          image: eventImage2,
          groupIcon: miku_logo,
          description: "Come join the One Piece club for a high seas adventure",
        },
        {
          id: 3,
          title: "Pet a Pokémon",
          time: "Thursday | March 6 | 7:00 pm",
          location: "Student Center Room 417",
          tags: ["free-stuff"],
          date: "2025-03-06",
          image: eventImage3,
          groupIcon: pokemon_logo,
          description: "Come join the One Piece club for a high seas adventure",
        },
        {
          id: 4,
          title: "Poppin' with Boba",
          organization: "Korean Club",
          time: "Friday | March 7 | 12:45 pm",
          location: "Blanton Hall",
          tags: ["free-food"],
          date: "2025-03-07",
          image: eventImage4,
          groupIcon: boba_logo,
          description: "Come join the One Piece club for a high seas adventure",
        },
        {
          id: 5,
          title: "Host Club Meeting",
          time: "Monday | March 10 | 2:15 pm",
          location: "Music Room 3",
          tags: ["free-food"],
          date: "2025-03-10",
          image: eventImage5,
          groupIcon: host_logo,
          description: "Come join the One Piece club for a high seas adventure",
        },
      ]);
    };

    simulateUserData();
  }, []);

  const handleEventClick = (event) => {
    navigate("/event-details", { state: { event } });
  };

  const removeRegisteredEvent = (eventId) => {
    setRegisteredEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        // For demo, we are not uploading to Firebase
      };
      reader.readAsDataURL(file);
    }
  };

  const getFirstLetter = (email) => {
    return email ? email.split("@")[0].charAt(0).toUpperCase() : "";
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleChangePasswordClick = () => {
    navigate("/change-password");
  };

  const handleLogout = () => {
    // For demo, we simulate a logout
    console.log("Logging out...");
    localStorage.removeItem("user");
    navigate("/");
  };

  const defaultProfilePic = getFirstLetter(userEmail);
  const randomColor = generateRandomColor();

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <div className="profile-picture">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="profile-image"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <div
              className="profile-placeholder"
              style={{
                backgroundColor: randomColor,
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "white",
                margin: "0 auto",
              }}
            >
              {defaultProfilePic}
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        <h1>Password</h1>
        <button
          onClick={handleChangePasswordClick}
          className="change-password-btn"
        >
          Change Password
        </button>

        <h1>Registered Events</h1>
        <div className="event-cards">
          {registeredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <button
                className="remove-button"
                onClick={() => removeRegisteredEvent(event.id)}
                aria-label="Remove event"
              >
                &times;
              </button>

              <EventCard
                event={event}
                onClick={() => handleEventClick(event)}
              />
            </div>
          ))}
        </div>

        <button onClick={handleLogout} className="logout-btn profile-logout">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
