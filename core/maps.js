
var routerTreeGET = {
	"/do":{
		'Content-Type':'text/html',
		'Data':new Buffer('\u0012'),
		'Method':"GET"
	}
}
var routerTreePOST = {
	"/do":{
		'Content-Type':'text/html',
		'Data':new Buffer('\u0012'),
		'Method':"GET"
	}
}

function get(url,object){
	routerTreeGET[url.toString()] = {
		'Content-Type':'text/html',
		'Data':object.response,
		'Method':'GET'
	}
}

function post(url,object){
	routerTreePOST[url.toString()] = {
		'Content-Type':'text/html',
		'Data':object.response,
		'Method':'POST'
	}
}

function router(url,method,cb){
	if(method == "GET"){
		if(!!routerTreeGET[url]){
			cb(false,{'type':routerTreeGET[url]['Content-Type'],'data':routerTreeGET[url].Data});
		}else{
			cb(true,null);
		}
	}else if(method == "POST"){
		if(!!routerTreePOST[url]){
			cb(false,{'type':routerTreePOST[url]['Content-Type'],'data':routerTreePOST[url].Data});
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
	router:router
}