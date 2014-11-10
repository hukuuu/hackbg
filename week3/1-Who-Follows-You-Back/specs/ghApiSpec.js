var config = require('../lib/githubApi/config.js'),
api = require('../lib/githubApi/api.js')


describe('github api', function(){
  it('can give me the followers of a user', function(done){
    var promise = api.following('hukuuu')
    promise.should.eventually.have.property('length').that.equals(10).and.notify(done)
  })

  it('should return true if a follows b', function(done) {
    api.isFollowing('hukuuu', 'bronson').should.eventually.equal(true).and.notify(done)
  })

  it('should return false if a doesn follow b', function(done) {
    api.isFollowing('hukuuu', 'imaginaryuser123321').should.eventually.equal(false).and.notify(done)
  })

})

