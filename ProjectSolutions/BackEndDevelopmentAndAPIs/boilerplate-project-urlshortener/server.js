require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const bodyParser = require('body-parser');
const urlParser = require('url');
const crypto = require('crypto');
const dns = require('dns');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// ============================================
// FCC boilerplate ends here
// ============================================

const urlSchema = new Schema({
  original_url: { type: String, required: true },
  short_url: { type: String, required: true }
});

const UrlModel = mongoose.model("shorturls", urlSchema);

app.post("/api/shorturl/", (req, res) => {
  const inputUrl = req.body.url;

  //dns needs a hostname to check, so parse the input URL to get just the hostname
  const hostnameUrl = urlParser.parse(inputUrl).hostname;
  if (hostnameUrl === null) {
    return res.send({
      error: "invalid url"
    });
  }

  dns.lookup(hostnameUrl, (() => {
    // sha256 hash of url as unique identifier, hex encoded
    // we could also use the noSQL document _id as short_url unique identifier
    // or if using SQL, then SQL unique, auto increment ID field for this
    const inputUrlHash = crypto.createHash('sha256').update(inputUrl).digest('hex');

    const shortUrl = new UrlModel({
      original_url: inputUrl,
      short_url: inputUrlHash
    });

    shortUrl.save((e, data) => {
      if (!data) {
        res.json({ error: "could not save short URL" })
      } else {
        res.json({
          original_url: data.original_url,
          short_url: data.short_url
        })
      }
    })

  }));

});

app.get("/api/shorturl/:shortUrlId", (req, res) => {
  const inputId = req.params.shortUrlId;
  UrlModel.findOne({ short_url: inputId }, (e, data) => {
    if (!data) {
        res.json({ error: "short URL not found" })
      } else {
        res.redirect(data.original_url);
      }
  })

});