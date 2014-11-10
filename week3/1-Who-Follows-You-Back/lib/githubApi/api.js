var request = require('superagent'),
config = require('./config.js'),
q = require('q')

var auth = function(string) {
  if(string.indexOf('?') === -1)
    return string.concat('?client_id=' + config.clientId + '&client_secret=' + config.clientSecret)
  else
    return string.concat('&client_id=' + config.clientId + '&client_secret=' + config.clientSecret)
}

var dot = function(property) {
  return function(obj){
    return obj[property]
  }
}

var following = function(username) {
  var deferred = q.defer()
  request.get(auth(config.following.replace(':username',username)))
  .send()
  .end(function(err, res) {
    if(err)
      deferred.reject(err)
    else
      deferred.resolve(res.body.map(dot('login')))
  })
  return deferred.promise
}

var isFollowing = function(follower, following) {
  var deferred = q.defer()
  request.get(auth(config.isFollowing.replace(':username',follower).replace(':target_user',following)))
  .send()
  .end(function(err, res) {
    if(err)
      deferred.reject(err)
    else
      deferred.resolve(res.status === 204)
  })
  return deferred.promise
}

module.exports = {
  following: following,
  isFollowing: isFollowing
}
