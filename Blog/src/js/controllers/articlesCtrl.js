const logger = require('winston');
const Article = require('../db/models/article');

const STATUS_MESSAGE = {
    SUCCESS: {
        ArticlesLoaded: 'All articles successfully loaded',
        ArticleAdded: 'Article successfully added',
        ArticleFound: 'Article successfully found',
        ArticleRemoved: 'Article successfully removed',
        ArticleUpdated: 'Article successfully updated'
    },
    ERROR: {
        ArticlesLoaded: 'Unable to load articles',
        ArticleAdded: 'Unable to add the article',
        ArticleFound: 'Unable to find the article',
        ArticleRemoved: 'Unable to delete the article',
        ArticleUpdated: 'Unable to update the article',
        IncorrectBody: 'Body is incorrect'
    }
};

function getAll(req, res) {
    logger.debug('[ArticlesCtrl]: Received getAll articles request');

    Article.find((error, articles) => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = STATUS_MESSAGE.SUCCESS.ArticlesLoaded;
            logger.info('[ArticleCtrl]: All articles successfully loaded');
        } else {
            res.statusCode = 500;
            res.statusMessage = STATUS_MESSAGE.ERROR.ArticlesLoaded;
            logger.error('[ArticleCtrl]: Unable to load the articles');
        }
        res.render('articleList', { user: req.user, articles: articles });
    });
}

function getArticle(req, res) {
    logger.debug('[ArticlesCtrl]: Received getArticle request. Article id:', req.params.id);
    // render is a page which will be shown: article or articleEdit
    let render = 'article' + (req.url.split('/').find(item => item === 'edit') ? 'Edit' : '');

    Article.findOne({ _id: req.params.id }, (error, article) => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = STATUS_MESSAGE.SUCCESS.ArticleFound;
            logger.info('[ArticleCtrl]: Article successfully found');
        } else {
            res.statusCode = 500;
            res.statusMessage = STATUS_MESSAGE.ERROR.ArticleFound;
            logger.error('[ArticleCtrl]: Unable to find the article');
        }
        res.render(render, { user: req.user, article: article });
    });
}

function removeArticle(req, res) {
    logger.debug('[ArticlesCtrl]: Received removeArticle request. Article id:', req.params.id);

    Article.remove({ _id: req.params.id }, error => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = STATUS_MESSAGE.SUCCESS.ArticleRemoved;
            logger.info('[ArticleCtrl]: Article successfully removed');
        } else {
            res.statusCode = 500;
            res.statusMessage = STATUS_MESSAGE.ERROR.ArticleRemoved;
            logger.error('[ArticleCtrl]: Unable to delete the article');
        }
        res.redirect('/articles');
    });
}

function createArticle(req, res) {
    logger.debug('[ArticlesCtrl]: Received createArticle request');

    if (!req.body) {
        res.statusCode = 400; // todo: Check an appropriate error code
        res.statusMessage = STATUS_MESSAGE.ERROR.IncorrectBody;
        logger.error('[ArticleCtrl]: Body is incorrect');
        res.render('index', { user: req.user, status: res.statusMessage });
        return;
    }

    let article = new Article({
        _id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)),
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        publishedAt: (new Date()).toLocaleString(),
        email: req.body.email
    });

    article.save(error => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = STATUS_MESSAGE.SUCCESS.ArticleAdded;
            logger.info('[ArticleCtrl]: Article successfully added');
        } else {
            res.statusCode = 500;
            res.statusMessage = STATUS_MESSAGE.ERROR.ArticleAdded;
            logger.error('[ArticleCtrl]: Unable to add the article');
        }
        res.render('index', { user: req.user, status: res.statusMessage });
    });
}

function updateArticle(req, res) {
    logger.debug('[ArticlesCtrl]: Received updateArticle request. Article id:', req.params.id);
    let data = req.body;

    Article.findByIdAndUpdate(req.params.id, { $set: { title: data.title, body: data.body }}, { new: false }, (error, article) => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = STATUS_MESSAGE.SUCCESS.ArticleUpdated;
            logger.info('[ArticleCtrl]: Article successfully updated');
        } else {
            res.statusCode = 500;
            res.statusMessage = STATUS_MESSAGE.ERROR.ArticleUpdated;
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
