const express = require('express');
const router = express.Router();
const logger = require('winston');
const Articles = require('../controllers/articlesCtrl');
const Accounts = require('../controllers/accountsCtrl');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
}

module.exports = () => {
    router.get('/', (req, res) => {
        logger.debug('[Routes]: Received general request');
        res.render('index', { user: req.user });
    });

    router.get('/login', (req, res) => {
        logger.debug('[Routes]: Go to login form');
        res.render('login');
    });
    router.post('/login', Accounts.passportAuthentication, Accounts.loginUser);

    router.get('/register', (req, res) => {
        logger.debug('[Routes]: Go to registration form');
        res.render('register');
    });
    router.post('/register', Accounts.registerUser);

    router.get('/logout', (req, res) => {
        logger.debug('[Routes]: Received logout request');
        req.logout();
        res.redirect('/');
    });

    router.get('/articles', Articles.getAll);
    router.get('/article/:id', Articles.getArticle);
    router.get('/article/edit/:id', isAuthenticated, Articles.getArticle);

    router.delete('/article/:id', isAuthenticated, Articles.removeArticle);

    // Unwrapper for PUT request, because
    // Forms support only GET and POST methods
    router.post('/article', (req, res, next) => {
        req.method = 'PUT';
        next();
    });
    router.put('/article', isAuthenticated, Articles.createArticle);

    router.post('/article/:id', isAuthenticated, Articles.updateArticle);

    return router;
};
