function makeSeq() {
    var count = 0;
    return function next() {
        return count++;
    }
}

module.exports = makeSeq();