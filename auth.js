const { getUser } = require('../service/auth.js');

async function restrictToLoggedinUsersOnly(req, res, next) {
    const uid = req.cookies?.uid;
    if (!uid) {
        return res.redirect('/user/signin');
    }
    const user = getUser(uid);
    if (!user) {
        res.redirect('/user/signin');
    }
    req.user = user;
    next();
}

module.exports = restrictToLoggedinUsersOnly