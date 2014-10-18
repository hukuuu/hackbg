(function(App, $, window, document, undefined) {

    function calculateArea(a, b, c) {
        return Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2)
    }

    function calculateCenter(a, b, c) {
        return {
            x: (a.x + b.x + c.x) / 3,
            y: (a.y + b.y + c.y) / 3
        }
    }

    function invertColor(hexTripletColor) {
        var color = hexTripletColor;
        color = color.substring(1); // remove #
        color = parseInt(color, 16); // convert to integer
        color = 0xFFFFFF ^ color; // invert three bytes
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color; // prepend #
        return color;
    }

    function drawArea(ctx, color, a, b, c) {
        ctx.setFillColor(color)
        ctx.setStrokeColor(color)
        var center = calculateCenter(a, b, c)
        var y = center.y + 4
        var x = center.x - 10
        ctx.fillText(calculateArea(a, b, c), x, y)
    }

    function Triangle(opts) {
        this.ctx = opts.ctx;
        this.points = opts.points || [];
        this.color = opts.color || '#000000'
    }

    Triangle.prototype.setColor = function(color) {
        this.color = color
    };

    Triangle.prototype.draw = function() {
        var a = this.points[0],
            b = this.points[1],
            c = this.points[2],
            ctx = this.ctx;

        ctx.setStrokeColor(this.color)
        ctx.setFillColor(this.color)
        ctx.beginPath();

        if (!c) {
            if (!b && a) {
                ctx.arc(a.x, a.y, 1, 0, 2 * Math.PI, false);
                ctx.stroke();
            };
            if (b) {
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke();
            };
        } else {
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.lineTo(c.x, c.y)
            ctx.lineTo(a.x, a.y)
            ctx.fill()
            ctx.closePath()


            drawArea(ctx, invertColor(this.color), a, b, c)
        };
    };

    Triangle.prototype.push = function(point) {
        if (!this.isFull()) {
            this.points.push(point)
        }
    };

    Triangle.prototype.isFull = function() {
        return this.points.length == 3;
    };

    Triangle.prototype.serialize = function() {
        return {
            color: this.color,
            points: this.points
        }
    };

    App.Triangle = Triangle;

})(App, jQuery, window, document);
