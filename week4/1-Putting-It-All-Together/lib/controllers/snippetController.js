var mongoose = require('mongoose'),
    Snippet = mongoose.model('Snippet');

var onError = function(status, res, err) {
    res.status(status)
        .json(err)
        .end()
}

module.exports = {
    create: function(req, res) {
        var snippet = new Snippet(req.body)
        snippet.validate(function(err) {
            if (err) {
                onError(400, res, err)
            } else {
                snippet.save(function(err, saved) {
                    if (err) {
                        onError(400, res, err)
                    } else {
                        res.send(saved).status(200).end()
                    }
                })
            }

        })
    }
};
