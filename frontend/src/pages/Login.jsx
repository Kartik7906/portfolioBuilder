import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo.png"; // Logo path
import rightImage from "../assets/Frame.png"; // Right-side image
import hideEye from "../assets/hide.png"; // Closed eye image
import showEye from "../assets/show.png"; // Open eye image
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // Field-specific errors
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email required*";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format*";
    }
    if (!formData.password) newErrors.password = "Password required*";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("https://link-tree-1-at5n.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");

        // Store token and user ID in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        console.log("Stored Token:", data.token);
        console.log("Stored User ID:", data.user._id);

        navigate("/dashboard"); // Redirect after login
      } else {
        setErrors({ general: data.error || "Invalid credentials!" });
      }
    } catch (err) {
      setErrors({ general: "Server error. Try again later." });
    } finally {
      setLoading(false);
    }
};


const handleAddLink = async (e) => { // Renamed function
  e.preventDefault();
  try {
    const response = await axios.post("https://link-tree-1-at5n.onrender.com/api/auth/add-link", {
      title: linkTitle,
      url: linkUrl,
      icon: selectedIcon,
      type: activeButton, // 'link' or 'shop'
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert(response.data.message); // Show success message
    // Optionally, reset the form
    setLinkTitle("");
    setLinkUrl("");
    setSelectedIcon("");
    setShowForm(false); // Close the form
  } catch (error) {
    console.error("Error adding link:", error);
    alert("Failed to add link. Please try again.");
  }
};


  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <img src={logo} alt="Spark Logo" className="logo" />
        <div className="login-box">
          <h1>Sign in to your Spark</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-groups">
              <input
                type="email"
                name="email"
                placeholder="Spark/User-email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>

            <div className="input-groups">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <img
                src={passwordVisible ? showEye : hideEye}
                alt="Toggle Password Visibility"
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
              {errors.password && <p className="error-msg">{errors.password}</p>}
            </div>

            {errors.general && <p className="error-msg general">{errors.general}</p>} {/* API error messages */}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>

            <a href="#" className="forgot-password">Forgot password?</a>

            <div className="account">
              <p className="signup-text">
                Don't have an account?
                <span onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "#28a263" }}>
                  &nbsp;Sign up
                </span>
              </p>
            </div>

            {/* reCAPTCHA Notice */}
            <p className="recaptcha-text">
              This site is protected by reCAPTCHA and&nbsp;
              <a href="#">Google Privacy Policy</a>&nbsp;and&nbsp;
              <a href="#">Terms of Service</a>&nbsp;apply.
            </p>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <img src={rightImage} alt="Login Banner" className="right-img1" />
      </div>
    </div>
  );
};

export default Login;
