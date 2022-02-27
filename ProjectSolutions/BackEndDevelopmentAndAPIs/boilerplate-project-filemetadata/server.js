const express = require('express');
const fs = require('fs');
const multer = require('multer')
const upload = multer({ dest: 'upfile/' })
const cors = require('cors');
require('dotenv').config()
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });

  // let's delete any file we upload afterwards, no need to keep them around
  fs.unlink("upfile/" + req.file.filename, (err) => {
    if (err) {
      console.log({ error: err });
    }
    console.log("Uploaded file deleted successfully");
  })
});