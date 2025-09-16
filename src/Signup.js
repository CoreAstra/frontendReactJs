import React, { useState } from "react";
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    dob: "",
    address: "",
    otherDetails: "",
    username: "",
    password: "",
    profilePhoto: "",
    idProof: "",
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [idPreview, setIdPreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify(formData)); // auto login
    localStorage.setItem("role", "public");
    sessionStorage.setItem("loggedInUser", formData.username);

    alert("Signup successful!");
    window.location.href = "/";
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" onChange={handleChange} required />

        <label>Phone:</label>
        <input type="tel" name="phone" onChange={handleChange} required />

        <label>Date of Birth:</label>
        <input type="date" name="dob" onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="address" onChange={handleChange} required />

        <label>Other Details:</label>
        <input type="text" name="otherDetails" onChange={handleChange} />

        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />

        <label>Profile Photo:</label>
        <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} />
        {profilePreview && <img src={profilePreview} alt="Preview" className="profile-photo-preview" />}

        <label>ID Proof:</label>
        <input type="file" name="idProof" accept="image/*" onChange={handleChange} />
        {idPreview && <img src={idPreview} alt="Preview" className="id-proof-preview" />}

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
}
