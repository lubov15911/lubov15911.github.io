let articles = require('../../content/allArticles');
const fs = require('fs');
const path = require('path');
const logger = require('winston');
const FILE_PATH = path.join(__dirname, '../../content/allArticles');

function getAll(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received getAll articles request');
    res.render('articles', { articles: articles });
}

function getArticle(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received getArticle request. Article id:', req.params.id);
    let article = articles.find((item) => item._id === req.params.id);
    let articlesFound = article ? [article] : null;

    res.render('articles', { articles: articlesFound });
}

function removeArticle(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received removeArticle request. Article id:', req.params.id);
    let articleIndex = articles.findIndex((item) => item._id === req.params.id);
    if (articleIndex !== -1) {
        articles.splice(articleIndex, 1);

        fs.writeFile(FILE_PATH + '.json', JSON.stringify(articles), 'utf8', (error) => {
            if (!error) {
                res.statusCode = 200;
                res.statusMessage = 'Article successfully removed';
                logger.info('[ArticleCtrl: Article successfully removed');
            } else {
                res.statusCode = 500;
                res.statusMessage = 'Unable to delete the article';
                logger.error('[ArticleCtrl: Unable to delete the article');
            }
            res.render('articles', { articles: articles });
        });
    } else {
        res.statusCode = 404;
        res.statusMessage = 'Article is not found';
        logger.error('[ArticleCtrl: Article is not found');
        res.render('articles', { articles: articles });
    }
}

function createArticle(req, res, next) {
    logger.debug('[ArticlesCtrl]: Received createArticle request. Article id:', req.params.id);

    if (!req.body._id) {
        res.statusCode = 400; // Check an appropriate error code
        res.statusMessage = 'Body is incorrect';
        logger.error('[ArticleCtrl: Body is incorrect');
        res.render('articles', { articles: articles });
        return;
    }
    articles.push(req.body);

    fs.writeFile(FILE_PATH + '.json', JSON.stringify(articles), 'utf8', (error) => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = 'Article successfully added';
            logger.info('[ArticleCtrl: Article successfully added');
        } else {
            res.statusCode = 500;
            res.statusMessage = 'Unable to add the article';
            logger.error('[ArticleCtrl: Unable to add the article');
        }
        res.render('articles', { articles: articles });
    });
}

module.exports = {
    getAll: getAll,
    getArticle: getArticle,
    removeArticle: removeArticle,
    createArticle: createArticle
};
