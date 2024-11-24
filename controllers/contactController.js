import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js"

//@desc GET all contacts
//@route GET api/contacts
// @access private
const getAllContacts = asyncHandler(async (req, res)=>{
    const allContacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(allContacts);
});

//@desc Create contacts
// @POST api/contacts
// @access private
const createContact = asyncHandler(async (req, res)=>{
    console.log("The contact is :", req.body);
    const {name, email, phone}= req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fiels are mandatory ");
    }
    const createdContact = await Contact.create({
        name, 
        email, 
        phone,
        user_id:req.user.id
    });

    res.status(201).json(createdContact);
});

//@desc GET specific contact
// @GET api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res)=>{
    const singleContact = await Contact.findById(req.params.id);
    if(!singleContact){
        res.status(404);
        throw new Error("Contact not found");
    };
    res.status(200).json(singleContact);
});

//@desc PUT update contact
// @PUT api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res)=>{
    const singleContact = await Contact.findById(req.params.id);
    if(!singleContact){
        res.status(404);
        throw new Error("Contact not found");
    };
    if(singleContact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update others contacts");
    };
    const updatedContact =  await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
        );
    res.status(200).json(updatedContact);
});

//@desc PUT update contact
// @DELETE api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res)=>{
    const singleContact = await Contact.findById(req.params.id);
    if(!singleContact){
        res.status(404);
        throw new Error("Contact not found");
    };
    if(singleContact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete others contacts");
    };
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(singleContact);
});

export {getAllContacts, createContact, getContact, updateContact, deleteContact};