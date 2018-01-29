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

    router.delete('/article/:id', Articles.removeArticle);

    router.put('/article/:id', Articles.createArticle);

    return router;
};