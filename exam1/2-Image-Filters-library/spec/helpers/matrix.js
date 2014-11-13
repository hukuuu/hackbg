function print(matrix) {
  var w = matrix.length, 
  h = matrix[0].length, 
  i, j,
  row;

  for(i = 0; i < w; i++) {
    row = ''
    for(j = 0; j < h; j++) {
      row += matrix[i][j] + ' '
    }
    console.log(row)
  }
}

module.exports = {
  print: print
}
