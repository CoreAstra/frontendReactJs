// RaiseComplaint.js
import React, { useState, useEffect } from "react";
import "./complaints.css";

const RaiseComplaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    sector: "",
    description: "",
    location: "",
  });
  const [files, setFiles] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");

  // handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file uploads
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (files.length + newFiles.length > 10) {
      alert("You can upload a maximum of 10 files.");
      return;
    }
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // get location
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setCurrentLocation(locationString);
          setFormData((prev) => ({ ...prev, location: locationString }));
          alert("Location detected automatically!");
        },
        () => {
          alert("Unable to fetch location. Please enter manually.");
        }
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // manual validation
    if (formData.name.length < 3) {
      alert("Name must be at least 3 characters.");
      return;
    }
    if (!formData.department) {
      alert("Please select a department.");
      return;
    }
    if (!formData.sector) {
      alert("Sector is required.");
      return;
    }
    if (formData.description.length < 20) {
      alert("Description must be at least 20 characters.");
      return;
    }
    if (!formData.location) {
      alert("Location is required.");
      return;
    }
    if (files.length < 2) {
      alert("Please upload at least 2 files.");
      return;
    }

    // save to localStorage
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    const newComplaint = {
      ...formData,
      files: files.map((f) => f.name),
      createdAt: new Date().toISOString(),
      status: "Pending",
    };
    localStorage.setItem("complaints", JSON.stringify([...complaints, newComplaint]));

    alert("Complaint submitted successfully!");
    setFormData({ name: "", department: "", sector: "", description: "", location: "" });
    setFiles([]);
    setCurrentLocation("");
  };

  return (
    <div className="complaint-container">
      <h2 className="page-title">Raise a Complaint</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Department:
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </label>

        <label>
          Sector:
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location:
          <div className="location-box">
            <input
              type="text"
              name="location"
              value={formData.location || currentLocation}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={getCurrentLocation} className="location-btn">
              Detect Location
            </button>
          </div>
        </label>

        <label>
          Upload Files (min 2, max 10):
          <input type="file" multiple onChange={handleFileChange} />
        </label>
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              {file.name}
              <button type="button" onClick={() => removeFile(index)}>×</button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default RaiseComplaint;
