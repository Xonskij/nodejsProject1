const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://127.0.0.1/test')

var schemaArticle =  new mongoose.Schema({
    id: {type:String, index:{unique:true}},
    summary: String,
    description: String,
    title: String,
    image_url: String,
    link: String,
    createdAt: { type: Date, default: Date.now }
});

const Article = connection.model('Article', schemaArticle);

module.exports = Article;