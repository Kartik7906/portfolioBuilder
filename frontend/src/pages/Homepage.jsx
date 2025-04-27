import React from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import frame from "../assets/marketlogo.png";
import Analytics from "../assets/Analytics.png";
import Payment from "../assets/payment.png";
import Content from "../assets/content.png";
import icon from "../assets/icon.png"; // Replace with the actual icon path
import img1 from "../assets/testimonial1.png";
import img2 from "../assets/testimonial.png";
import img3 from "../assets/testimonial1.png";
import img4 from "../assets/testimonial.png";
import audiomack from "../assets/audiomack.png";
import bandisintown from "../assets/bandisintown.png";
import bonfire from "../assets/bonfire.png";
import books from "../assets/books.png";
import buyMeAGift from "../assets/buy-me-a-gift.png";
import cameo from "../assets/cameo.png";
import clubhouse from "../assets/clubhouse.png";
import community from "../assets/community.png";
import contactDetails from "../assets/contact-details.png";
import twitterIcon from "../assets/twitter.png";
import instagramIcon from "../assets/instagram.png";
import youtubeIcon from "../assets/youtube.png";
import tiktokIcon from "../assets/tiktok.png";
import fireIcon from "../assets/fire.png";
const integrationApps = [
  { name: "Audiomack", desc: "Add an Audiomack player to your Linktree", img: audiomack },
  { name: "Bandisintown", desc: "Drive ticket sales by listing your events", img: bandisintown },
  { name: "Bonfire", desc: "Display and sell your custom merch", img: bonfire },
  { name: "Books", desc: "Promote books on your Linktree", img: books },
  { name: "Buy Me A Gift", desc: "Let visitors support you with a small gift", img: buyMeAGift },
  { name: "Cameo", desc: "Make impossible fan connections possible", img: cameo },
  { name: "Clubhouse", desc: "Let your community in on the conversation", img: clubhouse },
  { name: "Community", desc: "Build an SMS subscriber list", img: community },
  { name: "Contact Details", desc: "Easily share downloadable contact details", img: contactDetails },
];
const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logos"><img src={logo} alt="" className="logoo" /><img src={frame} alt="" className="frame"/></div>
        <button className="signup-btns" onClick={() => navigate("/signup")}>
              Sign up free
            </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>The easiest place to update and share your Connection</h1>
          <p>
          Help your followers discover everything you’re sharing all over the internet,
           in one simple place. They’ll thank you for it!
          </p>
          <button className="cta-btn">Get your free Spark</button>
        </div>
        <div className="hero-image">
          <img src={Analytics} alt="Dashboard" />
        </div>
      </section>

      {/* Analytics Section */}
      <section className="analytics">
      <div className="analytics-image">
          <img src={Payment} className="pay" alt="Analytics" />
        </div>
        <div className="analytics-text">
          <h2>Analyze your audience and keep your followers engaged</h2>
          <p>
            Track your engagement over time, monitor revenue and learn what's converting 
            your audience. Make informed updates on the fly to keep them coming back.
          </p>
        </div>
        
      </section>

     

      <section className="content-sharing">
  <div className="content-text">
    <h2>Share limitless content in limitless ways</h2>
    <p>
      Connect your content in all its forms and help followers find more of what 
      they’re looking for. Your TikToks, Tweets, YouTube videos, music, articles, 
      recipes, podcasts, and more – all in one powerful place.
    </p>
  </div>
  <div className="content-preview">
    <img src={Content} alt="Content preview" />
  </div>
</section>


<section className="customer-section">
      <div className="customer-content">
        <h2 className="customer-title">Here's what our <span>customer</span> has to says</h2>
        <button className="customer-button">Read customer stories</button>
      </div>
      <div className="customer-info">
        <img src={icon} alt="Icon" className="customer-icon" />
        <p className="customer-description">
          [short description goes in here]Lorem ipsum is a placeholder text to demonstrate.
        </p>
      </div>
    </section>

      {/* Testimonials Section */}
      <section className="testimonials">
      <div className="testimonial-grid">
        <img src={img1} alt="Testimonial 1" className="testimonial-img img1" />
        <img src={img2} alt="Testimonial 2" className="testimonial-img img2" />
        <img src={img4} alt="Testimonial 4" className="testimonial-img img4" />
        <img src={img3} alt="Testimonial 3" className="testimonial-img img3" />
      </div>
    </section>

      {/* Integrations Section */}
      <section className="integrations">
      <h2>All Link Apps and Integrations</h2>
      <div className="integrations-grid">
        {integrationApps.map((app, index) => (
          <div className="integration" key={index}>
            <img src={app.img} alt={app.name} />
            <div className="integration-info">
              <h2>{app.name}</h2>
              <p>{app.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

  
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Section - Buttons + Links Together */}
        <div className="footer-left">
          {/* Buttons */}
          <div className="footer-buttons">
            <button onClick={() => navigate("/login")}className="login-btns">Log in</button>
            <button  onClick={() => navigate("/signup")} className="signup-btnss">Sign up free</button>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <div className="bottom">
              <p>About Spark</p>
              <p>Blog</p>
              <p>Press</p>
              <p>Social Good</p>
              <p>Contact</p>
            </div>
            <div className="bottom" >
              <p>Careers</p>
              <p>Getting Started</p>
              <p>Features and How-Tos</p>
              <p>FAQs</p>
              <p>Report a Violation</p>
            </div>
            <div className="bottom">
              <p>Terms and Conditions</p>
              <p>Privacy Policy</p>
              <p>Cookie Notice</p>
              <p>Trust Center</p>
            </div>
          </div>
        </div>
<div className="end">
        {/* Footer Text */}
        <p className="footer-text">
          We acknowledge the Traditional Custodians of the land on which our office stands,
           The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, 
           present and emerging.
        </p>

        {/* Social Icons */}
        <div className="footer-social">
          <img src={twitterIcon} alt="Twitter" />
          <img src={instagramIcon} alt="Instagram" />
          <img src={youtubeIcon} alt="YouTube" />
          <img src={tiktokIcon} alt="TikTok" />
          <img src={fireIcon} alt="Custom Icon" />
        </div>
        </div>
      </div>
    </footer>


    </div>
  );
};

export default Homepage;
