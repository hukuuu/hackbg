var storage = require('node-persist'),
    ARTICLES = 'articles',
    MAX_ITEM = 'max_item'

storage.initSync()

if(!getMax())
	setMax(8454564) // sredno max :D

var articles = getAllArticles()
if(!articles || !articles instanceof Array)
	setAllArticles([])

function getMax() {
    return storage.getItem(MAX_ITEM)
}

function setMax(max) {
    storage.setItem(MAX_ITEM, max)
}

function getAllArticles() {
    var all = storage.getItem(ARTICLES)
    return all;
}

function setAllArticles(as) {
    storage.setItem(ARTICLES, as)
}

function addArticle (article) {
	var all = getAllArticles()
	all.push(article)
	setAllArticles(all)
}

module.exports = {
    getMax: getMax,
    setMax: setMax,
    getAllArticles: getAllArticles,
    setAllArticles: setAllArticles,
    addArticle: addArticle
};
