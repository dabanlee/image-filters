/*!
 * Image Effects
 * Author: @JustClear
 * http://justclear.github.io
 * 
 */ 

 (function() {
 	window.addEventListener('load', eventWindowLoad, false);

 	function eventWindowLoad() {
 		canvasApp();
 	}

 	function isCanvasSupport() {
 		return !! document.createElement('canvas').getContext;
 	}

 	function canvasApp() {
 		if(!isCanvasSupport()) {
 			return;
 		} else {
 			
 			var theCanvas = $('.canvas-panel')[0];
 			var context = theCanvas.getContext('2d');

 			theCanvas.width = 1300;
 			theCanvas.height = 700;
 			
 			var theCanvasDefault = $('.canvas-panel-default')[0];
 			var contextDefault = theCanvasDefault.getContext('2d');

 			theCanvasDefault.width = 1300;
 			theCanvasDefault.height = 700;
 		}

 		//
 		// Get Button
 		//

 		$('.clear-trigger').on('click', function(event) {
 			var targetData = $(event.target).data('effects');
 			event.preventDefault();
 			effectDefault();

 			switch(targetData) {
 				case 'effect-default':
 					effectDefault();
 					break;
 				case 'effect-gray':
 					effectGray();
 					break;
 				case 'effect-defogging':
 					effectDefogging();
 					break;
 				case 'effect-lighter':
 					effectBlur();
 					break;
 				case 'effect-old':
 					effectOld();
 					break;
 				case 'effect-relievo':
 					effectRelievo();
 					break;
 				case 'effect-black-white':
 					effectblackWhite();
 					break;
 				case 'effect-reverse':
 					effectReverse();
 					break;
 			}
 		});

		//
		// Image Load
		//

 		var image = new Image();
		image.src = "img/1.jpg";

 		image.addEventListener('load', eventImageLoad, false);

 		function eventImageLoad() {
 			context.drawImage(image, 0, 0, theCanvas.width, theCanvas.height);
 			contextDefault.drawImage(image, 0, 0, theCanvasDefault.width, theCanvasDefault.height);
 		}

 		//
 		// Effect Functions
 		//

 		function effectDefault() {
 			var imageData = contextDefault.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var pixelData = imageData.data;

 			context.putImageData(imageData, 0, 0, 0, 0, theCanvas.width, theCanvas.height);
 		}

 		function effectGray() {
 			var imageData = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var pixelData = imageData.data;

 			for(var i = 0; i < theCanvas.width * theCanvas.height; i ++) {
 				var r = pixelData[4 * i + 0];
 				var g = pixelData[4 * i + 1];
 				var b = pixelData[4 * i + 2];

 				var gray = (r + g + b) / 3;

 				pixelData[4 * i + 0] = gray + 50;
 				pixelData[4 * i + 1] = gray + 50;
 				pixelData[4 * i + 2] = gray + 50;
 			}

 			context.putImageData(imageData, 0, 0, 0, 0, theCanvas.width, theCanvas.height);
 		}

 		function effectReverse() {
 			var imageData = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var pixelData = imageData.data;

 			for(var i = 0; i < theCanvas.width * theCanvas.height; i ++) {
 				var r = pixelData[4 * i + 0];
 				var g = pixelData[4 * i + 1];
 				var b = pixelData[4 * i + 2];

 				pixelData[4 * i + 0] = 255 - r;
 				pixelData[4 * i + 1] = 255 - g;
 				pixelData[4 * i + 2] = 255 - b;
 			}

 			context.putImageData(imageData, 0, 0, 0, 0, theCanvas.width, theCanvas.height);
 		}

 		function effectDefogging() {
 			var imageData = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var pixelData = imageData.data;

 			for(var i = 0; i < theCanvas.width * theCanvas.height; i ++) {
 				var r = pixelData[4 * i + 0];
 				var g = pixelData[4 * i + 1];
 				var b = pixelData[4 * i + 2];

 				pixelData[4 * i + 0] = r + 10;
 				pixelData[4 * i + 1] = g + 20;
 				pixelData[4 * i + 2] = b + 30;
 			}

 			context.putImageData(imageData, 0, 0, 0, 0, theCanvas.width, theCanvas.height);
 		}

 		function effectOld() {
 			var imageData = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var pixelData = imageData.data;

 			for(var i = 0; i < theCanvas.width * theCanvas.height; i ++) {
 				var r = pixelData[4 * i + 0];
 				var g = pixelData[4 * i + 1];
 				var b = pixelData[4 * i + 2];

 				pixelData[4 * i + 0] = r + 60;
 				pixelData[4 * i + 1] = g + 40;
 				pixelData[4 * i + 2] = b + 10;
 			}

 			context.putImageData(imageData, 0, 0, 0, 0, theCanvas.width, theCanvas.height);
 		}

 		function effectRelievo() {
 			var imageData = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var pixelData = imageData.data;

 			for(var i = 0; i < theCanvas.width * theCanvas.height; i ++) {

 				var r = pixelData[4 * i + 0];
 				var g = pixelData[4 * i + 1];
 				var b = pixelData[4 * i + 2];

 				var adjacentR = pixelData[4 * (i + 1) + 0];
 				var adjacentG = pixelData[4 * (i + 1) + 1];
 				var adjacentB = pixelData[4 * (i + 1) + 2];

 				/**
				 * 浮雕：用当前点的 RGB 值减去相邻点的 RGB 值
				 * 并加上 128 作为新的 RGB 值。
 				 */ 
 				pixelData[4 * i + 0] = r - adjacentR + 128;
 				pixelData[4 * i + 1] = g - adjacentG + 128;
 				pixelData[4 * i + 2] = b - adjacentB + 128;
 			}

 			context.putImageData(imageData, 0, 0, 0, 0, theCanvas.width, theCanvas.height);
 		}

 		function effectBlur() {
 			var temImageData = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var temPixelData = temImageData.data;

 			var imageData = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var pixelData = imageData.data;

 			var blurR = 1;
 			var totalNumber = 2 * (2 * blurR + 1);
 			for(var i = blurR; i < theCanvas.height - blurR; i ++) {
 				for(var j = blurR; j < theCanvas.width - blurR; j ++) {

 					var totalR = 0,
 						totalG = 0,
 						totalB = 0;

 					for(var dx = -blurR; dx <= blurR; dx ++) {
 						for(var dy = -blurR; dy <= blurR; dy ++) {
	 						var x = i + dx;
	 						var y = j + dy;

 							var p = i * theCanvas.width + j;
 							totalR += pixelData[4 * p + 0];
 							totalG += pixelData[4 * p + 1];
 							totalB += pixelData[4 * p + 2];
 						}
 					}

 					var p = i * theCanvas.width + j;

					pixelData[4 * p + 0] = totalR / totalNumber;
					pixelData[4 * p + 1] = totalG / totalNumber;
					pixelData[4 * p + 2] = totalB / totalNumber;
 				}
 			}

 			context.putImageData(imageData, 0, 0, 0, 0, theCanvas.width, theCanvas.height);
 		}

 		function effectblackWhite() {
 			var imageData = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
 			var pixelData = imageData.data;

 			for(var i = 0; i < theCanvas.width * theCanvas.height; i ++) {
 				var r = pixelData[4 * i + 0];
 				var g = pixelData[4 * i + 1];
 				var b = pixelData[4 * i + 2];

 				var average = (r + g + b) / 3;

 				if(average > 255 / 2) {
 					value = 255;
 				} else {
 					value = 0;
 				}

 				pixelData[4 * i + 0] = value;
 				pixelData[4 * i + 1] = value;
 				pixelData[4 * i + 2] = value;
 			}

 			context.putImageData(imageData, 0, 0, 0, 0, theCanvas.width, theCanvas.height);
 		}
 	}
})();