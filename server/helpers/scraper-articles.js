{
    var request = require('request');
    var cheerio = require('cheerio');
    var article = require('../models/article-model');
    var url = "http://www.s13.ru";
} 

function getArticle(link, title, summary, id) {

    request.get(link, function (error, response, page) {

        if (response.statusCode == 200 && !error) {

                var $ = cheerio.load(page);
                var description = $('.item').children('.itemtext').children('p');

                var articleNew = new article({
                    id: id,
                    title: title,
                    summary: summary,
                    description: description,
                    link: link
                });

                articleNew.save(function (error, entry) {
                    if (error) console.log(error);
                    console.log(entry.id + ' added');
                });
        }
    });
}

var update = function () {
    request(url, function (error, response, page) {

        if (response != null && response.statusCode == 200 && !error) {
            var $ = cheerio.load(page);

            items = $('div[id*="post"]');

            $(items).each(function (index, item) {

                var id = $(this).attr('id');

                article.findOne({id: id}, function (error, flage) {

                    if (error) return console.error(error);

                    if (flage == null) {
                        var title = $(item).children('.itemhead').children('h3').text();
                        var link = $(item).children('.itemhead').children('h3').children('a[rel="bookmark"]').attr('href');
                        var summary = $(item).children('.itemtext').children('p').text();

                        getArticle(link, title, summary, id);

                    }
                });
            });

        }
        else {
            console.log('No acces');
        }
    });
}

module.exports.update = update;