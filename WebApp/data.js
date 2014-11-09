var API_ENDPOINT = "http://lekotsch.net:5000/innojam/";

//Fields
var ENDPOINT_FIELDS = API_ENDPOINT + "fields";
var ENDPOINT_FIELD = API_ENDPOINT + "field";
var ENDPOINT_PLANT_IN_FIELD = API_ENDPOINT + "plantInField";

//Actions 
var ENDPOINT_WATER_FIELD = API_ENDPOINT + "waterField";
var ENDPOINT_LIGHTS_ON = API_ENDPOINT + "turnLightsOn";
var ENDPOINT_LIGHTS_OFF = API_ENDPOINT + "turnLightsOff";
var ENDPOINT_FERTILIZE_FIELD = API_ENDPOINT + "fertilizeField";
var ENDPOINT_HARVEST_FIELD = API_ENDPOINT + "harvestField";

// Sensor Data
var ENDPOINT_TEMPERATURE = API_ENDPOINT + "temperature";
var ENDPOINT_WETTNESS = API_ENDPOINT + "wettness";
var ENDPOINT_BRIGHTNESS = API_ENDPOINT + "brightness";
var ENDPOINT_PHOTO = API_ENDPOINT + "photo";

// Stuff
var ENDPOINT_ALL_AVAILABLE_PLANTS = API_ENDPOINT + "allAvailablePlants";

var DEFAULT_FIELD_ID = 1;

var allFields;
var field;
var plantInField;

var temperature;
var temperature_array;
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
function waterField(fieldId){
    var url = ENDPOINT_WATER_FIELD;
    httpGet(url);
}

function turnLightsOn(fieldId){
    var url = ENDPOINT_LIGHTS_ON;
    httpGet(url);

}

function turnLightsOff(fieldId){
    var url = ENDPOINT_LIGHTS_OFF;
    httpGet(url);

}

function fertilizeField(fieldId){
    var url = ENDPOINT_FERTILIZE_FIELD;
    httpGet(url);
}

function harvestField(fieldId){
    var url = ENDPOINT_HARVEST_FIELD;
    httpGet(url);
}


// Sensor Data
function getTemperature(fieldId) {
    var url = ENDPOINT_TEMPERATURE + "?fieldId=" + fieldId;
    var result = httpGet(url);
    temperature = JSON.parse(result);



    for(var i = 0; i < temperature.length(); i++){
        temperature_array.add(temperature[i].value);
    }

}


function getWettness(fieldId){
    var url = ENDPOINT_WETTNESS + "?fieldId=" + fieldId;
    var result = httpGet(url);
    wettness = JSON.parse(result);
}

function getBrightness(fieldId){
    var url = ENDPOINT_BRIGHTNESS + "?fieldId=" + fieldId;
    var result = httpGet(url);
    brightness = JSON.parse(result);
}


function getPhoto(fieldId){
    var url = ENDPOINT_PHOTO + "?fieldId=" + fieldId;
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