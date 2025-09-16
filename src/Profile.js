import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePreview, setProfilePreview] = useState(null);
  const [idPreview, setIdPreview] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("currentUser"));
    if (stored) {
      setUser(stored);
      setFormData(stored);
      setProfilePreview(stored.profilePhoto || null);
      setIdPreview(stored.idProof || null);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
        if (name === "profilePhoto") setProfilePreview(reader.result);
        if (name === "idProof") setIdPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === formData.username ? formData : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  if (!user) {
    return (
      <div className="profile-page">
        <h2 className="profile-title">Profile</h2>
        <p>Please login first.</p>
      </div>
    );
  }

  const isDepartment = user.role === "department"; // role check

  return (
    <div className="profile-page">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-box">
        {/* VIEW MODE */}
        {!isEditing || isDepartment ? (
          <>
            {profilePreview && (
              <img
                src={profilePreview}
                alt="Profile"
                className="profile-photo"
              />
            )}
            {idPreview && (
              <img src={idPreview} alt="ID Proof" className="id-proof-preview" />
            )}

            <p><strong>Full Name:</strong> {user.fullName || "N/A"}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {user.dob || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
            <p><strong>Other Details:</strong> {user.otherDetails || "N/A"}</p>
            <p><strong>Username:</strong> {user.username}</p>

            {/* Only public users can edit */}
            {!isDepartment && (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </>
        ) : (
          // EDIT MODE (only for public users)
          <div className="profile-form">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
            />

            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />

            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleChange}
            />

            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
            />

            <label>Other Details:</label>
            <input
              type="text"
              name="otherDetails"
              value={formData.otherDetails || ""}
              onChange={handleChange}
            />

            <label>Profile Photo:</label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
            />
            {profilePreview && (
              <img
                src={profilePreview}
                alt="Preview"
                className="profile-photo-preview"
              />
            )}

            <label>ID Proof:</label>
            <input
              type="file"
              name="idProof"
              accept="image/*"
              onChange={handleChange}
            />
            {idPreview && (
              <img
                src={idPreview}
                alt="Preview"
                className="id-proof-preview"
              />
            )}

            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
