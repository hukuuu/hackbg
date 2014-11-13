function edgeDetection (imageData) {
  var kernel = [ //this is edge detection kernel
    [0,  1, 0],
    [1, -4, 1],
    [0,  1, 0]
  ]
  return applyKernel(imageData, kernel)
}

function boxBlur (imageData) {
  var kernel = [ //this is blur kernel
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ] 
  return applyKernel(imageData, kernel)
}

function applyKernel (imageData, kernel) {
  var iWidth = imageData.length,
  iHeight = imageData[0].length,
  kWidth = kernel.length,
  kHeight = kernel[0].length,
  minI = getLowIndex(kWidth),
  maxI = getHighIndex(kWidth),
  minJ = getLowIndex(kHeight),
  maxJ = getHighIndex(kHeight),
  x,y,i,j,
  srcVal, sum,
  result

  //initialize result matrix
  result = []
  imageData.forEach(function(){
    result.push([])
  })
  //initialize result matrix


  for(y = 0; y < iWidth; y++) {
    for(x = 0; x < iHeight; x++) {
      sum = 0;
      for(i = minI; i <= maxI; i++) {
        for(j = minJ; j <= maxJ; j++) {
          srcVal = get(imageData, y+i,x+j)
          sum += srcVal * kernel[i + maxI][j + maxJ]
        }
      }
      result[y][x] = sum
    }
  }

  return result;

}

function get(matrix, x, y) {
  if(!matrix[x]) 
    return 0
  if(!matrix[x][y]) 
    return 0
  return matrix[x][y]
}

function getLowIndex(size) {
  if(size % 2 === 0)
    return 0 - (size/2)
  else
    return 0 - ((size-1)/2)
}

function getHighIndex(size) {
  if(size % 2 === 0)
    return size/2
  else
    return (size-1)/2
}


module.exports = {
  edgeDetection: edgeDetection,
  boxBlur: boxBlur,
  applyKernel: applyKernel
}
