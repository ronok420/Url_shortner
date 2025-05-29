const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require('../services/auth'); 


async function hadnleUserSignup(req, res) {
    const { userName, email, password } = req.body;

    try {
        // Here you would typically hash the password and save the user to the database
        await User.create({
            userName,
            email,
            password // In a real application, ensure to hash the password before saving
        });
        // For simplicity, we are just returning the username and password
        res.status(201).json({ message: 'User created successfully', userName, password }).redirect('/login'); // Redirect to login page after successful signup
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

async function  handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Here you would typically check the email and password against the database
        const user = await User.findOne({ email, password }); // In a real application, ensure to hash the password before checking
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const sessionId = uuidv4(); // Generate a unique session ID
        setUser(sessionId, user); // Store the user in the session
        res.cookie('sessionId', sessionId);
        res.redirect('/'); // Redirect to home page after successful login
        // res.status(200).json({ message: 'Login successful', userName: user.userName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
}

module.exports = {
    hadnleUserSignup,
    handleUserLogin
};  