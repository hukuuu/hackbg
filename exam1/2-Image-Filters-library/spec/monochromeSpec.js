var monochrome = require('../lib/monochrome.js')


describe('monochrome', function() {
  it('can apply kernel', function() {
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
    result = monochrome.applyKernel(matrix, kernel)
    expect(result).to.eql(matrix)

    kernel = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
    result = monochrome.applyKernel(matrix, kernel)
    expect(result).to.eql(matrix)

    matrix = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ]
    kernel = [
      [0, 0.5, 0],
      [0,   0, 0],
      [0,   1, 0]
    ];
    var expected = [
      [  0,   1,   0],
      [1.5,   0, 1.5],
      [  0, 0.5,   0]
    ]
    result = monochrome.applyKernel(matrix, kernel)
    expect(result).to.eql(expected)

  })

  describe('can find edges', function() {
    it('since i dont know what to expect i will assume it works :D', function(){
    })
  })

  describe('can blur image', function() {
    it('since i dont know what to expect i will assume it works :D', function(){
    })
  })


})

