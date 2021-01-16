  var express = require('express');
  var app = express();
  var path = require('path');

  // viewed at http://localhost:8080
  app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
  });

  // public option
  app.get('/public', function(req, res) {
      // res.sendFile(path.join(__dirname,'../public/index.html'));// works
      // res.sendFile('public/index.html',{ root: path.dirname(__dirname)});// works
      res.sendFile('index.html',{ root: path.join(__dirname,'../public/')});// works
  });

  app.get('/public/css/*', function(req, res) {
      console.log(req.path);
      res.sendFile(path.join(__dirname,`..${req.path}`));// works
  });


  app.listen(8080);
// send html files
//[express | docs](https://inspectatech.github.io/notes/?path=/docs/nodejs-express-express-notes--page)
//[Serving Static Files with Node and Express.js](https://stackabuse.com/serving-static-files-with-node-and-express-js/)

//[Serving static assets through wildcard rule](https://codereview.stackexchange.com/questions/29401/serving-static-assets-through-wildcard-rule)

// [Express.js sendfile() vs. render()](https://stackoverflow.com/questions/23875360/express-js-sendfile-vs-render)
