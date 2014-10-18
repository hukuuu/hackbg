(function(App, $, window, document, undefined) {

    function extract(triangles) {
        return triangles.reduce(function(a, b) {
            return a.concat(b.serialize())
        }, [])
    }

    function push(ctx, ts, point, color) {
        var i = ts.length === 0 ? 0 : ts.length - 1,
            current = ts[i]

        if (!current || current.isFull()) {
            current = new App.Triangle({
                ctx: ctx,
                color: color
            })
            ts.push(current)
        }
        current.push(point)
    }


    function SketchPad(canvas, storage) {
        this.canvas = canvas
        this.storage = window.storage = storage
        this.ctx = window.ctx = canvas.getContext('2d')
        this.triangles = []
        this.width = canvas.width
        this.height = canvas.height
        this.color = '#000000'
    }

    SketchPad.prototype.push = function(point) {
        var i = this.triangles.length === 0 ? 0 : this.triangles.length - 1,
            current = this.triangles[i]

        if (!current || current.isFull()) {
            current = new App.Triangle({
                ctx: this.ctx,
                color: this.color
            })
            this.triangles.push(current)
        }
        current.push(point)
        this.draw();
    };

    SketchPad.prototype.draw = function() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.triangles.forEach(function(triangle) {
            triangle.draw();
        })
    };

    SketchPad.prototype.clear = function() {
        this.triangles = [];
    };

    SketchPad.prototype.setColor = function(color) {
        this.color = color
        var current = this.triangles.length ? this.triangles[this.triangles.length - 1] : null

        if (current && !current.isFull())
            current.setColor(color)

        this.draw();
    };

    SketchPad.prototype.save = function(name) {
        this.storage.save(name, extract(this.triangles))
    };

    SketchPad.prototype.load = function(name) {
        var me = this,
            serialized = this.storage.load(name)
        me.triangles = [];
        if (serialized && serialized.length) {
            serialized.forEach(function(tr) {
                tr.ctx = me.ctx
                me.triangles.push(new App.Triangle(tr))
            })
            me.setColor(serialized[serialized.length - 1].color)
        }
    };

    SketchPad.prototype.getColor = function() {
        return this.color
    };

    SketchPad.prototype.getAvailableSaves = function() {
        return storage.getAvailableSaves();
    };

    App.SketchPad = SketchPad;

})(App, jQuery, window, document);
