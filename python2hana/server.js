var express = require("express");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var client = require('./client');

var app = express();
var port = process.env.PORT || 5005;

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());
app.use(methodOverride());

client.connect(function (err) {
  if (err) {
    return console.error('Connect error', err);
  }
});

app.get('/', function (req, res) {
  var query = req.query.query || "";

  console.log(query);

  function queryDB(query) {
    client.exec(query, function (err, rows) {
      if (err) {
        console.error('Execute error:', err);
        res.status(400).send(err);
      } else {
        res.send(rows);
      }
    });
  }

  queryDB(query);
});

app.get('*', function(req, res){
  res.status(404).send('Please use the "/" route and pass a SQL query using the "query" parameter.');
});

var server = app.listen(port, function() {
  console.log('App started on http://%s:%d/', server.address().address, server.address().port);
});
