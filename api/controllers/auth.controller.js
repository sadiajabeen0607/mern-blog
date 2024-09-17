import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({message: 'All fields are required'});
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save();
        res.status(201).json('User created Successfully');
    } catch (error) {
        res.status(409).json(error.message)
    }
    
}