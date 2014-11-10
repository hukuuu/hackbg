function Node (value) {
	this._value = value
	this._neighbours = []
}

Node.prototype.addNeighbour = function(neighbour) {
	this._neighbours.push(neighbour)
};

Node.prototype.getNeighbours = function() {
	return this._neighbours
};

Node.prototype.hasNeighbour = function(value) {
	return this._neighbours.filter(function(n) {
		return n === value && n
	}).length > 0
};

module.exports = Node;
