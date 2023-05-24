const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
let server = require( 'http' ).Server( app );
app.use('/images', express.static(__dirname + '/images'));
app.use('/icons', express.static(__dirname + '/icons'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/javascript', express.static(__dirname + '/javascript'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/pages', express.static(__dirname + '/pages'));
//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

var port = process.env.PORT || 3000;
server.listen(port)  
console.log('Server listening on port: ' + port);