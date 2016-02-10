(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
mapping = []
mapping[0]=[66, 30, 15]
mapping[1]=[25, 7, 26]
mapping[2]=[9, 1, 47]
mapping[3]=[4, 4, 73]
mapping[4]=[0, 7, 100]
mapping[5]=[12, 44, 138]
mapping[6]=[24, 82, 177]
mapping[7]=[57, 125, 209]
mapping[8]=[134, 181, 229]
mapping[9]=[211, 236, 248]
mapping[10]=[241, 233, 191]
mapping[11]=[248, 201, 95]
mapping[12]=[255, 170, 0]
mapping[13]=[204, 128, 0]
mapping[14]=[153, 87, 0]
mapping[15]=[106, 52, 3]
module.exports = function(i) {
  return mapping[i % 16];
}

},{}],2:[function(require,module,exports){
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
  console.log('percentage right: ' + percentageRight);
  console.log('percentage down: ' + percentageDown);
  button.click();
}

button.click()

},{"./getColour":1}]},{},[2]);
