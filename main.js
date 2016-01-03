var canvas = document.getElementsByClassName('canvasHandle')[0]
var context = canvas.getContext('2d')
var width = 800;
var height = 600;
context.canvas.width = width
context.canvas.height = height
var imageData = context.createImageData(1, 1)
var pixelData = imageData.data
pixelData[0] = 0
pixelData[1] = 0
pixelData[2] = 0
pixelData[3] = 255

var drawMandlebrot = function(maxIterations) {
  for (row=0; row < height; row++) {
    for (col=0; col < width; col++) {
      var cre = (col - width/2) * 4 / width;
      var cim = (row - height/2) * 4 / width;
      var x = 0;
      var y = 0;
      var iteration = 0;
      while (x*x+y*y <= 4 && iteration < maxIterations) {
        var xnew = x*x - y*y + cre;
        y = 2*x*y + cim;
        x = xnew;
        iteration++;
      }
      if (iteration >= maxIterations) context.putImageData(imageData, row, col)
    }
  }
}

button = document.getElementsByClassName('buttonHandle')[0]
button.onclick = function() {
  input = document.getElementsByClassName('inputHandle')[0]
  sizeInput = document.getElementsByClassName('sizeHandle')[0]
  width = sizeInput.value;
  height = width * 0.75
  context.canvas.width = width
  context.canvas.height = height
  context.clearRect(0, 0, width, height)
  drawMandlebrot(input.value)
}

button.click()
