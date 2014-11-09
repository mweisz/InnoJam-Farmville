var overviewContainer;
var detailsContainer;
var headerContainer;

window.onload = function() {
	init();
}

function init() {
	console.log("Initializing");
	animateContent();

	overviewContainer = document.getElementById("content_fields");
	detailsContainer = document.getElementById("content_detail");
	headerContainer = document.getElementById("header_container");
	
	showOverview();

	overviewContainer.onclick = function() {
	    showDetails();
	}

	headerContainer.onclick = function() {
	    showOverview();
	}
}

function animateContent() {
	window.setTimeout(function(){
		document.getElementById("content").style.opacity = 1;
	},100);

	window.setTimeout(function(){
		document.getElementById("menu").style.opacity = 1;
	},700);
}

function showOverview() {
	overviewContainer.style.display = "block";
	detailsContainer.style.display = "none";
}

function showDetails() {
	overviewContainer.style.display = "none";
	detailsContainer.style.display = "block";
}