import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get the nickname from the URL
import shared from '../assets/shared.png'; // Import your assets as needed
import phonelogo from '../assets/phonelogo.png'; // Import your assets as needed
import "./LinksPage.css";

const PreviewPage = () => {
  const { nickname } = useParams(); // Get the nickname from the URL
  const [userInfo, setUserInfo] = useState({ links: [] }); // Initialize userInfo with links as an empty array
  const [loading, setLoading] = useState(true);
  const [isLinkActive, setIsLinkActive] = useState(true); // State to toggle between links and shops
  const [selectedLayout, setSelectedLayout] = useState("stack"); // Default layout
  const [selectedButtonStyle, setSelectedButtonStyle] = useState({
    border: 'none',
    borderRadius: '100px',
    boxShadow: 'none',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://portfoliobuilder-g340.onrender.com/api/auth/user-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched user info:", response.data);
        setUserInfo(response.data);
        setSelectedLayout(response.data.layoutType || "stack"); // Set the layout type from backend
        setSelectedButtonStyle(response.data.buttonStyles || {
          border: 'none',
          borderRadius: '100px',
          boxShadow: 'none',
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [nickname]);

  const fetchLinks = async () => {
    try {
      const response = await axios.get("https://portfoliobuilder-g340.onrender.com/api/auth/user-links", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserInfo(prev => ({ ...prev, links: response.data })); // Set the fetched links in userInfo
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks(); // Fetch links when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  const renderSocialLinks = () => {
    const filteredLinks = Array.isArray(userInfo.links) 
      ? userInfo.links.filter(link => (isLinkActive ? link.type === 'link' : link.type === 'shop'))
      : [];

    if (selectedLayout === "stack") {
      return filteredLinks.map(link => (
        <button 
          className="social-btn" 
          key={link._id} 
          onClick={() => window.open(link.url, "_blank")}
          style={{ 
            backgroundColor: userInfo.buttonBackgroundColor, 
            border: selectedButtonStyle.border, 
            borderRadius: selectedButtonStyle.borderRadius,
            boxShadow: selectedButtonStyle.boxShadow 
          }} 
        >
          {link.icon && (
            <div className="link-imgs">
              <img src={link.icon} alt={link.title} className="social-icon" />
            </div>
          )}
          <h2 style={{ fontFamily: userInfo.fontStyle, color: userInfo.fontColor }}>{link.title}</h2>
        </button>
      ));
    }

    if (selectedLayout === "grid") {
      return (
        <div className="grid-layout" style={{ backgroundColor: userInfo.themeColor }}>
          {filteredLinks.map(link => (
            <button 
              className="social-btn" 
              key={link._id} 
              onClick={() => window.open(link.url, "_blank")}
              style={{ 
                backgroundColor: userInfo.buttonBackgroundColor, 
                border: selectedButtonStyle.border, 
                borderRadius: selectedButtonStyle.borderRadius,
                boxShadow: selectedButtonStyle.boxShadow 
              }} 
            >
              {link.icon && (
                <div className="link-imgs">
                  <img src={link.icon} alt={link.title} className="social-icon"></img>
                  </div>
              )}
              <h2 style={{ fontFamily: userInfo.fontStyle, color: userInfo.fontColor }}>{link.title}</h2>
            </button>
          ))}
        </div>
      );
    }

    if (selectedLayout === "carousel") {
      return (
        <div className="carousel-layout" style={{ backgroundColor: userInfo.themeColor }}>
          {filteredLinks.map(link => (
            <button 
              className="social-btn" 
              key={link._id} 
              onClick={() => window.open(link.url, "_blank")}
              style={{ 
                backgroundColor: userInfo.buttonBackgroundColor, 
                border: selectedButtonStyle.border, 
                borderRadius: selectedButtonStyle.borderRadius,
                boxShadow: selectedButtonStyle.boxShadow 
              }} 
            >
              {link.icon && (
                <div className="link-imgs">
                  <img src={link.icon} alt={link.title} className="social-icon" />
                </div>
              )}
              <h2 style={{ fontFamily: userInfo.fontStyle, color: userInfo.fontColor }}>{link.title}</h2>
            </button>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="mobile-preview">
      <div className="phone" style={{ backgroundColor: userInfo.themeColor }}>
        <img src={shared} className="shared" alt="" />
        <div className="profile" style={{ backgroundColor: userInfo.bannerColor }}>
          <div className="middle">
            <img src={userInfo.profileImage || 'defaultProfilePic.png'} alt="User  " />
            <h3>@{userInfo.nickname || "No nickname set"}</h3>
          </div>
        </div>
        <div className="toggle-container">
          <button
            className={`toggle-btns ${isLinkActive ? "active" : ""}`}
            onClick={() => setIsLinkActive(true)}
          >
            Link
          </button>
          <button
            className={`toggle-btns ${!isLinkActive ? "active" : ""}`}
            onClick={() => setIsLinkActive(false)}
          >
            Shop
          </button>
        </div>
        <div className="social-links" style={{ backgroundColor: userInfo.themeColor }}>
          {renderSocialLinks()}
        </div>
        <div className="connect">
          <button className="connect-btn">Get Connected</button>
          <img src={phonelogo} className="spark-logo" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;