var API_ENDPOINT = "http://asdf.com/";
var ENDPOINT_FIELDS = API_ENDPOINT + "fields/";
var ENDPOINT_FIELD = API_ENDPOINT + "field/";

function getFields() {
	var url = ENDPOINT_FIELDS;
	var result = httpGet(url);

	// parse response json
	// do something with result
}

function getField(fieldId) {
	var url = ENDPOINT_FIELD + fieldId + "/";
	var result = httpGet(url);

	// parse response json
	// do something with result
}

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}