import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "../assets/logo.png";
import rightImage from "../assets/Frame.png";
import businessImg from "../assets/business.png";
import creativeImg from "../assets/creative.png";
import educationImg from "../assets/education.png";
import entertainmentImg from "../assets/entertainment.png";
import fashionImg from "../assets/fashion.png";
import foodImg from "../assets/food.png";
import governmentImg from "../assets/government.png";
import healthImg from "../assets/health.png";
import nonprofitImg from "../assets/nonprofit.png";
import otherImg from "../assets/other.png";
import techImg from "../assets/tech.png";
import travelImg from "../assets/travel.png";

const categories = [
  { name: "Business", img: businessImg },
  { name: "Creative", img: creativeImg },
  { name: "Education", img: educationImg },
  { name: "Entertainment", img: entertainmentImg },
  { name: "Fashion & Beauty", img: fashionImg },
  { name: "Food & Beverage", img: foodImg },
  { name: "Government & Politics", img: governmentImg },
  { name: "Health & Wellness", img: healthImg },
  { name: "Non-Profit", img: nonprofitImg },
  { name: "Other", img: otherImg },
  { name: "Tech", img: techImg },
  { name: "Travel & Tourism", img: travelImg },
];

const Dashboard = () => {
  const [nickname, setNickname] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user ID and token from localStorage after login
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("User not authenticated! Please log in.");
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);
  const handleSaveNickname = async () => {
    if (!nickname) {
        alert("Please enter a nickname");
        return;
    }

    setLoading(true);
    try {
        const token = localStorage.getItem("token"); // Get token
        const response = await fetch("https://portfoliobuilder-g340.onrender.com/api/auth/save-nickname", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Send token
            },
            body: JSON.stringify({ nickname }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Nickname saved successfully!");
            console.log("Updated User:", data.user);
            navigate("/links");
        } else {
            alert(data.error || "Failed to save nickname!");
        }
    } catch (error) {
        console.error("Error saving nickname:", error);
        alert("Server error. Try again later.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="dashboard-containers">
      {/* Left Section */}
      <div className="dashboard-content">
        <img src={logo} alt="Logo" className="dashboard-logo" />

        <div className="form-wrapper">
          <h1>Tell us about yourself</h1>
          <p className="wrapper-p">For a personalized Spark experience</p>

          <input
            type="text"
            placeholder="Tell us your nickname"
            className="input-box"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <p className="category-title">Select one category that best describes your Linktree:</p>

          <div className="category-container">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-btn ${selectedCategory === category.name ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <img src={category.img} alt={category.name} className="category-icon" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="continue-container">
          <button className="continue-btn" onClick={handleSaveNickname} disabled={loading}>
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="dashboard-right">
        <img src={rightImage} alt="Dashboard Illustration" className="right-img2" />
      </div>
    </div>
  );
};

export default Dashboard;
