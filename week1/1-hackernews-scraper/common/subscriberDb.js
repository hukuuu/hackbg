var storage = require('node-persist'),
	SUBSCRIBERS = 'subscribers',
	rand = require('generate-key');

storage.initSync()//({dir: './subscribers'})

if(!getAll())
	setAll([])

function getAll() {
	var all = storage.getItem(SUBSCRIBERS)
	return all;
}

function setAll (sbs) {
	storage.setItem(SUBSCRIBERS, sbs)
}

function subscribe (obj) {
	var all = getAll()
	obj.subscriberId = rand.generateKey();
	all.push(obj)
	setAll(all)
	return {
		email: obj.email,
		subscriberId: obj.subscriberId
	}
}

function unsubscribe (obj) {
	var all = getAll()
	var item = all.filter(function(it) {
		if(it.subscriberId === obj.subscriberId)
			return it;
	})[0]
	if(item) {
		all.splice(all.indexOf(item),1)
		setAll(all)
	}

}

module.exports = {
	unsubscribe: unsubscribe,
	subscribe: subscribe,
	peek: getAll
}