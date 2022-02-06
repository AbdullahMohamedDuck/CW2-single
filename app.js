
//front end = vue, server = node + middleware = express, database = mongoDB

const express = require ('express');

//Calls express function to start new express application
const app = express()

//multiple middlewares with 'next' middleware function for next middleware
app.use(function(request, response, next) {
    console.log('Income request for' + request.url)
    next()
})
// Requires the modules needed, file system, creates path users request
var path = require("path");
var fs = require("fs");

//app.use = middleware, app.get = routing. Middleware last 
app.use(function(req, res, next) {
// Uses path.join to find the path where the file should be
var filePath = path.join(__dirname, "images", req.url);
// Built-in fs.stat gets info about a file
fs.stat(filePath, function(err, fileInfo) {
if (err) {
next();
return;
}
//check if file exists
if (fileInfo.isFile()) res.sendFile(filePath);
else next();
    });
});

// error middleware
app.use(function(req, res) {
    // Sets the status code to 404
    res.status(404);
    // Sends the error "File not found!”
    res.send("page not found!");
    });

//starts the app on port 3000
app.listen(3000, function(){

    console.log('Express server has started.')

})