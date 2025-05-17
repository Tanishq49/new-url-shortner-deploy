const User = require('../models/user');

async function handleUser(req, res) {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name,
            email,
            password,
        });
        res.redirect('/');
    }
    catch (err) {
        console.log(`Error during user creation: ${err}`);
        res.send(`Email already exists <a href='/user/signin'>Try Again</a>`);
    }
}

module.exports = handleUser;