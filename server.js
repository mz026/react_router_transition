var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var port = 3000;

// Serve up public/ftp folder
var serve = serveStatic('.', {'index': ['index.html']})

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
})

// Listen
console.log('server listens to port: ' + port);
server.listen(port)
