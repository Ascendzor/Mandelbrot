var canvas = document.getElementsByClassName('canvasHandle')[0]
var context = canvas.getContext('2d')
var width = 800;
var height = 600;
var xScale = 1;
var yScale = 1;
var panX = 1;
var panY = 1;
context.canvas.width = width
context.canvas.height = height
getColour = require('./getColour')

var drawMandlebrot = function(maxIterations) {
  pixelIndex = 0
  var imageData = context.createImageData(width, height)
  for (row=0; row < height; row++) {
    for (col=0; col < width; col++) {
      var cre = (col - width/2 * panX) * 4 / width * xScale;
      var cim = (row - height/2 * panY) * 4 / width * yScale;
      var x = 0;
      var y = 0;
      var iteration = 0;
      while (x*x+y*y <= 4 && iteration < maxIterations) {
        var xnew = x*x - y*y + cre;
        y = 2*x*y + cim;
        x = xnew;
        iteration++;
      }
      var pixelData = imageData.data
      pixelData[0] = iteration /2
      pixelData[1] = iteration /2
      pixelData[2] = iteration /2
      pixelData[3] = 128
      colours = getColour(iteration)
      if(iteration == maxIterations) {
        colours = [0, 0, 0]
      }
      imageData.data[pixelIndex++] = colours[0]
      imageData.data[pixelIndex++] = colours[1]
      imageData.data[pixelIndex++] = colours[2]
      imageData.data[pixelIndex++] = 255
    }
  }
  context.putImageData(imageData, 0, 0)
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

canvas.ondblclick = function (e){
  percentageRight = e.pageX / width;
  percentageDown = e.pageY / height;
  panX = panX + (0.5 - percentageRight)*2;
  panY = panY + (0.5 - percentageDown)*2;
  console.log('percentage right: ' + percentageRight);
  console.log('percentage down: ' + percentageDown);
  button.click();
}

button.click()
