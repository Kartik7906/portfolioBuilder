const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, default: "" }, 
    bio: {type: String, default: "", },
    profileImage: { type: String }, 
    bannerColor: { type: String, default: "#342b26" }, 
    layoutType: { 
      type: String,
      enum: ['stack', 'grid', 'carousel'],
      default: 'stack' 
  },
  fontStyle: {
    type: String,
    default: 'DM Sans', // or any default font
  },
  fontColor: {
    type: String,
    default: '#000000', // or any default color
  },
  buttonBackgroundColor: {
    type: String,
    // Default button background color
  },
  buttonStyles: { // New field for button styles
    border: { type: String, default: 'none' },
    borderRadius: { type: String, default: '100px' },
    boxShadow: { type: String, default: 'none' },
},
themeColor: { type: String, default: '#ffffff' }, // Default theme color

});
  

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
