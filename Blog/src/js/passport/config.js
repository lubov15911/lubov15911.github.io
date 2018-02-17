const Account = require('../db/models/account');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    passport.use(new LocalStrategy(Account.authenticate()));
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());
};
