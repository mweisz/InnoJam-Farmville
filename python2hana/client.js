// Copyright 2013 SAP AG.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http: //www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific
// language governing permissions and limitations under the License.

var hdb = require('hdb');

var client = hdb.createClient({
  host     : '23.23.134.136',
  port     : 30015,
  user     : 'CODEJAMMER',
  password : 'CodeJam2014'
});

function onerror(err) {
  console.error('Network connection error', err);
}
client.on('error', onerror);

function onclose() {
  console.log('Client closed');
}
client.on('close', onclose);

function reconnect() {
	client.connect(function (err) {
		if (err) {
    	return console.error('Connect error', err);
  	}
	});
};

function onconnect() {
  console.log('Client connected');
}
client.on('connect', onconnect);

function ondisconnect() {
  console.log('Client disconnected');
}
client.on('disconnect', ondisconnect);

module.exports = client;