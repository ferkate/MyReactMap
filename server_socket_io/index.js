var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var random = require("random-js")();
var cities = require('./cities.js');

function generatePoints() {
    var pointsList = [];
    for (var i = 0; i < 1000; i++)
    {
        var index = random.integer(0,cities.length);
        pointsList.push(cities[index]);
    }
    return pointsList;
}


var point = {
    lat: random.integer(1, 100),//28.59,
    lng: random.integer(1, 100), //78.06,
    text: 'new point'
}

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    //отправляем точки каждые 6 сек
    var timerId = setInterval(function () {

        socket.emit('pointList',generatePoints());
    },6000);
    //останавливаем таймер через 61 сек
    setTimeout(function () {
        clearInterval(timerId);
    }, 61000);

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});