var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();

const key = fs.readFileSync('./privatekey.key');
const cert = fs.readFileSync('./certificate.crt');

const server = https.createServer({key: key, cert: cert }, app);

app.use(express.static('pages'))

app.get('/', function(req, res) {
    res.sendFile('C:\\Users\\omarw\\OneDrive\\Documents\\Programming\\Blockchain Identity\\pages\\index.html', undefined);
});

app.get('/home', function(req, res) {
    res.sendFile('C:\\Users\\omarw\\OneDrive\\Documents\\Programming\\Blockchain Identity\\pages\\home.html', undefined);
});

server.listen(3000, function() {
    console.log("Listening at port 3000");
})