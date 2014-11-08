var db = require('./histogramDbMongo.js'),
app = require('express')()

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', ['GET'])
  next()
})

app.get('/keywords', function(req, res) {
   var from = ~~req.query.fromPosition,
   direction = req.query.direction === 'next' ? 1 : -1,
   page = from + direction

  db.findAllWords(page, 10)
	.then(function(words){
		res.json(words)
 	})
})

app.listen(8000)
