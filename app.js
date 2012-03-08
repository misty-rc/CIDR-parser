var express = require('express'),
    routes = require('./routes'),
    RedisStore = require('connect-redis')(express);

var Generate = require('./lib/Generate');

var Client = require('./Schema').Client;
var Ticket = require('./Schema').Ticket;

// test
//var c_ins = new Client();
//c_ins.ip = '192.168.10.11';
//c_ins.save(function(err) {
//  if(err) console.log(err);
//});

// test
//var t_ins = new Ticket();
//t_ins.title = 'hogehoge title';
//t_ins.description = 'this is desc for ticket';
//t_ins.save(function(err) {
//  if(err) console.log(err);
//});

var fs = require('fs');
var iplist = fs.readFileSync('./ip.txt', 'utf-8').split('\n');

for (var i in iplist) {
  Generate.parse(iplist[i]).getlist(function(err, data) {
    console.log(data);
  });
}


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'your secret here',
    store: new RedisStore()
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
