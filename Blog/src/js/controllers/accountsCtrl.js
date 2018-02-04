const logger = require('winston');
const passport = require('passport');
const Account = require('../db/models/account');

function registerUser(req, res) {
    logger.debug('[AccountsCtrl]: Register a new user');

    Account.register(new Account({ username : req.body.username }), req.body.password, (error, account) => {
        if (error) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });
}

function loginUser(req, res) {
    logger.debug('[AccountsCtrl]: Logged is as', req.user.username);
    res.redirect('/');
}

module.exports = {
    registerUser: registerUser,
    passportAuthentication: passport.authenticate('local'),
    loginUser: loginUser
};
