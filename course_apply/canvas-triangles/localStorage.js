(function(App, $, window, document, undefined) {

    var uniquePrefix = 'canvas-sketchpad:';

    function getKey(name) {
        return uniquePrefix + name;
    }

    function LocalStorage() {}

    LocalStorage.prototype.save = function(name, points) {
        localStorage.setItem(getKey(name), JSON.stringify(points))
    };

    LocalStorage.prototype.load = function(name) {
        return JSON.parse(localStorage.getItem(getKey(name)))
    };

    LocalStorage.prototype.getAvailableSaves = function() {
        var saves = []
        for(var s in localStorage) {
            var index = s.indexOf(uniquePrefix)
            if(index > -1)
                saves.push(s.substring(index + uniquePrefix.length))
        }
        return saves;
    };

    App.LocalStorage = LocalStorage;


})(App, jQuery, window, document);
