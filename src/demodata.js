// demodata.js

export const complaintsData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  heading: `Issue #${i + 1} - Civic Problem`,
  details: `Detailed description about civic issue number ${i + 1}, affecting the community.`,
  location: [
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Delhi",
    "Hyderabad",
    "Mumbai",
    "Pune",
    "Kolkata",
    "Jaipur",
  ][i % 8],
  reporter: [
    "Ravi Kumar",
    "Priya Sharma",
    "Amit Verma",
    "Sneha Iyer",
    "Arjun Mehta",
    "Fatima Khan",
    "Rajesh Gupta",
    "Neha Reddy",
  ][i % 8],
  profileLink: "#",
  intensity: ["High", "Medium", "Low"][i % 3],
  img: "https://via.placeholder.com/150",
}));

export const leaderboardData = [
  { id: 1, name: "Ravi Kumar", city: "Bangalore", score: 92 },
  { id: 2, name: "Priya Sharma", city: "Chennai", score: 87 },
  { id: 3, name: "Amit Verma", city: "Delhi", score: 80 },
  { id: 4, name: "Sneha Iyer", city: "Hyderabad", score: 75 },
  { id: 5, name: "Arjun Mehta", city: "Mumbai", score: 70 },
];

export const analyticsData = Array.from({ length: 30 }, (_, i) => ({
  city: `City ${i + 1}`,
  percentage: Math.floor(Math.random() * 50) + 50, // random 50–100
}));
const demoComplaints = [
  {
    name: "Ramesh Kumar",
    department: "Electricity",
    sector: "Sector 21",
    description: "Street lights not working for 3 days.",
    location: "Main Road, Sector 21",
    files: ["photo1.jpg"],
    createdAt: "2025-09-15T10:00:00Z",
    status: "Pending",
  },
  {
    name: "Priya Sharma",
    department: "Water",
    sector: "Sector 14",
    description: "Water leakage near park.",
    location: "Near Green Park, Sector 14",
    files: ["leakage.png"],
    createdAt: "2025-09-14T08:30:00Z",
    status: "Resolved",
  },
];

export default demoComplaints;
