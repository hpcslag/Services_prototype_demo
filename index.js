function application(){
	
}

var router = require('./core/maps.js');
application.prototype.get = function(url,object){
	router.get(url,object);
}

application.prototype.post = function(url,object){
	router.post(url,object);
}

application.prototype.listen = function(ip,port){
	var server = require('./core/server.js')(ip,port);
}

module.exports = application;