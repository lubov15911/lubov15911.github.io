const express = require('express');
const router = express.Router();
const logger = require('winston');
const Articles = require('../controllers/articlesCtrl');

module.exports = () => {
    router.get('/', (req, res) => {
        logger.debug('[Routes]: Received general request');
        res.render('index');
    });

    router.get('/articles', Articles.getAll);
    router.get('/article/:id', Articles.getArticle);
    router.get('/article/edit/:id', Articles.getArticle);

    router.delete('/article/:id', Articles.removeArticle);

    // Unwrapper for PUT request, because
    // Forms support only GET and POST methods
    router.post('/article', (req, res, next) => {
        req.method = 'PUT';
        next();
    });
    router.put('/article', Articles.createArticle);

    router.post('/article/:id', Articles.updateArticle);

    return router;
};
