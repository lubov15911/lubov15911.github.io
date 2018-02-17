const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
    _id: String,
    title: String,
    body: String,
    author: String,
    publishedAt: String,
    email: String
});

module.exports = mongoose.model('Article', ArticleSchema);
