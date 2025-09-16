import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [pubUsername, setPubUsername] = useState("");
  const [pubPassword, setPubPassword] = useState("");

  const [deptUsername, setDeptUsername] = useState("");
  const [deptPassword, setDeptPassword] = useState("");

  const handlePublicLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === pubUsername && u.password === pubPassword
    );

    if (user) {
    alert("Public Login successful!");
    const currentUser = { ...user, role: "public" }; // ✅ attach role
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("role", "public");
    window.location.href = "/";
  }else {
      alert("Invalid department username or password!");
    }
  };

  const handleDepartmentLogin = (e) => {
    e.preventDefault();

    const departments = JSON.parse(localStorage.getItem("departments")) || [
      { username: "adminDept", password: "admin123" },
      { username: "waterDept", password: "water123" },
    ];

    const dept = departments.find(
      (d) => d.username === deptUsername && d.password === deptPassword
    );

    if (dept) {
      alert("Department Login successful!");
      const currentUser = { ...dept, role: "department" }; // ✅ attach role
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("role", "department");
      window.location.href = "/";
    } else {
      alert("Invalid department username or password!");
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Login</h2>

      <div className="login-boxes">
        {/* Public Login */}
        <div className="login-box">
          <h3>Public Login</h3>
          <form className="login-form" onSubmit={handlePublicLogin}>
            <label>Username:</label>
            <input
              type="text"
              value={pubUsername}
              onChange={(e) => setPubUsername(e.target.value)}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              value={pubPassword}
              onChange={(e) => setPubPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>

        {/* Department Login */}
        <div className="login-box">
          <h3>Department Login</h3>
          <form className="login-form" onSubmit={handleDepartmentLogin}>
            <label>Department Username:</label>
            <input
              type="text"
              value={deptUsername}
              onChange={(e) => setDeptUsername(e.target.value)}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              value={deptPassword}
              onChange={(e) => setDeptPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
