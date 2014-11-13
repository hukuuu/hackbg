var config = require('../config/config.js'),
port = process.env.PORT || 3000,
request = require('supertest')('http://localhost:' + port)


describe('contacts api', function() {

  it('can create a contact', function(done) {
    request.post(config.endpoints.contact_create)
    .send({
      phoneNumber: '0884342245',
      personIdentifier: 'ivan petkov'
    })
    .end(function(err, res) {
      expect(err).to.not.exist
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('_id')
      expect(res.body).to.have.property('phoneNumber')
      expect(res.body).to.have.property('personIdentifier')
      done()
    })
  })

  it('can list all contacts', function(done) {
    request.get(config.endpoints.contact_list)
    .send()
    .end(function(err, res) {
      expect(err).to.not.exist
      expect(res.status).to.equal(200)
      expect(res.body.length).to.be.defined
      done()
    })
  })

  it('can give me a contact by id', function(done) {
    request.post(config.endpoints.contact_create)
    .send({
      phoneNumber: '0884342245',
      personIdentifier: 'iban pitkov'
    })
    .end(function(err, res) {
      var contactId = res.body._id
      request.get(config.endpoints.contact_find.replace(':contactId',contactId))
      .send()
      .end(function(err, res) {
        expect(err).to.not.exist
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('phoneNumber')
        expect(res.body).to.have.property('personIdentifier')
        done()
      })
    })
  })

  it('can delete a contact by id', function(done) {
    request.post(config.endpoints.contact_create)
    .send({
      phoneNumber: '0884342245',
      personIdentifier: 'ivam petkof'
    })
    .end(function(err, res) {
      var contactId = res.body._id
      request.delete(config.endpoints.contact_remove.replace(':contactId',contactId))
      .send()
      .end(function(err, res) {
        expect(err).to.not.be.defined
        expect(res.status).to.equal(200)
        request.get(config.endpoints.contact_find.replace(':contactId',contactId))
        .send()
        .end(function(err, res) {
          expect(err).to.not.exist
          expect(res.status).to.equal(404)
          done()
        })
      })
    })
  })

})
