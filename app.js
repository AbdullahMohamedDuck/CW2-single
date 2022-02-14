
//front end = vue, server = node + middleware = express, database = mongoDB

//Calls express function to start new express application + others

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

//get all products, fetch
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