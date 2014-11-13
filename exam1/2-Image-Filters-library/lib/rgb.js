var monochrome = require('./monochrome.js')
var props = ['red', 'green', 'blue']

function edgeDetection(imageData) {
  var result = {}
  props.forEach(function(prop) {
    result[prop] = monochrome.edgeDetection(imageData[prop])
  })
  return result
}

function boxBlur(imageData) {
  var result = {}
  props.forEach(function(prop) {
    result[prop] = monochrome.boxBlur(imageData[prop])
  })
  return result
}

function applyKernel(imageData, kernel) {
  var result = {}
  props.forEach(function(prop) {
    result[prop] = monochrome.applyKernel(imageData[prop], kernel)
  })
  return result
}

module.exports = {
  edgeDetection: edgeDetection,
  boxBlur: boxBlur,
  applyKernel: applyKernel
}
