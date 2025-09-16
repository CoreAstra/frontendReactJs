import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import RaiseComplaint from "./RaiseComplaint";
import ViewComplaints from "./ViewComplaints";
import Profile from "./Profile";
import ResolveComplaints from "./ResolveComplaints";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/raisecomplaint" element={<RaiseComplaint />} />
        <Route path="/viewcomplaints" element={<ViewComplaints />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="resolvecomplaints" element={<ResolveComplaints />} />
      </Routes>
    </Router>
  );
}

export default App;
