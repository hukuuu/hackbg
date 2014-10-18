function isBeer(item){
    return item.type === 'beer'
}
function isFries(item) {
    return item.type === 'fries'
}
function desc(a,b) {
    return a.score < b.score ? 1 : -1
}
function beerAndFries(data) {
    var sorted = data.sort(desc),
        beers = sorted.filter(isBeer)
        fries = sorted.filter(isFries)
        i = 0,
        sum = 0
        for(;i<beers.length; i++) {
            sum += beers[i].score * fries[i].score
        }
        return sum
}
exports.beerAndFries = beerAndFries
