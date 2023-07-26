const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");
const getContacts  = asyncHandler(async(req,res) => {
    const contacts = await Contact.find()
    res.status (201).json(contacts);
})
const createContact = asyncHandler(async(req,res) => {
    const {name,email,phone} = req.body;
    console.log("request body is",req.body.name);
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Error create!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(202).json(contact);
})
const getContact = asyncHandler(async(req,res) => {
    
    res.status(201).json({message:`Get contact by ID ${req.params.id}`});
})
const updateContact = asyncHandler(async(req,res) => {
    res.status(201).json({message:`Update contact by ID ${req.params.id}`});
})
const deleteContact = asyncHandler(async(req,res) => {
    res.status(201).json({message:`Delete contact by ID ${req.params.id}`});
})
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}