import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc Register a user
//@route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body ;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    };
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("email is already registered");
    };

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashed Password : ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    // console.log(`User created ${user}`);
    if(user){
        res.status(200).json({_id:user.id, email:user.email});
    }else{
        res.status(400);
        throw new Error("user data is invalid");
    };
});

//@desc user login
//@route POST /api/users/login
// @access public
const loginUser = asyncHandler( async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m"});

        const refreshToken = jwt.sign({
            user:{
                id:user.id,
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"});
        
        // Save refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  // Use secure cookies in production only
            sameSite: "Strict",
        };
        
        res.cookie("accessToken",accessToken,options)
        res.cookie("refreshToken", refreshToken, options)
        res.status(200).json({accessToken, refreshToken});
    } else {
        res.status(401);
        throw new Error("Email address or password is not valid ");
    };
});

//@desc user logout
//@route POST /api/users/logout
// @access private
const logoutUser = asyncHandler( async(req,res)=>{
    const { refreshToken } = req.body; // Receive refresh token from request body

    if (!refreshToken){
        res.status(400);
        throw new Error("Refresh token is missing");
    }

    // Find user by using refresh token
    const user = await User.findOne({ refreshToken });
    if(!user){
        res.status(400);
        throw new Error("Invalid refresh token");
    }

    // Remove refresh token from the database 
    user.refreshToken = null;
    await user.save();

    // Clear cookies
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.status(200).json({ message: "User logged out successfully" });
});

//@desc viewing current user
//@route POST /api/users/current
// @access private
const currentUser = asyncHandler( async (req, res)=>{
    res.json(req.user);
});

export {registerUser, loginUser, logoutUser, currentUser};