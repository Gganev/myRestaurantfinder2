// // const express = require('express');
// // const path = require('path');
// // const cors = require("cors");

// // const app = express();

// // const MongoClient = require('mongodb').MongoClient
const url = require('url')
const MongoClient = require('mongodb').MongoClient

let cachedDb = null

async function connectToDatabase(uri) {
    if (cachedDb) {
        return cachedDb
      }

const client = await MongoClient.connect(uri, { useNewUrlParser: true })

const db = await client.db('restaurants')

cachedDb = db
  return db
}

module.exports = async (req, res) => {

    const db = await connectToDatabase('mongodb+srv://georg:Asdfghjk1.@restaurantfinderhtwberlin-fgci3.mongodb.net/test?retryWrites=true&w=majority')

    const collection = await db.collection('restaurant_collection')

    const restaurants = await collection.find().toArray()

    res.status(200).json(restaurants )
}
// // var db;
// //
// const origin = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://newapp.gganev.now.sh/'

// // MongoClient.connect('mongodb+srv://georg:Asdfghjk1.@restaurantfinderhtwberlin-fgci3.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
// //     if (err) return console.log(err)
// //     db = client.db('restaurants')
// // })

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, 'newapp/build')));
// app.use(cors({ origin }));

//Category Api
// app.get('/api/getCategories', (req,res) => {
//     db.collection('categories').find().toArray(function(err, results){
//         console.log(results);
//         res.send(results);
//     })
//     console.log('Sent list of items');
// });
// Restaurant Api
// // app.get('/', (req,res) => {
// //     db.collection('restaurant_collection').find().toArray(function(err, results){
// //         console.log(results);
// //         res.send(results);
// //     })
// //     console.log('Sent list of items');
// // });




// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/newapp/build/index.html'));
// });

// // const port = 3001;
// // app.listen(port);

// // console.log('App is listening on port ' + port);