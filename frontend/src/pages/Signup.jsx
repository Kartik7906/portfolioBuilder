import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import logo from "../assets/logo.png"; 
import rightImage from "../assets/Frame.png"; 

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({}); // Store field-specific errors
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name required*";
    if (!formData.lastName) newErrors.lastName = "Last name required*";
    if (!formData.email) {
      newErrors.email = "Email required*";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email*";
    }
    if (!formData.password) newErrors.password = "Password required*";
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password required*";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password did not match*";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    try {
      const response = await fetch("https://portfoliobuilder-g340.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        setErrors({ general: data.error || "Something went wrong. Please try again." });
      }
    } catch (err) {
      setErrors({ general: "Server error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="signup-left">
        <img src={logo} alt="Spark Logo" className="logo" />
        <div className="signup-box">
          <h1>Create an account</h1>
          <div className="auth-toggle">
            <span className="active">Create an account</span>
            <span className="signin" onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "#28a263" }}>
              Sign in instead
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <label>First name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            {errors.firstName && <p className="error-msg">{errors.firstName}</p>}

            <label>Last name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            {errors.lastName && <p className="error-msg">{errors.lastName}</p>}

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="error-msg">{errors.email}</p>}

            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="error-msg">{errors.password}</p>}

            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}

            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                By creating an account, I agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            {errors.general && <p className="error-msg general">{errors.general}</p>} {/* General API errors */}

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating account..." : "Create an account"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <img src={rightImage} alt="Sign Up Banner" className="right-img" />
      </div>
    </div>
  );
};

export default SignUp;
