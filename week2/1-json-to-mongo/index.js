var MongoClient = require('mongodb').MongoClient,
    url = require('./config.json').mongoConnectionUrl,
    file = process.argv[2],
    fs = require('fs')

if (!file)
    return console.log('no file....');

var collectionName = file.substring(0, file.indexOf('.'))
var data = JSON.parse(fs.readFileSync(file).toString())
console.log(data);
console.log(collectionName);

MongoClient.connect(url, function(err, db) {
    if (err)
        return console.log(err);
    var collection = db.collection(collectionName)
	collection.insert(data, function(err, res) {
		if(err)
			console.log(err);
		else console.log(res);
	})
	
})
