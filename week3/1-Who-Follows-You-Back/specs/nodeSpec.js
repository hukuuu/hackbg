var Node = require('../lib/graph/node.js');

describe('node', function() {

	it('should have value and neighbours after creation', function() {
		var n = new Node('test')
		expect(n).to.have.property('_value')
		expect(n).to.have.property('_neighbours')
		expect(n._value).to.equal('test')
		expect(n._neighbours).to.have.length(0)
	});

	it('should be able to add neighbours', function() {
		var foo = new Node('foo')

		foo.addNeighbour('bar')
		foo.addNeighbour('baz')
		var neighbours = foo.getNeighbours()
		expect(neighbours).to.have.length(2)
		assert.deepEqual(neighbours,['bar','baz'])

	});

	it('knows if a value is a neighbour', function() {
		var foo = new Node('foo')

		foo.addNeighbour('bar')

		expect(foo.hasNeighbour('bar'),true)
	});

});
