var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require("url"),
    mime = require('mime'),
    maps = require('./maps.js');


function getResponse(relpath,dirindex,cb){
    fs.stat(relpath,function(err,stats){
    	if(err){
    		cb(true,relpath);
    	}else{
    		if(stats.isDirectory()){
    			var i = 0;
    				tmp = path.join(relpath,dirindex[i]);
    			fs.readFile(tmp,function query(err,data){
    				i++;
    				if(err){
    					if(ic < dirindex.length){
    						fs.readFile(tmp,query);
    					}else{
    						cb(true,tmp);
    					}
    				}else{
    					var res = {"type":mime.lookup(tmp),"data":data};
    					cb(false,tmp,res);
    				}
    			});
    		}else{
    			fs.readFile(relpath, function(err, data) {  
                    if(err) {  
                        cb(true);
                    } else {  
                        var resdata = {"type": mime.lookup(relpath), data: data};  
                        cb(false, relpath, resdata); 
                    }  
                });  
    		}
    	}
    });
}

function Server(port,ip){
	http.createServer(function(req,res){
		var urls = url.parse(req.url);
    	var relpath = path.join(__dirname,'../assets', urls.pathname);
    	var method = req.method;

    	//優先檢查 request url
    	maps.router(urls.pathname,method,function(err,mapdata){
    		if(err){
    			getResponse(relpath,['index.html','index.htm'],function(err,p,data){
		    		if(err){
		    			res.writeHead(404,{'Content-Type':'text/html'});
		                res.end("<h1>404 Error! File Not Found! </h1>");
		    		}else{
		    			res.writeHead(200,{'Content-Type':data.type,'Content-Length':data.data.length});
		                res.end(data.data);
		    		}
		    	});
    		}else{
    			res.writeHead(200,{'Content-Type':mapdata.type,'Content-Length':mapdata.data.length});
		        res.end(mapdata.data);
    		}
    	});
	}).listen(port,ip);
}

module.exports = Server;