var histogramDb = require('../common/histogramDb'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    config = require('../config.json'),
    hnApi = require('../common/hnApi'),
    async = require('async')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/keywords', function(req, res) {
	res.json(histogramDb.getAllKeywordsOrdered())
})


function forever() {
	var lastItemId = histogramDb.getMaxIndex(),
		keywords
	hnApi.getItem(lastItemId, function(err, item) {
		if(err)
			console.log(err);
		else {
			keywords = getKeywords(item)
			console.log('id: ' + lastItemId + ' kws: ' + keywords.join(' '));
			histogramDb.addKeywords(keywords)
			histogramDb.setMaxIndex(lastItemId + 1)
		}
	})
	setTimeout(forever, 5000)
}

function getKeywords(item) {
	var kws = []
	if(item.type === 'story') {
		if(item.title)
			kws = kws.concat(item.title.split(' '))
		if(item.text)
			kws = kws.concat(item.text.split(' '))
	}
	else
		kws = kws.concat(item.text.split(' '))
	return kws
}

forever();

var server = app.listen(config.wordCounter.port, function() {
    console.log('WordCounter listening on http://localhost:' + config.wordCounter.port)
})

