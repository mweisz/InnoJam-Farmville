
var overviewContainer;
var detailsContainer;
var plantSelectorContainer;
var headerContainer;
var statsContainer;

var hasSelectedPlant = false;

window.onload = function() {
	init();
}

function init() {
	console.log("Initializing");
	animateContent();

	overviewContainer = document.getElementById("content_fields");
	detailsContainer = document.getElementById("content_detail");
	plantSelectorContainer = document.getElementById("content_select_plant");
	headerContainer = document.getElementById("header_container");
	statsContainer = document.getElementById("stats");
	
	showOverview();

	setClickListeners();

	updateCharts();

	debug();
}

function debug() {
	showDetails();
}

function setClickListeners() {
	overviewContainer.onclick = function() {
		if (hasSelectedPlant) {
			showDetails();
		} else {
			showPlantSelector();
		}
	}

	headerContainer.onclick = function() {
	    showOverview();
	}

	plantSelectorContainer.onclick = function() {
		hasSelectedPlant = true;
		hidePlantSelector();
	    document.getElementById("field_0").children[0].style.backgroundImage = "url('media/ic_tomato_plant.png')";
	}

	document.getElementById("action_lights").onclick = function() {
	    turnLightsOn();
		highlightClick(document.getElementById("action_lights").children[0]);
	}
	
	document.getElementById("action_fertilize").onclick = function() {
	    fertilizeField();
	    highlightClick(document.getElementById("action_fertilize").children[0]);
	}
	
	document.getElementById("action_water").onclick = function() {
	    waterField();
	    highlightClick(document.getElementById("action_water").children[0]);
	}
	
	document.getElementById("action_harvest").onclick = function() {
	    harvestField();
	    highlightClick(document.getElementById("action_harvest").children[0]);
	}

	document.getElementById("action_stats").onclick = function() {
		highlightClick(document.getElementById("action_stats").children[0]);
	    if (statsContainer.offsetHeight < 100) {
	    	statsContainer.style.height = "200px";
	    } else {
	    	statsContainer.style.height = "0px";
	    }
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
	updateCharts();
}

function showPlantSelector() {
	plantSelectorContainer.style.top = "190px";
}

function hidePlantSelector() {
	plantSelectorContainer.style.top = "-500px";
}


function highlightClick(div) {
	div.style.backgroundColor = "#0C3";
	window.setTimeout(function(){
		div.style.backgroundColor = "#FFF";
	},500);
}

function updateCharts() {
	$('#stats_container').highcharts({
        title: {
            text: 'Temperature'
        },
        
        yAxis: {
            min: 15,
            max: 25,
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: [{
        	showInLegend: false,
            name: '',
            data: temperature_array
        }]
    });
}