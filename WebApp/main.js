var image_1_1;
var image_1_2;
var image_2_1;
var image_2_2;

var image_1_index = 1;
var image_2_index = 1;

window.onload = function() {
	init();
}

function init() {
	console.log("Initializing");
	animateContent();
	initImages();
}

function animateContent() {
	window.setTimeout(function(){
		document.getElementById("header_main").style.opacity = 1;
		document.getElementById("header_name").style.opacity = 1;
	},100);
	window.setTimeout(function(){
		document.getElementById("header_sub").style.opacity = 1;
	},1000);

	window.setTimeout(function(){
		document.getElementById("header_container").style.top = "20px";
	},2000);

	window.setTimeout(function(){
		document.getElementById("header_seperator").style.opacity = 1;
	},3000);

	window.setTimeout(function(){
		document.getElementById("content").style.opacity = 1;
		document.getElementById("header_name").style.color = "#09C";
	},3500);
}

function initImages() {
	image_1_1 = document.getElementById("image_1_1");
	image_1_2 = document.getElementById("image_1_2");
	image_2_1 = document.getElementById("image_2_1");
	image_2_2 = document.getElementById("image_2_2");

	showImage(image_1_1);
	showImage(image_2_1);

	hideImage(image_1_2);
	hideImage(image_2_2);

	loadImage(image_1_1, "images/stephan_schultz_0.jpg");
	loadImage(image_2_1, "images/project_0.jpg");
	loadImage(image_1_2, "images/stephan_schultz_1.jpg");
	loadImage(image_2_2, "images/project_1.jpg");

	window.setInterval(showNextImage1, 5000);

	window.setTimeout(function(){
		window.setInterval(showNextImage2, 5000);
	},2500);
}

function loadImage(image, url) {
	image.style.backgroundImage = "url('" + url + "')";
}

function showImage(image) {
	image.style.opacity = 1;
	image.isVisible = true;
}

function hideImage(image) {
	image.style.opacity = 0;
	image.isVisible = false;
}

function showNextImage1() {
	image_1_index++;
	if (image_1_index > 4) {
		image_1_index = 0;
	}

	if (image_1_1.isVisible) {
		showImage(image_1_2);
		hideImage(image_1_1);
		window.setTimeout(function(){
			loadImage(image_1_1, "images/stephan_schultz_" + image_1_index + ".jpg");
		}, 1000);
	} else {
		showImage(image_1_1);
		hideImage(image_1_2);
		window.setTimeout(function(){
			loadImage(image_1_2, "images/stephan_schultz_" + image_1_index + ".jpg");
		}, 1000);
	}
}

function showNextImage2() {
	image_2_index++;
	if (image_2_index > 4) {
		image_2_index = 0;
	}

	if (image_2_1.isVisible) {
		showImage(image_2_2);
		hideImage(image_2_1);
		window.setTimeout(function(){
			loadImage(image_2_1, "images/project_" + image_2_index + ".jpg");
		}, 1000);
	} else {
		showImage(image_2_1);
		hideImage(image_2_2);
		window.setTimeout(function(){
			loadImage(image_2_2, "images/project_" + image_2_index + ".jpg");
		}, 1000);
	}
}