import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("usersession"); // optional: if you store user info
    navigate("/login");
  };

  return (
    <header className="main-header">
      <nav>
        <ul>
          {!role && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}

          {role === "public" && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/raisecomplaint">Raise Complaints</Link></li>
              <li><Link to="/viewcomplaints">View All Complaints</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          )}

          {role === "department" && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/raisecomplaint">Raise Complaints</Link></li>
              <li><Link to="/viewcomplaints">View All Complaints</Link></li>
              <li><Link to="/resolvecomplaints">Resolve Complaints</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
