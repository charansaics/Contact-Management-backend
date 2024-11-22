import asyncHandler from "express-async-handler";

//@desc GET all contacts
//@route GET api/contacts
// @access public
const getAllContacts = asyncHandler((req, res)=>{
    const response = {message :"Get all contacts"};
    res.status(200).json(response);
});

//@desc Create contacts
// @POST api/contacts
// @access public
const createContact = asyncHandler((req, res)=>{
    console.log("The contact is :", req.body);
    const {name, email, phone}= req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fiels are mandatory ");
    }
    res.status(201).json({message :"created contact"});
});

//@desc GET specific contact
// @GET api/contacts/:id
// @access public
const getContact = asyncHandler((req, res)=>{
    const response = {message :`Get contact of ${req.params.id}`};
    res.status(200).json(response);
});

//@desc PUT update contact
// @PUT api/contacts/:id
// @access public
const updateContact = asyncHandler((req, res)=>{
    const response = {message :`Update contact ${req.params.id}`};
    res.status(200).json(response);
});

//@desc PUT update contact
// @DELETE api/contacts/:id
// @access public
const deleteContact = asyncHandler((req, res)=>{
    const response = {message :`Delete contact ${req.params.id}`};
    res.status(200).json(response);
});

export {getAllContacts, createContact, getContact, updateContact, deleteContact};