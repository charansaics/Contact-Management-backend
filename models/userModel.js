import mongoose from "mongoose";
import { type } from "os";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: [true, "Please add the username"],
    },
    email:{
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken "],
    },
    password:{
        type: String,
        required: [true, "Please add the user password"],
    },
    refreshToken:{
        type: String,
    },
},{
    timestamps:true,
});

userSchema.methods.generateAccessToken = function (user){
    const accessToken = jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id,
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m"});
};

const User = mongoose.model("User",userSchema);

export default User;
