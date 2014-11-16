var api = require('../lib/api.js')

describe('api', function() {
  it('can apply kernel to monochrome image', function(done) {
    var matrix, kernel, result 

    matrix = [
      [255,   0,   0,   0, 255],
      [  0, 255,   0, 255,   0],
      [  0,   0, 255,   0,   0],
      [  0, 255,   0, 255,   0],
      [255,   0,   0,   0, 255]
    ] 
    kernel = [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ] 
    var promise = api.monochrome.applyKernel(matrix, kernel) 
    expect(promise).to.eventually.be.fulfilled.eql(matrix).notify(done)

  })

  describe('can edge detect monochrome image', function() {
    it('just passing', function() {
    })
  })

  describe('can blur monochrome image', function() {
    it('just passing', function() {
    })
  })

  it('can apply kernel to rgb image', function(done) {
    var matrix, kernel, result 

    matrix =  {
      red: [
        [255,   0,   0,   0, 255],
        [  0, 255,   0, 255,   0],
        [  0,   0, 255,   0,   0],
        [  0, 255,   0, 255,   0],
        [255,   0,   0,   0, 255]
      ],
      green: [
        [255,   0,   0,   0, 255],
        [  0, 255,   0, 255,   0],
        [  0,   0, 255,   0,   0],
        [  0, 255,   0, 255,   0],
        [255,   0,   0,   0, 255]
      ],
      blue: [
        [255,   0,   0,   0, 255],
        [  0, 255,   0, 255,   0],
        [  0,   0, 255,   0,   0],
        [  0, 255,   0, 255,   0],
        [255,   0,   0,   0, 255]
      ] 

    }
    kernel = [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ] 
    var promise = api.rgb.applyKernel(matrix, kernel) 
    expect(promise).to.eventually.be.fulfilled.eql(matrix).notify(done)

  })

  describe('can edge detect rgb image', function() {
    it('just passing', function() {
    })
  })

  describe('can blur rgb image', function() {
    it('just passing', function() {
    })
  })

})
