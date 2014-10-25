var storage = require('node-persist'),
    ITEMS = 'items',
    MAX_ITEM = 'max_item'

storage.initSync()

if (!getMaxIndex())
    setMaxIndex(8454564) // sredno max :D

var items = getAllItems()
if (!items || !items instanceof Array)
    setAllItems([])

function getMaxIndex() {
    return storage.getItem(MAX_ITEM)
}

function setMaxIndex(max) {
    storage.setItem(MAX_ITEM, max)
}

function getAllItems() {
    var all = storage.getItem(ITEMS)
    return all;
}

function setAllItems(as) {
    storage.setItem(ITEMS, as)
}

function addItem(item) {
    var all = getAllItems()
    item.isNew = true
    all.push(item)
    setAllItems(all)
}

function addItems(items) {
    setAllItems(getAllItems().concat(items.filter(function(item) {
        if (item) {
            item.isNew = true
            return item
        }
        return
    })))
}

function getAllNewItems(argument) {
    var allItems = getAllItems(),
        newItems
    newItems = allItems.filter(function(item) {
        return item.isNew && item
    })
    setAllItems(allItems.map(function(item) {
        item.isNew = false
        return item
    }))
    return newItems
}

module.exports = {
    getMaxIndex: getMaxIndex,
    setMaxIndex: setMaxIndex,
    getAllItems: getAllItems,
    getAllNewItems: getAllNewItems,
    addItem: addItem,
    addItems: addItems
};
