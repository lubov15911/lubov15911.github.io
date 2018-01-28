const express = require('express');
const router = express.Router();
const Articles = require('../controllers/articlesCtrl');

module.exports = () => {
    router.get('/', (req, res) => {
        res.render('index');
    });

    router.get('/articles', Articles.getAll);
    router.get('/article/:id', Articles.getArticle);

    router.delete('/article/:id', Articles.removeArticle);

    router.put('/article/:id', Articles.createArticle);

    return router;
};