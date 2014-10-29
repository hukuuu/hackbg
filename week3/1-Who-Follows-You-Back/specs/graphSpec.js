var Graph = require('../lib/graph.js');

describe('graph', function() {
	var graph;

	beforeEach(function() {
		graph = new Graph()
		graph.addEdge('foo','bar')
	})

	it('can tell me if a node exists by value', function() {
		assert.isTrue(graph.exists('foo'))
	})

	it('can find node by value', function() {
		expect(graph.findNode('foo')).to.be.defined
	});

	it('can add edge between nodes', function() {
		expect(graph._nodes).to.have.length(2)
		graph.addEdge('foo','baz')
		expect(graph._nodes).to.have.length(3)
	});

	it('can give me a list of nodes (strings) for the given node', function() {
		var neighbours = graph.getNeighbours('foo')
		expect(neighbours).to.have.length(1)
		assert.deepEqual(neighbours, ['bar'])
	});

	it('knows if there is a path between nodeA and nodeB', function() {
		graph.addEdge('bar','baz')
		graph.addEdge('baz','maz')
		assert.isFalse(graph.pathBetween('nonexistent','baz'))
		assert.isTrue(graph.pathBetween('foo','baz'))
		assert.isTrue(graph.pathBetween('foo','maz'))
	});

});