import mongoose from "mongoose";


const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please add the contact name"],
    },
    email:{
        type:String,
        required: [true, "Please add the contact email"],
    },
    phone:{
        type:String,
        required: [true, "Please add the contact Phone number"],
    }
},{
    timestamps:true,
});

const Contact =mongoose.model("Contact",contactSchema);

export default  Contact ;