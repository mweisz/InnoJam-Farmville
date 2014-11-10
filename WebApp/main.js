
var overviewContainer;
var detailsContainer;
var plantSelectorContainer;
var headerContainer;

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
	
	showOverview();

	setClickListeners();
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

function showPlantSelector() {
	plantSelectorContainer.style.top = "190px";
}

function hidePlantSelector() {
	plantSelectorContainer.style.top = "-500px";
}


function updateCharts(){
	var chart = document.getElementById("chart_container");
	chart.highcharts({
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }
        ]
    });
}