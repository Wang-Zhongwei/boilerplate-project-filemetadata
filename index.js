var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer'); // used to handle file uploads
var upload = multer().single('upfile'); // middleware for handling multipart/form-data

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload, function(req, res) {
  if (req.file) {
    const {originalname: name, mimetype: type, size} = req.file;
    res.json({name, type, size});
  } else {
    res.json({
      error: "No file uploaded"
    })
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
