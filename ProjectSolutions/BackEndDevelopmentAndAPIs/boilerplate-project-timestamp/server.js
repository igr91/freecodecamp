// server.js
// where your node app starts

// init project
var express = require('express');
var dayjs = require('dayjs');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


// ============================================
// FCC boilerplate ends here
// ============================================

// no parameters -> current time as required
app.get("/api/", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

//one input parameter
app.get("/api/:date", (req, res) => {

  //check input for string/number as NaN, initialize date with input. 
  //if it's a string, then it'll get parsed (or not)
  const input = req.params.date;
  const numberTest = isNaN(input / 2);
  let date = new Date(input);

  //NaN is falsy, so if the input is a number, this needs to be true
  //then we set our time as per the input number
  if (!numberTest) {
    date.setTime(input);
  }

  //if parsing failed, then we have an invalid date
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });

});
