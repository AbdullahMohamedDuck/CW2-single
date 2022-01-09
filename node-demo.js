
var http = require('http')

function requestHandler(request, response){

console.log('Incoming request from' + request.url)
response.end('hello from the node.js server.')

}

var server = http.createServer(requestHandler)
server.listen(3000)