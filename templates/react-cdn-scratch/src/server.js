  var express = require('express');
  var app = express();
  var path = require('path');

  const publicDirectoryPath = path.join(__dirname,"../public");
  app.use(express.static(publicDirectoryPath));

  app.listen(8080);
