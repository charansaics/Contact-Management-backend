import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to validate access token
const validateToken = asyncHandler(async (req, res, next) => {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (!err) {
                req.user = decode.user;
                return next(); // Valid access token, proceed to next middleware
            } else {
                // If access token is invalid, check refresh token
                checkRefreshToken(req, res, next);
            }
        });
    } else {
        // If access token is missing, check refresh token
        checkRefreshToken(req, res, next);
    }
});

// Function to check and validate refresh token
const checkRefreshToken = asyncHandler(async (req, res, next) => {
    const refreshToken = req.headers['x-refresh-token'];

    if (!refreshToken) {
        return res.status(401).json({ message: "User is not authorized, please login again" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
        if (err) {
            return res.status(403).json({ message: "Refresh token is invalid or expired" });
        }

        try {
            const user = await User.findById(decode.user.id);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }
            // Generate a new access token and passing it as header
            const newAccessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );
            res.setHeader('Authorization', `Bearer ${newAccessToken}`);
            req.user = { id: user.id, username: user.username, email: user.email };
            return next();
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    });
});

export { validateToken };