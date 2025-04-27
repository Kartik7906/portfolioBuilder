const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token

    if (!token) {
        return res.status(401).json({ error: "User not authenticated! Please log in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
        if (!req.user) {
            return res.status(401).json({ error: "User not found!" });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token! Please log in again." });
    }
};

module.exports = { authMiddleware };
