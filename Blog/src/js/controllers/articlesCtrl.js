const logger = require('winston');
const Article = require('../db/models/article');

function getAll(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received getAll articles request');

    Article.find((error, articles) => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = 'All articles successfully loaded'; // todo: constants with statusMessages
            logger.info('[ArticleCtrl]: All articles successfully loaded');
        } else {
            res.statusCode = 500;
            res.statusMessage = 'Unable to load articles';
            logger.error('[ArticleCtrl]: Unable to load the articles');
        }
        res.render('articleList', { user: req.user, articles: articles });
    });
}

function getArticle(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received getArticle request. Article id:', req.params.id);
    let render = 'article' + (req.url.split('/').find(item => item === 'edit') ? 'Edit' : '');

    Article.findOne({ _id: req.params.id }, (error, article) => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = 'Article successfully found';
            logger.info('[ArticleCtrl]: Article successfully found');
        } else {
            res.statusCode = 500;
            res.statusMessage = 'Unable to find the article';
            logger.error('[ArticleCtrl]: Unable to find the article');
        }
        res.render(render, { user: req.user, article: article });
    });
}

function removeArticle(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received removeArticle request. Article id:', req.params.id);

    Article.remove({ _id: req.params.id }, error => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = 'Article successfully removed';
            logger.info('[ArticleCtrl]: Article successfully removed');
        } else {
            res.statusCode = 500;
            res.statusMessage = 'Unable to delete the article';
            logger.error('[ArticleCtrl]: Unable to delete the article');
        }
        res.redirect('/articles');
    });
}

function createArticle(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received createArticle request');

    if (!req.body) {
        res.statusCode = 400; // Check an appropriate error code
        res.statusMessage = 'Body is incorrect';
        logger.error('[ArticleCtrl]: Body is incorrect');
        res.render('index', { user: req.user, status: res.statusMessage });
        return;
    }

    // todo: remove ID input from view and Add ID generation somewhere here (before creation db data)

    let article = new Article({
        _id: req.body.id,
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        publishedAt: (new Date()).toLocaleString(),
        email: req.body.email
    });

    article.save(error => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = 'Article successfully added';
            logger.info('[ArticleCtrl]: Article successfully added');
        } else {
            res.statusCode = 500;
            res.statusMessage = 'Unable to add the article';
            logger.error('[ArticleCtrl]: Unable to add the article');
        }
        res.render('index', { user: req.user, status: res.statusMessage });
    });
}

function updateArticle(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received updateArticle request. Article id:', req.params.id);
    let data = req.body;

    Article.findByIdAndUpdate(req.params.id, { $set: { title: data.title, body: data.body }}, { new: false }, (error, article) => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = 'Article successfully updated';
            logger.info('[ArticleCtrl]: Article successfully updated');
        } else {
            res.statusCode = 500;
            res.statusMessage = 'Unable to update the article';
            logger.error('[ArticleCtrl]: Unable to update the article');
        }
        res.redirect('/articles');
    });
}

module.exports = {
    getAll: getAll,
    getArticle: getArticle,
    removeArticle: removeArticle,
    createArticle: createArticle,
    updateArticle: updateArticle
};
