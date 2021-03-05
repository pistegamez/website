var imgFont1 = new Image();

function PisteFont(image,width,height) {
	this.image = image;
	this.width = width;
	this.height = height;
	this.draw = drawText;
}

function drawText(teksti,x,y) {
	var code;
	var i;
	x = Math.floor(x);
	y = Math.floor(y);
	for (i=0;i<teksti.length;i++) {
		code = teksti.charCodeAt(i)-32;
		ctx.drawImage(imgFont1,
				Math.floor((code%16)*35),(Math.floor(code/16))*23,35,23,
				x+i*35,y,35,23);
	}
}

var keys = new Array();

var key_left;
var key_right;
var key_up;
var key_down;
var pause = false;

function initKeys() {
	for (var i=0;i<256;i++) {
		keys[i] = false;
	}
}

function changeKey(which, state){

	keys[which] = state;

	switch (which){
		case 65: case 37: key_left=state; break; // left
		case 87: case 38: key_up=state; break; // up
		case 68: case 39: key_right=state; break; // right
		case 83: case 40: key_down=state; break;// down
		case 80: if (state==true) pause=!pause; break;// P
		//case 27: window.close(); break;// kill window/tab
		//case 32: key[4]=to; break; // space bar;
		//case 17: key[5]=to; break; // ctrl
		//case 66: if (to) { shoot() } break; // b
		
	}
	if (debugEnabled) {
		canvas = document.getElementById('input').innerHTML=''+which+'='+state;
	}
}
document.onkeydown=function(e){changeKey((e||window.event).keyCode, true);}
document.onkeyup=function(e){changeKey((e||window.event).keyCode, false);}

var totalFrames = 0;
var frames = 0;
var fpsIntervalID;

function countFps() {
	totalFrames += frames;
	seconds++;
	document.getElementById('fps').innerHTML = ''+frames;
	if (debugEnabled) {
		document.getElementById('loops').innerHTML = ''+loops;
		document.getElementById('fps_avg').innerHTML = '('+seconds+'): '+totalFrames/seconds;
	}
	frames = 0;
	loops = 0;
	
}

function setFPS(newLoopInterval) {
	clearTimeout(renderIntervalId);
	renderIntervalId = setInterval(doRenderLoop, 1000/newLoopInterval);
}

var imagesLoaded = 0;
var numOfImages = 0;
var allImagesLoaded = false;

function imageOnLoad() {
	imagesLoaded++;
	//document.getElementById('debug').innerHTML+='image '+this.src+' loaded ('+imagesLoaded+')/'+numOfImages+'<br/><img src="'+this.src+'" width="16px" height="16px"/><br/>';
	debug('image '+this.src+' loaded ('+imagesLoaded+')/'+numOfImages+'<br/><img src="'+this.src+'" width="16px" height="16px"/><br/>');
	if (imagesLoaded == numOfImages) {
		allImagesLoaded = true;
		ctxBG.drawImage(imgBG01,0,0);
	}
}

function imageOnError() {
	imagesLoaded++;
	document.getElementById('debug').innerHTML+='image '+this.src+' failed to load ('+imagesLoaded+')/'+numOfImages+'<br/>';
}

function addImage(image, file) {
	image.src = './img/'+file;
	image.onload = imageOnLoad;
	image.onerror = imageOnError;
	image.onabort = imageOnError;
	numOfImages++;
	//document.getElementById('debug').innerHTML+='image '+file+' added ('+numOfImages+')<br/>';
	debug('image '+file+' added ('+numOfImages+')<br/>');
}

function blur(ctx) {
//     var canvas = document.getElementsByTagName('canvas')[0];
//     var context = canvas.getContext('2d');



     // get the image data to manipulate
	 try {
		var input = ctx.getImageData(0, 0, canvas.width, canvas.height);
	} catch (e) {
		return;
	}

     // get an empty slate to put the data into
     var output = ctx.createImageData(canvas.width, canvas.height);

     // alias some variables for convenience
     // notice that we are using input.width and input.height here
     // as they might not be the same as canvas.width and canvas.height
     // (in particular, they might be different on high-res displays)
     var w = input.width, h = input.height;
     var inputData = input.data;
     var outputData = output.data;
	 var i = 0, y = 0, x = 0, c = 0;
     // edge detection
     for (y = 2; y < h-2; y++) {
		for (x = 2; x < w-2; x++) {
			for (c = 0; c < 3; c++) {
				i = (y*w + x)*4 + c;
				outputData[i] = (inputData[i]+inputData[i+4]+inputData[i-4]+inputData[((y+1)*w+x)*4+c]+inputData[((y-1)*w+x)*4+c])/5;
			}
			outputData[(y*w + x)*4 + 3] = 255; // alpha
		}
     }

     // put the image data back after manipulation
     ctx.putImageData(output, 0, 0);
}

