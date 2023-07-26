import User from "../models/contactModel.js";
import expressAsyncHandler from "express-async-handler";
import { hashPassword } from "../utils/password.js";

const getContacts  = expressAsyncHandler(async (req, res, next) => {
    const user = await User.find({});
    console.log(user)
    if (user.length === 0) {
        res.status(404);
        const error = new Error("User not found");

        next(error);
    } else {
        res.status (200).json(user);
    }
});


const createContact = expressAsyncHandler (async (req,res) => {
    const { fullname, password, email, phone } = req.body;

    try {
        if (!fullname || !password || !email || !phone) {
            res.status(400);
            throw new Error("Error create!");
        }

        const hashPass = await hashPassword(password);
        console.log('hashPassword: ', hashPass);

        const user = await User.create({ fullname, password: hashPass, email, phone });


        console.log('new user: ', user);
        res.status(202).json(user);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


const getContact = expressAsyncHandler (async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.status(201).json(user);
    }

});

const updateContact = expressAsyncHandler (async (req,res) => {
    const userId = req.params.id;

    const { fullname, email, phone } = req.body;
    const update = { fullname, email, phone };

    const user = await User.findByIdAndUpdate(userId,  update,  { new: true });

    try {
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

const deleteContact = expressAsyncHandler(async (req,res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    console.log('user: ', user);

    res.status(201).json({message:`Delete user: ${user.fullname} by ID ${req.params.id}}`});
});

export {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}