function Router() {
    this.handlers = {
        GET: {},
        POST: {},
        DELETE:{}
    }
}

Router.prototype.handle = function(req, res, cb) {
    var url = req.url,
        handler

    console.log('handling....', req.body);

    if (url.indexOf('?') > -1)
        url = url.substring(0, url.indexOf('?'))
    console.log(url);


    handler = this.handlers[req.method] ? this.handlers[req.method][url] : undefined
    if (handler)
        handler(req, res, cb)
    else cb('not implemented: ' + req.method + ' : ' + url)
};

var methods = ['GET', 'POST', 'DELETE']

methods.forEach(function(method) {
    Router.prototype[method.toLowerCase()] = function(path, handler) {
        this.handlers[method][path] = handler;
    };
})

// Router.prototype.get = function(path, handler) {
//     this.handlers.GET[path] = handler
// }
// Router.prototype.post = function(path, handler) {
//     this.handlers.POST[path] = handler
// }

module.exports = Router
