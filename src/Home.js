// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

import { complaintsData, leaderboardData, analyticsData } from "./demodata";

export default function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [leaderboardSearch, setLeaderboardSearch] = useState("");

  const [complaints, setComplaints] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    setComplaints(complaintsData);
    setLeaderboard(leaderboardData);
    setAnalytics(analyticsData);
  }, []);

  const filteredComplaints = complaints.filter(
    (c) =>
      c.heading.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.reporter.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCities = analytics.filter((a) =>
    a.city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredLeaderboard = leaderboard.filter(
    (u) =>
      u.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
      u.city.toLowerCase().includes(leaderboardSearch.toLowerCase())
  );

  return (
    <div className="app-container">

      {/* Hero Section */}
      <section className="hero">
        <button className="nav-btn">❮</button>
        <h2>Map showing complaints intensity</h2>
        <div className="map-placeholder">[ Map visualization here ]</div>
        <button className="nav-btn">❯</button>
      </section>

      {/* Search + Filter for Complaints */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search complaint by name, department, area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Filter</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </section>

      {/* Complaints */}
      <section className="complaints-list">
        {filteredComplaints
          .filter((c) => (filter ? c.intensity === filter : true))
          .map((c) => (
            <div key={c.id} className="complaint-card">
              <h3>{c.heading}</h3>
              <img src={c.img} alt={c.heading} />
              <p>{c.details}</p>
              <p>
                <strong>Reporter:</strong>{" "}
                <a href={c.profileLink}>{c.reporter}</a>
              </p>
              <p>
                <strong>Location:</strong> {c.location}
              </p>
              <span className={`intensity ${c.intensity.toLowerCase()}`}>
                {c.intensity}
              </span>
              <button className="like-btn">👍 Like</button>
            </div>
          ))}
      </section>

      {/* Analytics */}
      <section className="analytics">
        <h2>City/Department Rankings</h2>
        <input
          type="text"
          placeholder="Search city/department..."
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          className="city-search"
        />
        <div className="analytics-scroll">
          {filteredCities.map((a) => (
            <div key={a.city} className="small-card">
              {a.city} - {a.percentage}%
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="leaderboard">
        <h2>Civic Leaderboard</h2>
        <input
          type="text"
          placeholder="Search by username, city"
          value={leaderboardSearch}
          onChange={(e) => setLeaderboardSearch(e.target.value)}
        />
        <div className="vertical-scroll">
          {filteredLeaderboard.map((user) => (
            <div key={user.id} className="leaderboard-item">
              <strong>{user.name}</strong> ({user.city}) – Score: {user.score}
            </div>
          ))}
        </div>
        <div className="horizontal-scroll">
          {filteredLeaderboard.map((user) => (
            <div key={user.id} className="rank-card">
              {user.name} – {user.score}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-links">
          <a href="#">About Us</a> | <a href="#">Help</a> |{" "}
          <a href="#">Contact</a> | <a href="#">Privacy Policy</a> |{" "}
          <a href="#">Accessibility</a>
        </div>
        <p>
          © {new Date().getFullYear()} CivicConnect — An initiative to improve
          civic participation and public accountability.
        </p>
      </footer>
    </div>
  );
}
