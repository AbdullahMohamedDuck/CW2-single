
//front end = vue, server = node + middleware = express, database = mongoDB

//Calls express function to start new express application 

const express = require ('express');
const cors = require('cors');
const app = express()
app.use(cors())
app.use(express.json())

const mongoClient = require('mongodb').MongoClient

//connect to mongoDB
let db
mongoClient.connect('mongodb+srv://abdullah96:Narutoftw1@cluster0.uznfq.mongodb.net/webstore?retryWrites=true&w=majority', function(err,client){
    db = client.db('webstore')
})

//identify collection name for any requests (gets all collections from MongoDB)
app.param('collectionName', function(req,res,next,collectionName){
    req.collection = db.collection(collectionName)
    return next()
})

//root url REST API route (specify what collection/what the user wants, main directory)
app.get('/',function(req,res){
    res.send('Specify a collection please, E.G: collection/products to view lessons')
})

// Requires the modules needed, file system, creates path users request - app.use = middleware, app.get = routing. Middleware last
var path = require("path");
var fs = require("fs");

 
app.use(function(req, res, next) {
    // Uses path.join to find the path where the file should be. 
    var filePath = path.join(__dirname, "/staticimages", req.url);
    
    // Built-in fs.stat gets info about a file to check if file exists, if not move onto next
    fs.stat(filePath, function(error, fileInfo) {
    if (error) {
    next();
    return;
    }
    if (fileInfo.isFile()) res.sendFile(filePath);
    else next();
        });
    });

//get all products
app.get('/collection/:collectionName', function (req, res, next) {
    req.collection.find({}).toArray(function(error, results){
    if (error) {
    return next(error)
    }
    else{
    res.send(results)
     }
 })
})


//Post order request - insert   
app.post('/collection/:collectionName', function (req, res, next) {
    req.collection.insert(req.body,function (error, results){
    if (error) {
    return next(error)
    }
    else{
    res.send(results)
     }
 })
})

//Get specific ID of product from MongoDb
const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id' , function (req, res, next) {
req.collection.findOne({ _id: new ObjectID(req.params.id) }, function (error, results) {
if (error) {
    return next(error)
    }
    else {res.send(results)
    }
})
})

// Update ID
app.put('/collection/:collectionName/:id', function (req, res, next) {
    req.collection.updateOne(
    {_id: new ObjectID(req.params.id)},
    {$set: req.body},
    {safe: true, multi: false}, function (error, results) {
    if (error){ 
        return next(error)
    }
    else {res.send(results)
    }
    })
})


// error handler middleware
app.use(function(req, res) {
    // Sets the status code to 404
    res.status(404);
    // Sends the error "File not found!”
    res.send("Page has not been found!, please enter a valid input");
    });

//starts the app on port 3000
app.listen(3000, function(){

    console.log('Express server has started.')

})