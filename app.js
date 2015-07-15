var Framework = require('./Framework');

var app = new Framework();

/*app.get('/',function(req,res){
	console.log(res);
})*/

app.get('/',{
	response: "Hello ~~"
});

app.post('/OK',{
	response: "POST"
})

app.listen(80,'localhost');

//get file 
//http://localhost/test/mp4

