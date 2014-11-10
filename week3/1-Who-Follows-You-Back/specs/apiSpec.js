var config = require('../lib/config/config.js'),
port = process.env.PORT || 3000,
request = require('supertest')('http://localhost:' + port),
extend = require('extend') 

describe('api', function() {

  it('can create a graph',function(done) {
    request.post(config.endpoints.graph_create)
    .send({
      "username":"kunev",
      "depth": 3
    })
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.have.property.length
      expect(res.body).to.have.property.length
      done()
    })
  })

  it('should say 404 if asked for non existing graph', function(done) {
    request.get(config.endpoints.graph_find.replace(':graphId','nonexistingid'))
    .send()
    .end(function(err, res) {
      expect(res.statusCode).to.equal(404)
      expect(res.text).to.equal('graph not found')
      done()
    })
  })

  it('should find existing graphs', function(done) {
    request.post(config.endpoints.graph_create)
    .send({
      "username":"kunev",
      "depth": 3
    })
    .expect(200)
    .end(function(err, res) {
      var id = res.body
      expect(id).to.have.property.length
      expect(id).to.have.property.length
      request.get(config.endpoints.graph_find.replace(':graphId',id))
      .send()
      .end(function(err, res){
        expect(res.body._id).to.equal(id)
        expect(res.body.username).to.equal('kunev')
        expect(res.body.depth).to.equal(3)
        done()
      })
    })
  })

})
