(function(App, $, window, document, undefined) {

    function Application(selector) {
        this.element = $(selector)
        this.canvas = this.element.find('canvas')
        this.color = this.element.find('#color')
        this.saveButton = this.element.find('#saveButton')
        this.availableSaves = this.element.find('#availableSaves')
        this.loadButton = this.element.find('#loadButton')
        this.clearButton = this.element.find('#clearButton')
        this.sketchPad = new App.SketchPad(this.canvas[0], new App.LocalStorage()) //pass the dom object

        this.refreshAvailableSaves(this.sketchPad.getAvailableSaves())
        this.attachHandlers()
        return this;
    }

    Application.prototype.refreshAvailableSaves = function(saves) {
        var items = saves.map(function(save) {
            return '<option value="' + save + '"">' + save + '</option>'
        }).join()
        this.availableSaves.empty().append(items)
    };

    Application.prototype.attachHandlers = function() {
        var me = this;
        me.canvas.on('click', function(e) {
            me.sketchPad.push({
                x: e.pageX,
                y: e.pageY
            })
        })

        me.color.on('change', function() {
            me.sketchPad.setColor(this.value)
        })

        me.saveButton.on('click', function() {
            var name = null;
            do {
                name = prompt('Enter save name:')
                if (name !== null && name !== '') {
                    me.sketchPad.save(name)
                    me.refreshAvailableSaves(me.sketchPad.getAvailableSaves())
                } else if(name !== null) {
                    alert('please choose name')
                }
            } while (name === '')
        })

        me.clearButton.on('click', function() {
            me.sketchPad.clear();
            me.sketchPad.draw();
        })

        me.loadButton.on('click', function() {
            me.sketchPad.load(me.availableSaves.val())
            me.color.val(me.sketchPad.getColor())
        })
    };

    App.start = function(selector) {
        return new Application(selector)
    }

})(App, jQuery, window, document);
