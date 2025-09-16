import React, { useEffect, useState } from "react";
import "./complaints.css";

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(stored);

    // Load likes
    const storedLikes = JSON.parse(localStorage.getItem("complaintLikes")) || {};
    setLikes(storedLikes);
  }, []);

  const handleLike = (index) => {
    const updatedLikes = { ...likes, [index]: (likes[index] || 0) + 1 };
    setLikes(updatedLikes);
    localStorage.setItem("complaintLikes", JSON.stringify(updatedLikes));
  };

  const filteredComplaints = complaints.filter((c) =>
    [c.name, c.department, c.sector, c.location, c.description]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Sort trending complaints
  const trendingComplaints = [...complaints].sort(
    (a, b) => (likes[complaints.indexOf(b)] || 0) - (likes[complaints.indexOf(a)] || 0)
  );

  return (
    <div className="complaints-page">
      <h2 className="page-title">View All Complaints</h2>

      {/* Search + filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name, area, department, sector..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="filter-btn">Filter</button>
      </div>

      {/* Complaints grid */}
      <div className="complaints-grid">
        {filteredComplaints.length === 0 ? (
          <p className="empty-msg">No complaints found.</p>
        ) : (
          filteredComplaints.map((c, index) => (
            <div key={index} className="complaint-card">
              <div className="complaint-header">
                <h3>{c.department} Dept</h3>
                <span className={`status ${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </div>

              <p><strong>Reporter:</strong> {c.name}</p>
              <p><strong>Sector:</strong> {c.sector}</p>
              <p><strong>Location:</strong> {c.location}</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p><strong>Date:</strong> {new Date(c.createdAt).toLocaleString()}</p>

              <div className="files-section">
                <strong>Files:</strong>
                <ul>
                  {c.files.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Like + View */}
              <div className="complaint-actions">
                <button onClick={() => handleLike(index)}>
                  👍 {likes[index] || 0}
                </button>
                <button>View</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Map placeholder */}
      <div className="map-section">
        <h3>Complaints in Your Locality</h3>
        <div className="map-placeholder">
          <p>Map will be displayed here</p>
        </div>
      </div>

      {/* Trending complaints */}
      <div className="trending-section">
        <h3>Trending Complaints</h3>
        <div className="trending-list">
          {trendingComplaints.slice(0, 3).map((c, i) => (
            <div key={i} className="trending-card">
              <p><strong>{c.department}</strong> - {c.description}</p>
              <span>👍 {likes[complaints.indexOf(c)] || 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewComplaints;
