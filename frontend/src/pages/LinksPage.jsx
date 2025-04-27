import React from "react";
import axios from "axios"; 
import { useState, useRef, useEffect } from "react";
import "./LinksPage.css";
import linklogo from "../assets/linklogo.png";
import linksIcon from "../assets/links.png"; // Replace with actual icon paths
import appearanceIcon from "../assets/appearance.png";
import analyticsIcon from "../assets/analytic.png";
import settingsIcon from "../assets/settings.png";
import sideuser from "../assets/sideuser.png";
import share from "../assets/share.png";
import user from "../assets/user.png";
import phonelogo from "../assets/phonelogo.png";
import linksIconGreen from "../assets/links-green.png";
import appearanceIconGreen from "../assets/appearance-green.png";
import analyticsIconGreen from "../assets/analytics-green.png";
import settingsIconGreen from "../assets/settings-green.png";
import fireIcon from "../assets/flame.png";
import youtubeIcon from "../assets/youtubeIcon.png";
import instagramIcon from "../assets/instagramIcon.png";
import shared from "../assets/shared.png";
import whiteShopIcon from "../assets/whiteShopIcon.png";
import greyShopIcon from "../assets/greyShopIcon.png";
import signoutIcon from "../assets/signoutIcon.png"; // Your sign-out icon
import instagramIcons from "../assets/insta.png"; // Update the path to your assets
import facebookIcon from "../assets/fb.png";
import youtube from "../assets/utube.png";
import twitterIcon from "../assets/twit.png";
import penIcon from "../assets/pen.png"; // Update the path for the pen icon
import deleteicon from "../assets/delete.png";
import copy from "../assets/copy.png";
import stackIcon from "../assets/stack.png";
import gridIcon from "../assets/grid.png";
import carouselIcon from "../assets/carousel.png";
import vector from "../assets/Vector.png";
import special1 from "../assets/1s.png";
import special2 from "../assets/2s.png";
import special3 from "../assets/3s.png";
import special4 from "../assets/4s.png";
import special5 from "../assets/5s.png";
import "./Dashboard.css"; // Import CSS file
import { LineChart, BarChart, Bar, Cell, Line, XAxis, YAxis, ResponsiveContainer ,} from "recharts";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import ChartDataLabels from "chartjs-plugin-datalabels";


const LinksPage = () => {
  const [activeMenu, setActiveMenu] = useState("Links");
  const [activeButton, setActiveButton] = useState("link");
  const [isLinkActive, setIsLinkActive] = useState(true);
  const [showSignOut, setShowSignOut] = useState(false);
  const profileRef = useRef(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(null); 
  const [isChecked, setIsChecked] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("stack");
  const [selectedFont, setSelectedFont] = useState("DM Sans");
  const [selectedColor, setSelectedColor] = useState("#00000");
  const [profilePic, setProfilePic] = useState(user); 
  const [profileTitle, setProfileTitle] = useState("");
  const [file, setFile] = useState(null);
  const [links, setLinks] = useState([]); // State to hold fetched links
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false); // State to control color picker visibility
  const [selectedLinkId, setSelectedLinkId] = useState(null); // State to hold the selected link ID
  const [bannerColor, setBannerColor] = useState("#00000"); // Default color
  const [shareableLink, setShareableLink] = useState('');
  const [showEditForm, setShowEditForm] = useState(false); // State to control the edit form visibility
  const [editLinkId, setEditLinkId] = useState(null); // ID of the link being edited
    const [isActive, setIsActive] = useState(true);
    const [buttonStyle, setButtonStyle] = useState("solid"); // Default button style
  
    const [activeLinks, setActiveLinks] = useState({});
    const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);
    const [fillColor, setFillColor] = useState("#c9c9c9"); // Default fill color
const [outlineColor, setOutlineColor] = useState("#888888"); // Default outline color
const [softShadowColor, setSoftShadowColor] = useState("#cccccc"); // Default soft shadow color
const [selectedThemeColor, setSelectedThemeColor] = useState(''); // Default theme color

    const availableFonts = [
      { name: "Arial", value: "Arial, sans-serif" },
      { name: "Courier New", value: "'Courier New', monospace" },
      { name: "Georgia", value: "Georgia, serif" },
      { name: "Times New Roman", value: "'Times New Roman', serif" },
      { name: "Verdana", value: "Verdana, sans-serif" },
      { name: "DM Sans", value: "'DM Sans', sans-serif" },
      { name: "Poppins", value: "'Poppins', sans-serif" }, // Added Poppins
      { name: "Roboto", value: "'Roboto', sans-serif" }, // Added Roboto
      { name: "Lato", value: "'Lato', sans-serif" }, // Added Lato
      { name: "Montserrat", value: "'Montserrat', sans-serif" }, // Added Montserrat
      { name: "Open Sans", value: "'Open Sans', sans-serif" }, // Added Open Sans
    ];
    const [selectedButtonStyle, setSelectedButtonStyle] = useState({
      border: 'none',
      borderRadius: '100px',
      boxShadow: 'none',
    });
  const [selectedIcon, setSelectedIcon] = useState("");
  const [bio, setBio] = useState(""); 
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nickname: "", 
    bio: "", 
    bannerColor: "",
    fontStyle: "", // Include font style
    fontColor: "",
    buttonBackgroundColor: "", // The selected button background color
    buttonStyles: { // Add buttonStyles to the userInfo state
      border: 'none',
      borderRadius: '100px',
      boxShadow: 'none',
    },
  });
  const [linkData, setLinkData] = useState({
    title: "",
    url: "",
    icon: "",
    type: "",
  });
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(true);
  
