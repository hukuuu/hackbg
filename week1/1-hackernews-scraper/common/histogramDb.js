var storage = require('node-persist'),
    KEYWORDS = 'keywords',
    MAX_ITEM = 'histogram_max_item'

storage.initSync()

if (!getMaxIndex())
    setMaxIndex(1)

var items = getAllKeywords()
if (!items || !items instanceof Array)
    setAllKeywords([])

function getMaxIndex() {
    return storage.getItem(MAX_ITEM)
}

function setMaxIndex(max) {
    storage.setItem(MAX_ITEM, max)
}

function getAllKeywords() {
    var all = storage.getItem(KEYWORDS)
    return all;
}

function setAllKeywords(as) {
    storage.setItem(KEYWORDS, as)
}

function addKeyword(kw) {
    var all = getAllKeywords()
    var inDb = all.filter(function(item) {
        return item.word === kw && item
    })[0]
    if (inDb) {
        inDb.count = inDb.count ? inDb.count + 1 : 1
    }
    else all.push({
        word: kw,
        count: 1
    })
    setAllKeywords(all)
}

function addKeywords(items) {
    items.forEach(addKeyword)
}

function getAllKeywordsOrdered () {
    return getAllKeywords().sort(function(a,b) {
        return  b.count - a.count
    })
}


module.exports = {
    getMaxIndex: getMaxIndex,
    setMaxIndex: setMaxIndex,
    getAllKeywords: getAllKeywords,
    getAllKeywordsOrdered: getAllKeywordsOrdered,
    addKeyword: addKeyword,
    addKeywords: addKeywords
};
