import React, { useEffect, useState } from "react";
import "./ResolveComplaints.css";

const ResolveComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");

  // Load complaints from localStorage
  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);

  // Save complaints to localStorage whenever updated
  const updateComplaints = (updatedList) => {
    setComplaints(updatedList);
    localStorage.setItem("complaints", JSON.stringify(updatedList));
  };

  // Update complaint status
  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    updateComplaints(updated);
  };

  // Update complaint description
  const handleDescriptionChange = (id, newDesc) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, deptDescription: newDesc } : c
    );
    updateComplaints(updated);
  };

  // Report violation flag
  const handleViolation = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, violation: true } : c
    );
    updateComplaints(updated);
  };

  // Like button
  const handleLike = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c
    );
    updateComplaints(updated);
  };

  // Filter complaints
  const filteredComplaints = complaints.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.reportedBy?.toLowerCase().includes(search.toLowerCase()) ||
      c.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="resolve-container">
      <h2>Resolve Complaints</h2>

      {/* Search bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search complaint..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Filter</button>
      </div>

      {/* Complaint list */}
      <div className="complaints-list">
        {filteredComplaints.map((c) => (
          <div key={c.id} className="complaint-card">
            <h3>{c.name || "Complaint"}</h3>
            <p><b>Reported By:</b> {c.reportedBy}</p>
            <p><b>Department:</b> {c.department}</p>
            <p><b>Status:</b> {c.status}</p>

            {/* Like button */}
            <button onClick={() => handleLike(c.id)}>
              👍 Like ({c.likes || 0})
            </button>

            {/* Description box */}
            <textarea
              placeholder="Give description..."
              value={c.deptDescription || ""}
              onChange={(e) => handleDescriptionChange(c.id, e.target.value)}
            />

            {/* Report Violation */}
            <button
              onClick={() => handleViolation(c.id)}
              disabled={c.violation}
            >
              {c.violation ? "Violation Reported" : "Report Violation"}
            </button>

            {/* Update status */}
            <select
              value={c.status}
              onChange={(e) => handleStatusChange(c.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Work Initiation">Work Initiation</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResolveComplaints;
