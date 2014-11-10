var url = 'https://api.github.com'

var conf = {
  following: url + '/users/:username/following',
  isFollowing: url + '/users/:username/following/:target_user',
  clientId: '58610d7f8acebe6eacbd',
  clientSecret: 'b9ceef99751c07cfefea636aed92f2fe3f772145'
}


module.exports = conf
