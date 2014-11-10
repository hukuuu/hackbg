var Node = require('./node.js');

function DirectedGraph() {
    this._nodes = []
}

DirectedGraph.prototype.addEdge = function(value1, value2) {

    var node1 = this.findNode(value1);
    var node2 = this.findNode(value2)
    if (!node1) {
        node1 = new Node(value1)
        this._nodes.push(node1)
    }
    if (!node2) {
        node2 = new Node(value2)
        this._nodes.push(node2)
    }
    node1.addNeighbour(node2._value)

};

DirectedGraph.prototype.exists = function(value) {
    return !!this.findNode(value)
};

DirectedGraph.prototype.findNode = function(value) {
    var node = this._nodes.filter(function(node) {
        return node._value === value && node
    })[0]
    return node
};

DirectedGraph.prototype.getNeighbours = function(value) {
    var node = this.findNode(value)
    if (!node) return []

    return node.getNeighbours()
};

DirectedGraph.prototype.pathBetween = function(value1, value2) {
    var node1 = this.findNode(value1)
    var node2 = this.findNode(value2)
    var me = this

    if (!node1 || !node2)
        return false

    function link(node1, node2) {
        var neighbours = node1.getNeighbours()

        if (neighbours.length === 0) {
            return false
        }

        if (node1.hasNeighbour(node2._value)) {
            return true
        } else {
            var result = false
            neighbours.forEach(function(n) {
                var node = me.findNode(n)
                result = result || link(node, node2)
            })
            return result;
        }

    }
    return link(node1, node2)

};

module.exports = DirectedGraph;
