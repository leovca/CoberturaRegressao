// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    
    var http = require('http').Server(app);
	var io = require('socket.io')(http);
    
    
	var adb = require('adbkit')



    // configuration =================


    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
   
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


    app.post("/api/getCommits",function(req,res){
         var spawn = require('child_process').exec,
        run = spawn("python ../GitOptions.py "+req.body.repoDir);

		run.stdout.on('data',
	    		function (data) {
	    		    console.log(data)
	        		res.json('data', JSON.parse(data));
	    		}
    		)

        run.stderr.on('data', function (data) {
              console.log('stderr: ' + data);
            });

    })
    
    
    io.on('connection', function(socket){
	  	console.log('a user connected');
	  	socket.on('disconnect', function(){
    		console.log('user disconnected');
  		});
  		
  		socket.on('test', function(data){

            var spawn = require('child_process').exec,
            run = spawn("python ../run.py "+data.appMainClass+" "+data.repoDir+" "+data.commitBase+" "+data.commitAlterado);


            var resposta = ""

            run.on("exit",function(){
                io.emit('data', resposta);
            })

			run.stdout.on('data',
	    		function (data) {
	        		resposta = resposta+data
	    		}
    		)

            run.stderr.on('data', function (data) {
              console.log('stderr: ' + data);
            });
  			
  		})

});
    

http.listen(8080, function(){
  console.log('listening on *:8080');
});
