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

	setClickListeners();
}

function setClickListeners() {
	overviewContainer.onclick = function() {
	    showDetails();
	}

	headerContainer.onclick = function() {
	    showOverview();
	}

	document.getElementById("action_lights").onclick = function() {
	    turnLightsOn();
	}
	
	document.getElementById("action_fertilize").onclick = function() {
	    fertilizeField();
	}
	
	document.getElementById("action_water").onclick = function() {
	    waterField();
	}
	
	document.getElementById("action_harvest").onclick = function() {
	    harvestField();
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