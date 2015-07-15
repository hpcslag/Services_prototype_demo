
var routerTreeGET = {
	"/do":true
}
var routerTreePOST = {
	"/do":true
}

var request = {};
var response = {};

function get(url,cb){
	routerTreeGET[url.toString()] = true;
	cb(request,response);
}

function post(url,cb){
	routerTreePOST[url.toString()] = true;
	cb(request,response);
}

function router(url,method,req,res,cb){
	if(method == "GET"){
		console.log(routerTreeGET[url])
		if(!!routerTreeGET[url]){
			cb(false);
			//do get
		}else{
			cb(true,null);
		}
	}else if(method == "POST"){
		if(!!routerTreePOST[url]){
			cb(false);
			//do post
		}else{
			cb(true,null);
		}
	}else{
		cb(true,null);
	}
}

module.exports = {
	get:get,
	post:post,
	router:router,
	push:push
}