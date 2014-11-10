
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
	    toggleLights();
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
	    	statsContainer.style.height = "400px";
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
    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });

    // Create the chart
    $('#stats_container').highcharts('StockChart', {
        chart : {
            events : {
                load : function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(); // current time
                        var y = getLastTemperature();
                        series.addPoint([x, y], true, true);
                        getTemperatures();
                    }, 1000);
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : 'Live temperature'
        },

        yAxis : {
        	min: 20,
        	max: 30
        },

		navigator : {
            enabled : true
        },

        exporting: {
            enabled: false
        },

        series : [{
            name : '',
            data : (function () {
            	var value = temperatures_array[0];
            	return new Array(value, value, value, value, value, value, value, value, value, value, value, value, value, value, value);
            }())
        }]
    });
}
