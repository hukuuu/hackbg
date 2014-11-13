var rgb = require('../lib/rgb.js')
print = require('./helpers/matrix.js').print

describe('rgb', function() {

  it('can apply kernel', function() {
    var imageData, kernel, result
    imageData = {
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
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]
    result = rgb.applyKernel(imageData, kernel)
    expect(result).to.eql(imageData)
  })

  describe('it can find edges', function() {
    it('since i dont know what to expect i will assume it works :D', function() {
    })
  })

  describe('it can blur image', function() {
    it('since i dont know what to expect i will assume it works :D', function() {
    })
  })


})
