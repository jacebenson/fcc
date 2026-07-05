var express = require('express');
var app = express();


var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


/**
 * Define what page loads when loading the site initially.
 */
app.use(express.static('views'));
app.get('/', function (request, response) {
  response.sendFile('index.html');
});

app.post('/', upload.single('uploadedFile'), function (request, response) {
  if (request.file) {
    //response.setHeader('Content-Type: application/json')
    response.send({
      size: request.file.size
    });

  } else {
    response.send({
      error: "It was not possible to upload the file, please try again."
    })
  }
});

app.listen(process.env.PORT || 5000);