let articles = require('../../content/allArticles');
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '../../content/allArticles');

function getAll(req, res, next) {
    res.render('articles', { articles: articles });
}

function getArticle(req, res, next) {
    let article = articles.find((item) => item._id === req.params.id);
    let articlesFound = article ? [article] : null;

    res.render('articles', { articles: articlesFound });
}

function removeArticle(req, res, next) {
    console.log('removeArticle');
    let articleIndex = articles.findIndex((item) => item._id === req.params.id);
    if (articleIndex !== -1) {
        articles.splice(articleIndex, 1);

        fs.writeFile(FILE_PATH + '.json', JSON.stringify(articles), 'utf8', (error) => {
            if (!error) {
                res.statusCode = 200;
                res.statusMessage = 'Article successfully removed';
            } else {
                res.statusCode = 500;
                res.statusMessage = 'Unable to delete the article';
            }
            res.render('articles', { articles: articles });
        });
    } else {
        res.statusCode = 404;
        res.statusMessage = 'Article is not found';
        res.render('articles', { articles: articles });
    }
}

function createArticle(req, res, next) {

}

module.exports = {
    getAll: getAll,
    getArticle: getArticle,
    removeArticle: removeArticle,
    createArticle: createArticle
};
