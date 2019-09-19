const express = require('express');
const path = require('path');

const app = express();

const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb+srv://georg:Asdfghjk1.@restaurantfinderhtwberlin-fgci3.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.log(err)
    db = client.db('restaurants')
})

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'newapp/build')));

//Category Api
app.get('/api/getCategories', (req,res) => {
    db.collection('categories').find().toArray(function(err, results){
        console.log(results);
        res.send(results);
    })
    console.log('Sent list of items');
});
// Restaurant Api
app.get('/api/getList', (req,res) => {
    db.collection('restaurant_collection').find().toArray(function(err, results){
        console.log(results);
        res.send(results);
    })
    console.log('Sent list of items');
});




// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/newapp/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log('App is listening on port ' + port);