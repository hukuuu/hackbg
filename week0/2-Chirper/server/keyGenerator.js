function keyGenerator () {
	var symbols = []
	for(var i = 65; i < 90; i++) {
		symbols.push(String.fromCharCode(i))
	}

	return function generate() {
		var chars = []
		for(var i =0; i < 20; i++) {
			chars.push(symbols[~~(Math.random()*symbols.length)]);
		}
		return chars.join("");
	}
}

module.exports = keyGenerator()