const data = [
  { name: "Linux", value: 1500 },
  { name: "Mac", value: 2800 },
  { name: "iOS", value: 2100 },
  { name: "Windows", value: 3400 },
  { name: "Android", value: 1200 },
  { name: "Other", value: 2500 },
];
const datas = [
  { name: "Link 1", traffic: 1200, color: "#A6F4C5" },
  { name: "Link 2", traffic: 3000, color: "#86E0A3" },
  { name: "Link 3", traffic: 2000, color: "#0F6039" },
  { name: "Link 4", traffic: 3500, color: "#36C766" },
  { name: "Link 5", traffic: 1100, color: "#A6C5A5" },
  { name: "Link 6", traffic: 2200, color: "#1FAE5F" },
];
  const bardata = {
    labels: ["Youtube", "Facebook", "Instagram", "Other"],
    datasets: [
      {
        data: [520, 220, 130, 110],
        backgroundColor: ["#0F6039", "#62E7AC", "#A6F4C5", "#36C766"],
        hoverBackgroundColor: ["#0F6039", "#62E7AC", "#A6F4C5", "#36C766"],
        borderWidth: 0,
        cutout: "70%", // Makes it a donut chart
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true, // Show tooltips only on hover
      },
      datalabels: {
        display: false, // Hide labels on bars
      },
    },
  };
  const colors = ["#A0F0B0", "#94E3B4", "#165B38", "#42D392", "#A0C9A6", "#27AE60"];

  const buttonData = [
    { label: "Air Snow", className: "color-btn snow", color: "#ffffff" },
    { label: "Air Grey", className: "color-btn grey", color: "#ebeff2" },
    { label: "Air Smoke", className: "color-btn smoke", color: "#2A3235" },
    { label: "Air Black", className: "color-btn black", color: "#000000" },
    { label: "Mineral Blue", className: "color-btn blue", color: "##E0F6FF" },
    { label: "Mineral Green", className: "color-btn green", color: "#E0FAEE" },
    { label: "Mineral Orange", className: "color-btn orange", color: "#ffeee1" },
    { label: "Mineral Yellow", className: "color-btn yellow", color: "#FFF8E0" },
  ];

  const handleThemeChange = (color) => {
    setSelectedThemeColor(color); // Update the selected theme color
  };

  const menuItems = [
    { name: "Links", icon: linksIcon, activeIcon: linksIconGreen },
    {
      name: "Appearance",
      icon: appearanceIcon,
      activeIcon: appearanceIconGreen,
    },
    { name: "Analytics", icon: analyticsIcon, activeIcon: analyticsIconGreen },
    { name: "Settings", icon: settingsIcon, activeIcon: settingsIconGreen },
  ];
 
  const handleSelect = (appName) => {
    setSelectedApp(appName);
  };

const [enabledLinks, setEnabledLinks] = useState(
  links.reduce((acc, link) => ({ ...acc, [link._id]: true }), {})
);

  const handleToggleSwitch = async () => {
    // Validate input
    if (!linkTitle || !linkUrl) {
      alert("Please enter both title and URL.");
      return; // Exit if validation fails
    }

    setIsChecked(true); // Set switch to checked

    // Save the link or shop link to the backend
    try {
      const response = await axios.post("https://link-tree-1-at5n.onrender.com/api/auth/add-link", {
        title: linkTitle,
        url: linkUrl,
        icon: activeButton === "link" ? selectedIcon : null, // Only include icon for links
        type: activeButton, // 'link' or 'shop'
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert(response.data.message); // Show success message
      console.log("Saved Link Data:", {
        title: linkTitle,
        url: linkUrl,
        icon: activeButton === "link" ? selectedIcon : null,
        type: activeButton,
      }); // Log the saved link data to the console

      // Reset form fields
      setLinkTitle("");
      setLinkUrl("");
      setSelectedIcon("");
      setShowForm(false); // Close the form
    } catch (error) {
      console.error("Error adding link:", error);
      alert("Failed to add link. Please try again.");
    }
  };



  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("https://link-tree-1-at5n.onrender.com/api/auth/user-info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched user info:", response.data);

        setUserInfo(response.data);
        setProfilePic(response.data.profileImage || user);
        setProfileTitle(response.data.nickname);
        setBio(response.data.bio); // Set the bio in state
        setBannerColor(response.data.bannerColor || '#342b26'); // Set the banner color in state
        setSelectedLayout(response.data.layoutType || "stack"); // Set the layout type
        setSelectedFont(response.data.fontStyle || "DM Sans"); 
        setSelectedColor(response.data.fontColor || "#000000");
        setFillColor(response.data.buttonBackgroundColor ); 
        setSelectedThemeColor(response.data.themeColor || '#FFFFFF'); // Set the fetched theme color

        setSelectedButtonStyle(response.data.buttonStyles || {
      border: 'none',
      borderRadius: '100px',
      boxShadow: 'none',
    });
         // Generate the unique link using the first name
         const uniqueLink = generateUniqueLink(response.data.firstName);
         setShareableLink(uniqueLink);
      } catch (error) {
        console.error("Error fetching user info:", error.response ? error.response.data : error.message);
      }
    };
  
    fetchUserInfo();
  }, []);
 
  
  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await axios.get("https://link-tree-1-at5n.onrender.com/api/auth/profile-image", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.profileImage) {
        setProfilePic(response.data.profileImage); // Set fetched profile image
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };
  
  const handleUpdateUser  = async () => {
    // Validate password and confirm password
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    } else {
      setErrorMessage(""); // Clear error message if passwords match
    }

    try {
      const response = await axios.patch("https://link-tree-1-at5n.onrender.com/api/auth/update-user", {
        ...userInfo,
        password, // Include password in the update request
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
      });
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("Failed to update user info. Please try again.");
    }
  };


