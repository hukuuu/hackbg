var config = require('../config/config.js'),
port = process.env.PORT || 3000,
request = require('supertest')('http://localhost:' + port)

describe('groups api', function() {
  it('can list all groups', function(done) {
    request.get(config.endpoints.group_list)
    .send()
    .end(function(err, res) {
      expect(err).to.not.exist
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      done()
    })
  })
})
