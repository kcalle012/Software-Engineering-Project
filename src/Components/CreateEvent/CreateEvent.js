import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.scss";

// Comment out Firebase imports for demo
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { app, storage } from "../../FirebaseConfig";

const CreateEvent = ({ addEvent }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    location: "",
    image: "",
    groupIcon: "",
    description: "",
    organization: "",
    startTime: "",
    endTime: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mock image upload for demo
      const mockUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: mockUrl,
      }));
    }
  };

  const handleGroupIconChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mock icon upload for demo
      const mockUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        groupIcon: mockUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create mock event object
      const newEvent = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        tags: formData.tags
          .toString()
          .split(",")
          .map((tag) => tag.trim()),
      };

      // Skip Firestore; just call addEvent
      addEvent(newEvent);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating mock event:", err);
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event">
        <h2>Create a New Event</h2>
        <form onSubmit={handleSubmit}>
          {/* input fields unchanged */}
          {/* ... same form content as before ... */}
        </form>
      </div>

      <div className="preview">
        <h2>Event Preview</h2>
        <h3>{formData.title}</h3>
        <p>
          <strong>Organization:</strong> {formData.organization}
        </p>
        <p>
          <strong>Date:</strong> {formData.startTime} - {formData.endTime}
        </p>
        <p>
          <strong>Location:</strong> {formData.location}
        </p>
        <p>
          <strong>Tags:</strong> {formData.tags}
        </p>
        <p>{formData.description}</p>
        {formData.image && <img src={formData.image} alt="Event" />}
        {formData.groupIcon && (
          <p>
            <img
              src={formData.groupIcon}
              alt="Group Icon"
              className="preview-icon"
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