// Function to handle custom color input
const handleCustomColorChange = (e) => {
  const color = e.target.value;
  setBannerColor(color);
};


  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const handlePopupToggleSwitch = async () => {
    // Validate input for shop link
    if (!linkTitle || !linkUrl) {
      alert("Please enter both title and URL.");
      return; // Exit if validation fails
    }

    setIsChecked(true); // Set switch to checked

    // Save the shop link to the backend
    try {
      const response = await axios.post("https://link-tree-1-at5n.onrender.com/api/auth/add-link", {
        title: linkTitle,
        url: linkUrl,
        icon: null, // No icon for shop links
        type: "shop", // Set type to 'shop'
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert(response.data.message); // Show success message
      console.log("Saved Shop Link Data:", {
        title: linkTitle,
        url: linkUrl,
        type: "shop",
      }); // Log the saved shop link data to the console

      // Reset form fields
      setLinkTitle("");
      setLinkUrl("");
      setShowPopup(false); // Close the popup

      // Fetch updated links
      fetchLinks();
    } catch (error) {
      console.error("Error adding shop link:", error);
      alert("Failed to add shop link. Please try again.");
    }
  };

   // Function to open the form and reset the checkbox
   const openForm = () => {
    setShowForm(true);
    setIsChecked(false); // Reset checkbox state to unchecked
  };

  const handleAddClick = () => {
    if (activeButton === "link") {
      setShowForm(true);
      setShowPopup(false); // Ensure shop popup is closed
    } else if (activeButton === "shop") {
      setShowPopup(true);
      setShowForm(false); // Ensure link popup is closed
    }
};

// Ensure popups close when switching between "Add Link" and "Add Shop"
const setActiveTab = (tab) => {
  setActiveButton(tab);
  setShowForm(false);  // Close the form popup
  setShowPopup(false); // Close the shop popup
};
  // Close Sign Out when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowSignOut(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    fetchProfileImage(); // Call the function to fetch the profile image
  }, []);


  const handleImageChange = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const formData = new FormData();
      formData.append("image", file); // Append file to FormData object
  
      try {
        // Upload the image to the backend
        const response = await axios.post(
          "https://link-tree-1-at5n.onrender.com/api/auth/upload-profile-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        // Get the new profile image URL from response
        const imageUrl = response.data.user.profileImage;
  
        // Update state
        setProfilePic(imageUrl);
  
        // Save image URL in localStorage
        localStorage.setItem("profileImage", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const handleRemoveImage = () => {
    setProfilePic(null); // Reset the profile picture state
  };



  const handleSave = async () => {
    try {
      console.log("Banner Color:", bannerColor); // Log the banner color

      // Update nickname
      const nicknameResponse = await axios.patch("https://link-tree-1-at5n.onrender.com/api/auth/update-nickname", {
        nickname: profileTitle,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // Update bio
      const bioResponse = await axios.patch("https://link-tree-1-at5n.onrender.com/api/auth/update-bio", {
        bio: bio,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // Update banner color
      await axios.patch("https://link-tree-1-at5n.onrender.com/api/auth/update-banner", {
        bannerColor: bannerColor, // Send the selected banner color to the backend
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // Update userInfo state with the new nickname and bio
      setUserInfo((prev) => ({
        ...prev,
        nickname: nicknameResponse.data.user.nickname,
        bio: bioResponse.data.user.bio, 

      }));
  
      alert("Nickname, Bio, and Banner color updated successfully!");
    } catch (error) {
      console.error("Error updating nickname, bio, or banner color:", error);
      alert("Failed to update. Please try again.");
    }
  };
  
  const fetchLinks = async () => {
    try {
      const response = await axios.get("https://link-tree-1-at5n.onrender.com/api/auth/user-links", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLinks(response.data); // Set the fetched links
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };
  
  useEffect(() => {
    fetchLinks(); // Fetch links when the component mounts
  }, []);

  const handleDeleteLink = async (linkId) => {
    try {
      const response = await axios.delete(`https://link-tree-1-at5n.onrender.com/api/auth/links/${linkId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert(response.data.message); // Show success message
      fetchLinks(); // Refresh the links after deletion
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Failed to delete link. Please try again.");
    }
  };

  const generateUniqueLink = () => {
    const formattedNickname = userInfo.nickname.replace(/\s+/g, '-').toLowerCase(); // Format the nickname for the URL
    return `https://link-tree-flax.vercel.app/preview/${formattedNickname}`; // Generate the unique link
  };

  const handleShareClick = () => {
    const uniqueLink = generateUniqueLink(); // Generate the unique link
    navigator.clipboard.writeText(uniqueLink) // Copy the link to the clipboard
      .then(() => {
        alert('Link copied to clipboard!'); // Notify the user
        window.open(uniqueLink, '_blank'); // Open the link in a new tab
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };


  const handleButtonSelect = (style) => {
    switch (style) {
      case 'solid':
        setSelectedButtonStyle({ border: 'none', borderRadius: '2px' });
        break;
      case 'rounded':
        setSelectedButtonStyle({ border: 'none', borderRadius: '8px' });
        break;
      case 'outlined-rounded':
        setSelectedButtonStyle({ border: 'none', borderRadius: '24px' });
        break;
      case 'outline':
        setSelectedButtonStyle({ border: '1px solid black', borderRadius: '0px' });
        break;
      case 'outline-rounded':
        setSelectedButtonStyle({ border: '1px solid black', borderRadius: '8px' });
        break;
      case 'outline-circle':
        setSelectedButtonStyle({ border: '1px solid black', borderRadius: '24px' });
        break;
      case 'hard-shadow1':
        setSelectedButtonStyle({ border: '1px solid #000000', borderRadius: '24px', boxShadow: '4px 4px 0px 0px #000000' });
        break;
      case 'hard-shadow2':
        setSelectedButtonStyle({ border: '1px solid #000000', borderRadius: '8px', boxShadow: '4px 4px 0px 0px #000000' });
        break;
      case 'hard-shadow3':
        setSelectedButtonStyle({ border: '1px solid #000000', borderRadius: '0px', boxShadow: '4px 4px 0px 0px #000000' });
        break;
      case 'soft-shadow1':
        setSelectedButtonStyle({ border: 'none', borderRadius: '24px', boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' });
        break;
      case 'soft-shadow2':
        setSelectedButtonStyle({ border: 'none', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' });
        break;
      case 'soft-shadow3':
        setSelectedButtonStyle({ border: 'none', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' });
        break;
      default:
        setSelectedButtonStyle({ border: 'none' });
    }
  };


  const renderSocialLinks = () => {
    const filteredLinks = links.filter(link => (isLinkActive ? link.type === 'link' : link.type === 'shop'));
  
    if (selectedLayout === "stack" ) {
      return filteredLinks.map(link => (
        <button 
          className="social-btn" 
          key={link._id} 
          onClick={() => window.open(link.url, "_blank")}
          style={{ 
            backgroundColor: fillColor, 
            border: selectedButtonStyle.border, 
            borderRadius: selectedButtonStyle.borderRadius ,
            boxShadow: selectedButtonStyle.boxShadow 

          }} 
        >
          {link.icon && (
            <div className="link-imgs">
              <img src={link.icon} alt={link.title} className="social-icon" />
            </div>
          )}
          <h2 style={{ fontFamily: selectedFont, color: selectedColor }}>{link.title}</h2>
        </button>
      ));
    }
  
    if (selectedLayout === "grid") {
      return (
        <div className="grid-layout" style={{ backgroundColor: selectedThemeColor }}>
          {filteredLinks.map(link => (
            <button 
              className="social-btn" 
              key={link._id} 
              onClick={() => window.open(link.url, "_blank")}
              style={{ 
                backgroundColor: fillColor, 
                border: selectedButtonStyle.border, 
                borderRadius: selectedButtonStyle.borderRadius ,
                boxShadow: selectedButtonStyle.boxShadow // Apply box shadow

              }} 
            >
              {link.icon && (
                <div className="link-imgs">
                  <img src={link.icon} alt={link.title} className="social-icon" />
                </div>
              )}
              <h2 style={{ fontFamily: selectedFont, color: selectedColor }}>{link.title}</h2>
            </button>
          ))}
        </div>
      );
    }
  
    if (selectedLayout === "carousel") {
      return (
        <div className="carousel-layout"  style={{ backgroundColor: selectedThemeColor }}>
          {filteredLinks.map(link => (
            <button 
              className="social-btn" 
              key={link._id} 
              onClick={() => window.open(link.url, "_blank")}
              style={{ 
                backgroundColor: fillColor, 
                border: selectedButtonStyle.border, 
                borderRadius: selectedButtonStyle.borderRadius ,
                boxShadow: selectedButtonStyle.boxShadow // Apply box shadow

              }} 
            >
              {link.icon && (
                <div className="link-imgs">
                  <img src={link.icon} alt={link.title} className="social-icon" />
                </div>
              )}
              <h2 style={{ fontFamily: selectedFont, color: selectedColor }}>{link.title}</h2>
            </button>
          ))}
        </div>
      );
    }
  };

  const saveSettings = async () => {
    try {
      // Save layout
      await axios.post("https://link-tree-1-at5n.onrender.com/api/auth/save-layout", {
        layout: selectedLayout, // Send the selected layout type
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
      });
  
      // Save font settings
      await axios.patch("https://link-tree-1-at5n.onrender.com/api/auth/save-font", {
        font: selectedFont, // Send the selected font style
        color: selectedColor, // Send the selected font color
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
      });
  
      // Save button background color
      await axios.patch("https://link-tree-1-at5n.onrender.com/api/auth/save-button-color", {
        buttonBackgroundColor: fillColor, // Send the selected button background color
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
      });
  

 // Save theme color
 await axios.patch("https://link-tree-1-at5n.onrender.com/api/auth/save-theme-color", {
  themeColor: selectedThemeColor, // Send the selected theme color
}, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
  },
});


    // Save button styles
    await axios.patch("https://link-tree-1-at5n.onrender.com/api/auth/save-button-styles", {
      buttonStyles: selectedButtonStyle, // Send the selected button styles
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
      },
    });

      alert("Layout, font settings, and button background color saved successfully!"); // Show success message
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };



const toggleFontPicker = () => {
  setIsFontPickerOpen(!isFontPickerOpen);
};

const handleFontChange = (font) => {
  setSelectedFont(font); // Update the selected font
  setIsFontPickerOpen(false); // Close the font picker
};

const handleColorChange = (color) => {
  setBannerColor(color); // Update the banner color state
};

const handleButtonColorChange = (color) => {
  setFillColor(color); // Update the button background color state
};

 // Handle layout change
 const handleLayoutChange = (layout) => {
  setSelectedLayout(layout); // Update the selected layout
};
const handleButtonStyleChange = (style) => {
  setSelectedButtonStyle(style); // Update the selected button style
};
  return (
    <div className="links-page">
      {/* Sidebar */}
      <aside className="sidebar">
  <div className="logolink">
    <img src={linklogo} className="linklogo" alt="" />
    <h2>Spark</h2>
  </div>
  <ul className="menu">
    {menuItems.map((item) => (
      <li
        key={item.name}
        className={activeMenu === item.name ? "menu-item active" : "menu-item"}
        onClick={() => setActiveMenu(item.name)}
      >
        <img
          src={activeMenu === item.name ? item.activeIcon : item.icon}
          alt={item.name}
        />
        <span>{item.name}</span>
      </li>
    ))}
  </ul>
  <div className="profile-container">
    <div
      className="user-profile"
      ref={profileRef}
      onClick={() => setShowSignOut(!showSignOut)}
    >
<img src={profilePic || sideuser} alt="User " className="user" />
      <span>{`${userInfo.firstName} ${userInfo.lastName}`}</span> {/* Display user's full name */}
    </div>
    {showSignOut && (
      <img src={signoutIcon} alt="Sign out" className="signout-icon" />
    )}
  </div>
</aside>

      {/* Main Content */}
      <main className="main-content">
      <header>
          <div className="nav">
            <h1>
              Hi, <span>{`${userInfo.firstName} ${userInfo.lastName}`}</span>! {/* Display user's full name */}
            </h1>
            <p>Congratulations. You got a great response today.</p>
          </div>
          <button className="share-btn" onClick={handleShareClick}>
            <img src={share} alt="" /> Share
          </button>
        </header>
        
        <div className="content">
          {activeMenu === "Links" && (
            <div className="content-container">
            {/* Mobile Preview (Left Side) */}
            <div className="mobile-preview">
  <div className="phone" style={{ backgroundColor: selectedThemeColor }}>
    <img src={shared} className="shared" alt="" />
    <div className="profile"  style={{ backgroundColor: bannerColor }}>
      <div className="middle">
        <img src={profilePic  || user} alt="User " />
        <h3>@{profileTitle || "No nickname set"}</h3>
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
    <div className="social-links" style={{ backgroundColor: selectedThemeColor }}>
    {renderSocialLinks()}
     
    </div>
    <div className="connect">
      <button className="connect-btn">Get Connected</button>
      <img src={phonelogo} className="spark-logo" alt="" />
    </div>
  </div>
</div>
  
        
            {/* Right Side - Profile & Banner Sections */}
            <div className="right-section">
              <h2>Profile</h2>
              {/* Profile Section */}
              <div className="profile-section">
        <div className="profile-box">
        <div className="profile-pic">
            {profilePic ? (
              <img src={profilePic} className="user" alt="User " />
            ) : (
              <img src={user} className="user" alt="Default User" /> // Replace 'user' with your default image URL
            )}
          </div>
          <div className="addbutton">
            <input
              type="file"
              accept="image/*"
              id="file-input"
              style={{ display: "none" }} // Hide the default file input
              onChange={handleImageChange}
            />
            <label htmlFor="file-input" className="pick-image-btn">
              Pick an image
            </label>
            <button className="remove-btn" onClick={handleRemoveImage}>
              Remove
            </button>
          </div>
        </div>
        <div className="profile-title-container">
          <div className="input-wrapper">
          <input
    type="text"
    id="nickname"
    className="profile-title"
    value={profileTitle} // Bind the input to profileTitle state
    onChange={(e) => setProfileTitle(e.target.value)} // Update profile title
  />
            <label htmlFor="profile-title" className="floating-label">
              Profile Title
            </label>
          </div>
        </div>
  
                <div className="bio-container">
                  <div className="input-wrappers">
                  <textarea
  id="bio"
  className="bio-input"
  placeholder=" "
  maxLength="80"
  value={bio} // Bind the textarea to the bio state
  onChange={(e) => setBio(e.target.value)} // Update bio state
  onInput={(e) =>
    (document.getElementById("char-count").textContent = `${e.target.value.length} / 80`)
  }
></textarea>
                    <label htmlFor="bio" className="floating-labels">
                      Bio
                    </label>
                  </div>
                  <span id="char-count" className="char-count">
                    0 / 80
                  </span>
                </div>
              </div>
  
              <div className="toggle">
                <div className="add-links">
                  <button
                    className={`toggle-btn ${
                      activeButton === "link" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("link")} 
                  >
                    <img
                      src={activeButton === "link" ? whiteShopIcon : greyShopIcon}
                      alt="Shop Icon"
                      className="btn-icon"
                    />
                    Add Link
                  </button>
                  <button
                    className={`toggle-btn ${
                      activeButton === "shop" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("shop")}
                  >
                    <img
                      src={activeButton === "shop" ? whiteShopIcon : greyShopIcon}
                      alt="Shop Icon"
                      className="btn-icon"
                    />
                    Add Shop
                  </button>
                </div>
                <button className="add-btn" onClick={handleAddClick}>
                  + Add
                </button>
                {/* Conditional Form Rendering */}
                {showForm && (
                    <div className="form-container">
                    <h3>Enter URL</h3>
                    <div className="url">
                      <div className="input-group">
                        <p>
                          Link title <img src={penIcon} alt="" />
                        </p>
                        <input
                          type="text"
                          placeholder="Enter link title"
                          value={linkTitle}
                          onChange={(e) => setLinkTitle(e.target.value)}
                          required
                        />
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" checked={isChecked} onChange={handleToggleSwitch} />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="urls">
                      <div className="input-group">
                        <p>
                          Link URL <img src={penIcon} alt="" />
                        </p>
                        <input
                          type="text"
                          placeholder="Enter link URL"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          required
                        />
                      </div>
                      <div className="icons">
                        <img src={deleteicon} className="delete" alt="" />
                        <img src={copy} className="copy" alt="" />
                      </div>
                    </div>
                    <hr />
                    <h4>Applications</h4>
                    <div className="apps">
                      {[
                        { name: "Instagram", icon: instagramIcons },
                        { name: "Facebook", icon: facebookIcon },
                        { name: "YouTube", icon: youtube },
                        { name: "X", icon: twitterIcon },
                      ].map((app) => (
                        <div key={app.name} className="app-icon" onClick={() => setSelectedIcon(app.icon)}>
                          <div className={`app ${selectedIcon === app.icon ? "selected" : ""}`}>
                            <img src={app.icon} alt={app.name} />
                          </div>
                          <p>{app.name}</p>
                        </div>
        ))}
      </div>
                 </div>
                )}
                  {showPopup && (
        <div className="form-container1">
          <h3>Enter Shop URL</h3>
          <div className="url1">
            <div className="input-group1">
              <p>
                Link title <img src={penIcon} alt="" />
              </p>
              <input
                type="text"
                placeholder="Enter shop link title"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                required
              />
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handlePopupToggleSwitch}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="urls1">
            <div className="input-group1">
              <p>
                Link URL <img src={penIcon} alt="" />
              </p>
              <input
                type="text"
                placeholder="Enter shop link URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                required
              />
            </div>
            <div className="icons1">
              <img src={deleteicon} className="delete1" alt="" />
              <img src={copy} className="copy1" alt="" />
            </div>
          </div>
        </div>
      )}

<div className="link-container">
      {links.length > 0 ? (
        links.map((link) => (
          <div key={link._id} className="link-card">
            <div className="link-card-header">
             
              <h2 className="strong">{link.title}</h2>
              <img src={penIcon} alt="" />
            </div>
            <div className="link-card-url">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            <img src={penIcon} alt="" />
            </div>
            <div className="link-card-footer">
              <div className="clicks-info">
              <img src={vector} alt="" />
                <span>0 clicks</span>
              </div>
              <div className="actions">
               
                <label className="toggle-switch1">
                 
                <input
                                type="checkbox"
                                checked={activeLinks[link._id] || true} // Default to true
                                onChange={() => toggleLink(link._id)}
                              />
                  <span className="slider"></span>
                </label>
                <img 
              src={deleteicon} 
              alt="Delete" 
              onClick={() => handleDeleteLink(link._id)} // Call delete function on click
              style={{ cursor: 'pointer', marginLeft: '10px' }} // Add cursor pointer and margin
            />
               </div>
            </div>
          </div>
        ))
      ) : (
        <p>No links found.</p>
      )}
    </div>

              </div>
  
              {/* Banner Section (Below Profile) */}
<div className="last">
  <h3>Banner</h3>
  <div className="banner-section">
    <div className="banners">
      <div className="banner-preview" style={{ backgroundColor: bannerColor }}>
        <div className="avatar">
          <img src={profilePic || user} alt="Profile Avatar" />
        </div>

        {/* Username */}
        <h2 className="username">{`@${userInfo.nickname}`}</h2>

        {/* Link with Icon */}
        <div className="link">
          <img src={fireIcon} alt="icon" className="icon" />
          <span>{`@${userInfo.nickname}`}</span>
        </div>
      </div>

      <p>Custom Background Color</p>
      <div className="background-colors">
        <button className="color brown" onClick={() => handleColorChange("#342b26")}></button>
        <button className="color white" onClick={() => handleColorChange("#FFFFFF")}></button>
        <button className="color black" onClick={() => handleColorChange("#000000")}></button>
      </div>

      <div className="square">
  <input
    type="color"
    className="box color-inputs"
    value={bannerColor}
    onChange={(e) => handleColorChange(e.target.value)}
  />
</div>
    </div>
  </div>
  <div className="save-container">
    <button onClick={handleSave} className="save-btn">Save</button>
  </div>
</div>
            </div>
          </div>
          )}
          {activeMenu === "Appearance" && (
            <div className="content-container">
            {/* Mobile Preview (Left Side) */}
            <div className="mobile-preview">
  <div className="phone" style={{ backgroundColor: selectedThemeColor }}>
    <img src={shared} className="shared" alt="" />
    <div className="profile"  style={{ backgroundColor: bannerColor }}>
      <div className="middle">
        <img src={profilePic} alt="User " />
        <h3>{profileTitle || "No nickname set"}</h3>
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
    <div className="social-links" style={{ backgroundColor: selectedThemeColor }}>
    {renderSocialLinks()}
     
    </div>
    <div className="connect">
      <button className="connect-btn">Get Connected</button>
      <img src={phonelogo} className="spark-logo" alt="" />
    </div>
  </div>
</div>
  
            {/* Right Side - Profile & Banner Sections */}
            <div className="right-section">
      <h2>Layout</h2>
      <div className="layout-selector">
        <div className="layout-item">
          <button
            className={`layout-option ${selectedLayout === "stack" ? "active" : ""}`}
            onClick={() => setSelectedLayout("stack")}
          >
            <img src={stackIcon} alt="Stack" className="layout-image" />
          </button>
          <span className="layout-label">Stack</span>
        </div>

        <div className="layout-item">
          <button
            className={`layout-option ${selectedLayout === "grid" ? "active" : ""}`}
            onClick={() => setSelectedLayout("grid")}
          >
            <img src={gridIcon} alt="Grid" className="layout-image" />
          </button>
          <span className="layout-label">Grid</span>
        </div>

        <div className="layout-item">
          <button
            className={`layout-option ${selectedLayout === "carousel" ? "active" : ""}`}
            onClick={() => setSelectedLayout("carousel")}
          >
            <img src={carouselIcon} alt="Carousel" className="layout-image" />
          </button>
          <span className="layout-label">Carousel</span>
        </div>
      </div>
    <div className="right2">
        <h2>Buttons</h2>
        <div className="button-container">
        <h3>Fill</h3>
  <div className="button-row">
    <button className="btn fill solid" onClick={() => handleButtonSelect('solid')}></button>
    <button className="btn fill rounded" onClick={() => handleButtonSelect('rounded')}></button>
    <button className="btn fill outlined-rounded" onClick={() => handleButtonSelect('outlined-rounded')}></button>
  </div>

  <h3>Outline</h3>
  <div className="button-row">
    <button className="btn outline" onClick={() => handleButtonSelect('outline')}></button>
    <button className="btn outline rounded" onClick={() => handleButtonSelect('outline-rounded')}></button>
    <button className="btn outline circle" onClick={() => handleButtonSelect('outline-circle')}></button>
  </div>

  <h3>Hard Shadow</h3>
  <div className="button-row">
    <button className="btn hard-shadow3" onClick={() => handleButtonSelect('hard-shadow3')}></button>
    <button className="btn hard-shadow2 rounded" onClick={() => handleButtonSelect('hard-shadow2')}></button>
    <button className="btn hard-shadow1 circle" onClick={() => handleButtonSelect('hard-shadow1')}></button>
  </div>

  <h3>Soft Shadow</h3>
  <div className="button-row">
    <button className="btn soft-shadow3" onClick={() => handleButtonSelect('soft-shadow3')}></button>
    <button className="btn soft-shadow2 rounded" onClick={() => handleButtonSelect('soft-shadow2')}></button>
    <button className="btn soft-shadow1 circle" onClick={() => handleButtonSelect('soft-shadow1')}></button>
  </div>

      <h3>Special</h3>
      <div className="button-grids">
      
  <img src={special1} className="special wavy" alt="" />
  <img src={special2} className="special wavy" alt="" />
  <img src={special3} className="special wavy" alt="" />
  <button className="btn rounded-shadow"></button>

  <img src={special5} className="special wavy" alt="" />
  <button className="btn solid-black"></button>
  
</div>
<div className="color-picker">
  <div className="color-box">
  <input
      className="clr"
      type="color"
      value={fillColor} // Bind the input value to fillColor state
      onChange={(e) => {
        handleButtonColorChange(e.target.value); // Update fillColor state
      }} 
    />
  </div>
  <span>Button Color</span>
  <span>{fillColor}</span> {/* Display the current color code */}
</div>
<h3>Button Font Color</h3>
<div className="color-picker">
<div 
            className="color-box" 
            style={{ backgroundColor: selectedColor }}
          >
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="color-input"
            />
  </div>
  <span>Button Font Color</span>
  <span>{selectedColor}</span>
</div>
    </div>
    <div className="right4">
  <h2>Fonts</h2>
  <div className="container">
    <div className="section">
      <label className="label">Font</label>
      <div className="font-picker">
        <div
          className="font-box"
          style={{ fontFamily: selectedFont, color: selectedColor }} // Apply the selected font style and color
          onClick={toggleFontPicker} // Toggle font picker on click
        >
          Aa
        </div>
        <span className="font-name">{selectedFont}</span>
      </div>
      {isFontPickerOpen && (
        <div className="font-options">
          {availableFonts.map((font) => (
            <button 
              key={font.value}
              style={{ fontFamily: font.value }}
              onClick={() => handleFontChange(font.value)}
              className={selectedFont === font.value ? "active" : ""}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
      <div className="section">
        <label className="label">Color</label>
        <div className="color-pickers">
          <div 
            className="color-box" 
            style={{ backgroundColor: selectedColor }}
          >
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="color-input"
            />
          </div>
          <div className="color-info">
            <span className="color-select">Color</span>
            <span className="select">{selectedColor}</span>
          </div>
        </div>
      </div>
    </div>
</div>
    <div className="right3">
      <h2>Themes</h2>
      <div className="color-button-container">
  {buttonData.map((button, index) => (
    <div key={index} className="color-button-wrapper">
      <div 
        className={button.className} 
        onClick={() => handleThemeChange(button.color)} // Change theme on click
      >
        <div className="color-icon"></div>
        <div className="color-icon"></div>
        <div className="color-icon"></div>
      </div>
      <p className="color-label">{button.label}</p>
    </div>
  ))}
</div>

    <div className="save-container">
    <button  onClick={saveSettings}  className="save-btn">Save</button>
  </div>
    
    </div>
      </div>
            </div>
          </div>
          )}


          {activeMenu === "Analytics" && (
            <div className="analytic" > 
            <h2>Overview</h2>
             <div className="stats-container">
        <div className="stat-card">
          <p>Clicks on Links</p>
          <h2>2,318</h2>
        </div>
        <div className="stat-card">
          <p>Click on Shop</p>
          <h2>7,265</h2>
        </div>
        <div className="stat-card">
          <p>CTA</p>
          <h2>156</h2>
        </div>
      </div>

      <div className="chart-container1">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 14 }} />
          <YAxis tick={{ fill: "#666", fontSize: 14 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#000"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>

      <div className="charts-row">
         <div style={{ width: "50%", height: 300 , background:"transparent"}}>
           <h3 className="chart-title">Traffic by Device</h3>
           <ResponsiveContainer width="100%" height={300}>
             <BarChart data={data} barSize={50} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
             <XAxis dataKey="name" stroke="#000" />
             <YAxis stroke="#000" />
             <Tooltip />
             <Legend />
             <Bar dataKey="value">
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
               </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>


        <div className="donut-chart-container">
  <h3>Sites</h3>
  <div className="containerss">
  <div className="donut-chart-wrapper">
  <ul className="legend">
      <li><span className="dot" style={{ backgroundColor: "#0F6039" }}></span> Youtube <span className="value">520</span></li>
      <li><span className="dot" style={{ backgroundColor: "#62E7AC" }}></span> Facebook <span className="value">220</span></li>
      <li><span className="dot" style={{ backgroundColor: "#A6F4C5" }}></span> Instagram <span className="value">130</span></li>
      <li><span className="dot" style={{ backgroundColor: "#36C766" }}></span> Other <span className="value">110</span></li>
    </ul>
    <div className="donut-chart">
    <Doughnut data={bardata} options={options} plugins={[ChartDataLabels]} />
    </div>
    </div>
    
  </div>
</div>

      
      </div>
      <div className="hr">
      <h3 className="chart-title">Traffic by links</h3>

      </div>
      <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datas} barGap={30}>
          <XAxis
            dataKey="name" // Ensure your data has a "name" field
            tick={{ fill: "#blue", fontSize: 14 }}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(value) => `${value / 1000}K`}
            tick={{ fill: "#000", fontSize: 14 }}
            axisLine={false}
          />
          <Tooltip />
          <Bar dataKey="traffic" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
            </div>
          )}


{activeMenu === "Settings" && (
            <div className="edit">
              <div className="edit-profile-container">
                <h2 className="edit-profile-title">Edit Profile</h2>
                <div className="edit-profile-content">
                  <div className="signup-container">
                  <form className="signup-form">
                      <label>First name</label>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                      />

                      <label>Last name</label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                      />

                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      />

                      <label>Password</label>
                      <input
                        type="password"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                      />

                      <label>Confirm Password</label>
                      <input
                        type="password"
                        placeholder="**********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                      />
                      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Show error message */}
                    </form>
                  </div>
                </div>
                <button className="save-button" onClick={handleUpdateUser }>Save</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LinksPage;
