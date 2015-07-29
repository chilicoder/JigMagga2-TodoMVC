/**
 * Created by developer on 10.06.15.
 */
var MaggaMediator = require('magga-mediator'),
    express = require('express'),
    app = express(),
    dummyServer;


dummyServer = new MaggaMediator({
    plugins: {
        sockjs: {
            host: 'localhost',
            port: 8080,
            path: '/mediator',
            sockjsUrl: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js'
        }
    },
    loadPlugins: ['monitoring']
});

app.use(express.static(__dirname + '/../client'));
app.listen(3000);
console.log('Client is listening on port 3000');

// Setting some dummy data channel for demo and debug needs
setInterval(function () {
    var msg = 'Dummy message :'.concat(new Date(), ' ,', Math.random());
    dummyServer.publish('dummyChannel', msg);
}, 30000);