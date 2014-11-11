var API_ENDPOINT = "http://lekotsch.net:5000/innojam/";

//Fields
var ENDPOINT_FIELDS = API_ENDPOINT + "fields";
var ENDPOINT_FIELD = API_ENDPOINT + "field";
var ENDPOINT_PLANT_IN_FIELD = API_ENDPOINT + "plantInField";

//Actions 
var ENDPOINT_WATER_FIELD = API_ENDPOINT + "waterField";
var ENDPOINT_LIGHTS_ON = API_ENDPOINT + "turnLightsOn";
var ENDPOINT_LIGHTS_OFF = API_ENDPOINT + "turnLightsOff";
var ENDPOINT_LIGHTS_TOGGLE = API_ENDPOINT + "toggleLights";
var ENDPOINT_FERTILIZE_FIELD = API_ENDPOINT + "fertilizeField";
var ENDPOINT_HARVEST_FIELD = API_ENDPOINT + "harvestField";

// Sensor Data
var ENDPOINT_TEMPERATURES = API_ENDPOINT + "temperatures";
var ENDPOINT_WETTNESS = API_ENDPOINT + "wettness";
var ENDPOINT_BRIGHTNESS = API_ENDPOINT + "brightness";
var ENDPOINT_PHOTO = API_ENDPOINT + "photo";

// Stuff
var ENDPOINT_ALL_AVAILABLE_PLANTS = API_ENDPOINT + "allAvailablePlants";

var ENDPOINT_PHOTO = "https://dl.dropboxusercontent.com/u/272588/reduceFile.jpg";

var DEFAULT_FIELD_ID = 1;

var allFields;
var field;
var plantInField;

var temperatures;
var temperatures_array = new Array(20, 20);
var wettness;
var brightness;
var photo;

var allAvailablePlants;


// Fields
function getFields() {
    var url = ENDPOINT_FIELDS;
    var result = httpGet(url);
    allFields = JSON.parse(result);
}

function getField(fieldId) {
    var url = ENDPOINT_FIELD + "?fieldId=" + fieldId;
    var result = httpGet(url);
    field = JSON.parse(result);
}

function getPlantInField(fieldId, plant) {
    var url = ENDPOINT_PLANT_IN_FIELD + "?fieldId=" + fieldId + "&plant=" + plant;
    var result = httpGet(url);
    plantInField = JSON.parse(result);
}


// Actions
function waterField(){
    var url = ENDPOINT_WATER_FIELD;
    httpGet(url);
}

function turnLightsOn(){
    var url = ENDPOINT_LIGHTS_ON;
    httpGet(url);
}

function turnLightsOff(){
    var url = ENDPOINT_LIGHTS_OFF;
    httpGet(url);
}

function toggleLights(){
    var url = ENDPOINT_LIGHTS_TOGGLE;
    httpGet(url);
}

function fertilizeField(){
    var url = ENDPOINT_FERTILIZE_FIELD;
    httpGet(url);
}

function harvestField(){
    var url = ENDPOINT_HARVEST_FIELD;
    httpGet(url);
}


// Sensor Data
function getTemperatures() {
    var url = ENDPOINT_TEMPERATURES + "?fieldId=" + 1;
    var result = httpGet(url);
    temperatures = JSON.parse(result);

    temperatures.reverse();

    temperatures_array = new Array();
    for(var i = 0; i < temperatures.length; i++){
        temperatures_array.push(temperatures[i].VALUE);
    }

    console.log("Updated temperatures: " + getLastTemperature());
}

function getLastTemperature() {
	return temperatures_array[temperatures_array.length - 1];
}

function getWettness(){
    var url = ENDPOINT_WETTNESS + "?fieldId=" + 1;
    var result = httpGet(url);
    wettness = JSON.parse(result);
}

function getWettness(){
    var url = ENDPOINT_WETTNESS + "?fieldId=" + 1;
    var result = httpGet(url);
    wettness = JSON.parse(result);
}

function getBrightness(){
    var url = ENDPOINT_BRIGHTNESS + "?fieldId=" + 1;
    var result = httpGet(url);
    brightness = JSON.parse(result);
}


function getPhoto(){
    var url = ENDPOINT_PHOTO + "?fieldId=" + 1;
    var result = httpGet(url);
    photo = JSON.parse(result);
}


// Stuff
function getAllAvailablePlants() {
    var url = ENDPOINT_ALL_AVAILABLE_PLANTS;
    var result = httpGet(url);
    allAvailablePlants = JSON.parse(result);
}


function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}