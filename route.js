//front end = vue, server = node + middleware = express, database = mongoDB

const express = require ('express');

//Calls express function to start new express application
const app = express()

app.get('/olivia', (req, res) => {
    res.send("Welcome to Olivies Express route")

})

app.use((req,res) => {
    res.status(404).send('Page not found!, enter in route')
})

app.listen(3000)