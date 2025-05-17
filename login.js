const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth.js');

async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        const result = await User.findOne({
            email, password
        });
        if (!result) {
            res.send("Invalid Credentials <a href='/user/login'>Try Again</a>");
        }

        const token = setUser(result);
        res.cookie('uid', token);
        res.redirect('/');
    } catch (err) {
        console.log(`Some error occured while logging in :${err}`);;
        res.status(500).send('Internal Server Error');
    }
}

module.exports = handleLogin;