const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const Link = require('../models/Link');

// ✅ Generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ✅ Signup User
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.saveNickname = async (req, res) => {
    try {
      const { nickname } = req.body;
  
      // Validate input
      if (!nickname) {
        return res.status(400).json({ error: "Nickname is required" });
      }
  
     
    // Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }

    // Update user information
    user.nickname = nickname; // Update the nickname field
    const updatedUser  = await user.save(); // Save the updated user
      res.status(200).json({
        message: "Nickname saved successfully",
        user: updatedUser ,
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };



  exports.updateNickname = async (req, res) => {
    try {
      const { nickname } = req.body;
  
      // Validate input
      if (!nickname) {
        return res.status(400).json({ error: "Nickname is required" });
      }
  
      // Check if user exists
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User  not found" });
      }
  
      // Update user nickname
      user.nickname = nickname; // Update the nickname field
      const updatedUser  = await user.save(); // Save the updated user
  
      res.status(200).json({
        message: "Nickname updated successfully",
        user: updatedUser ,
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };


exports.getUserInfo = async (req, res) => {
  try {
    const user = req.user; // The user is attached by the authMiddleware

    // Return the user's information (excluding the password)
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage: user.profileImage, 
      nickname: user.nickname, // Include the nickname
      bio: user.bio, // Include the bio
      bannerColor: user.bannerColor, // Include the banner color
      layoutType: user.layoutType, 
      fontStyle: user.fontStyle, // Include font style
      fontColor: user.fontColor, // Include font color
      buttonBackgroundColor: user.buttonBackgroundColor, // Include button background color
      buttonStyles: user.buttonStyles ,// Include button styles
      themeColor: user.themeColor // Include theme color

    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};


exports.updateUser  = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    console.log("Updating user with ID:", req.user._id); // Debug log

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }

    // Update fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      message: "User  updated successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error); // Debug log
    res.status(500).json({ error: "Something went wrong" });
  }
};



// Endpoint to upload profile image
exports.uploadProfileImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const imageUrl = `https://link-tree-1-at5n.onrender.com/uploads/${req.file.filename}`;
  try {
    // Update the user's profile image in the database
    const updatedUser   = await User.findByIdAndUpdate(
      req.user.id, // Use the user ID from the token
      { profileImage: imageUrl },
      { new: true } // Return the updated user
    );

    res.status(200).json({
      message: "Profile image uploaded successfully",
      user: updatedUser  ,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ✅ Fetch Profile Image
exports.getProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch user by ID

    if (!user || !user.profileImage) {
      return res.status(404).json({ error: "Profile image not found" });
    }

    res.status(200).json({ profileImage: user.profileImage });
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};



// In your authController.js
exports.updateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    // Validate input
    if (bio === undefined) {
      return res.status(400).json({ error: "Bio is required" });
    }

    // Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }

    // Update user bio
    user.bio = bio; // Update the bio field
    const updatedUser  = await user.save(); // Save the updated user

    res.status(200).json({
      message: "Bio updated successfully",
      user: {
        _id: updatedUser ._id,
        firstName: updatedUser .firstName,
        lastName: updatedUser .lastName,
        email: updatedUser .email,
        nickname: updatedUser .nickname,
        bio: updatedUser .bio, // Return the updated bio
      },
    });
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};




exports.addLink = async (req, res) => {
  try {
    const { title, url, icon, type } = req.body;

    // Validate that the type is either 'link' or 'shop'
    if (!['link', 'shop'].includes(type)) {
      return res.status(400).json({ error: 'Invalid link type' });
    }

    // Create a new link
    const newLink = new Link({
      userId: req.user.id, // Get the user ID from the request
      title,
      url,
      icon: type === 'link' ? icon : null, // Only set icon if type is 'link'
      type,
    });

    await newLink.save();
    res.status(201).json({ message: 'Link added successfully', link: newLink });
  } catch (error) {
    console.error('Error adding link:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


exports.getUserLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user.id }); // Find links for the user
    res.status(200).json(links);
  } catch (error) {
    console.error('Error fetching user links:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


// ✅ Delete Link
exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params; // Get the link ID from the request parameters

    // Check if the link exists and belongs to the user
    const link = await Link.findOneAndDelete({ _id: id, userId: req.user.id });
    
    if (!link) {
      return res.status(404).json({ error: "Link not found or you do not have permission to delete it." });
    }

    res.status(200).json({ message: "Link deleted successfully." });
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update Banner Color
// Update banner color for a specific link
exports.updateBannerColor = async (req, res) => {
  const { bannerColor } = req.body; // Get bannerColor from the request body

  try {
    const user = await User.findById(req.user.id); // Get the user by ID from the token
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    user.bannerColor = bannerColor; // Update the banner color
    await user.save(); // Save the updated user

    res.status(200).json({ message: "Banner color saved successfully!" });
  } catch (error) {
    console.error("Error saving banner color:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Endpoint to edit link URL
exports.editLinkUrl = async (req, res) => {
  const { id } = req.params; // Get the link ID from the request parameters
  const { url } = req.body; // Get the new URL from the request body

  try {
    const link = await Link.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { url },
      { new: true } // Return the updated link
    );

    if (!link) {
      return res.status(404).json({ error: "Link not found or you do not have permission to edit it." });
    }

    res.status(200).json({ message: "Link URL updated successfully.", link });
  } catch (error) {
    console.error("Error updating link URL:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


// Endpoint to count link clicks
exports.countLinkClick = async (req, res) => {
  const { id } = req.params; // Get the link ID from the request parameters

  try {
    const link = await Link.findOne({ _id: id });

    if (!link) {
      return res.status(404).json({ error: "Link not found." });
    }

    // Increment the click count based on the type
    if (link.type === 'link') {
      link.linkClickCount += 1;
    } else if (link.type === 'shop') {
      link.shopClickCount += 1;
    }
    link.clickCount += 1; // Increment total click count

    await link.save(); // Save the updated link

    res.status(200).json({ message: "Click counted successfully.", link });
  } catch (error) {
    console.error("Error counting link click:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Save Layout
exports.saveLayout = async (req, res) => {
  const { layout } = req.body;
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
      await User.findByIdAndUpdate(userId, { layoutType: layout });
      res.status(200).send({ message: 'Layout saved successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Error saving layout', error });
  }
};


// Save Font Style and Color
exports.saveFontSettings = async (req, res) => {
  const { font, color } = req.body; // Destructure font and color from the request body
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
    await User.findByIdAndUpdate(userId, { 
      fontStyle: font, // Assuming you have a fontStyle field in your User schema
      fontColor: color ,

    });
    res.status(200).send({ message: 'Font style and color saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving font style or color', error });
  }
};

// Function to save button background color
exports.saveButtonBackgroundColor = async (req, res) => {
  const { buttonBackgroundColor } = req.body; // Destructure buttonBackgroundColor from the request body
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
    await User.findByIdAndUpdate(userId, { 
      buttonBackgroundColor // Update buttonBackgroundColor field
    });
    res.status(200).send({ message: 'Button background color saved successfully' });
  } catch (error) {
    console.error("Error saving button background color:", error); // Log the error for debugging
    res.status(500).send({ message: 'Error saving button background color', error });
  }
};

// Save button styles
exports.saveButtonStyles = async (req, res) => {
  const { buttonStyles } = req.body; // Destructure buttonStyles from the request body
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
    await User.findByIdAndUpdate(userId, { 
      buttonStyles // Update buttonStyles field
    });
    res.status(200).send({ message: 'Button styles saved successfully' });
  } catch (error) {
    console.error("Error saving button styles:", error); // Log the error for debugging
    res.status(500).send({ message: 'Error saving button styles', error });
  }
};

// Save theme color
exports.saveThemeColor = async (req, res) => {
  const { themeColor } = req.body; // Destructure themeColor from the request body
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
    await User.findByIdAndUpdate(userId, { 
      themeColor // Update themeColor field
    });
    res.status(200).send({ message: 'Theme color saved successfully' });
  } catch (error) {
    console.error("Error saving theme color:", error); // Log the error for debugging
    res.status(500).send({ message: 'Error saving theme color', error });
  }
};