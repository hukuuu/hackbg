var config = require('../config/config.js'),
port = process.env.PORT || 3000,
request = require('supertest')('http://localhost:' + port)


describe('sitemap api', function() {

  it('can create pending sitemap', function(done) {
    request.post(config.endpoints.sitemap_create)
    .send({
      url: 'http://nodeguide.ru'
    })
    .end(function(err, res) {
      expect(err).to.not.exist
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('_id')
      expect(res.body).to.have.property('status')
      expect(res.body.status).to.equal('currently crawling')
      done()
    })
  })
  
  it('can give me a sitemap', function(done) {
    request.get(config.endpoints.sitemap_find.replace(':id', '546a658369192e9c6d43bc94'))
    .send()
    .end(function(err, res) {
      expect(err).to.not.exist
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('_id')
      expect(res.body).to.have.property('status')
      expect(res.body.status).to.equal('currently crawling')
      console.log(JSON.stringify(res.body, null, 4))
      done()
    })
  })


})
