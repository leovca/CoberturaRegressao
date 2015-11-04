// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    //var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    
    var http = require('http').Server(app);
	var io = require('socket.io')(http);
    
    
	var adb = require('adbkit')

    // configuration =================

    //mongoose.connect('mongodb://localhost/teste1');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    
    
/*    // define model =================
    var Todo = mongoose.model('Todo', {
        text : String
    });
    
    
    
    app.get('/api/devices',function(req,res){
    	var client = adb.createClient()
    	
    	var shell = require('shelljs');
 
		client.listDevices().then(function(devices) {
    		
    		
    		res.json(shell.exec("cd /home/leonan/PlatformAutomation/repo-main/tests/common-baseline/UI-automation/automation-scripts/ && ./runPlan.sh testando").output)
    		
    	})
    })*/
    
    
   /* app.get('api/runTestCase',function(req,res){

		var client = adb.createClient()
 
		client.listDevices().then(function(devices) {
    		
    	})
    })*/
    
    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    /*app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
    
    
    */
   
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    
    io.on('connection', function(socket){
	  	console.log('a user connected');
	  	socket.on('disconnect', function(){
    		console.log('user disconnected');
  		});
  		
  		socket.on('test', function(data){
  			console.log(data)



  			/*var spawn = require('child_process').exec;
    		var child = spawn("python ../run.py %s %s %s %s" %(data.appMainClass, data.repoDir, data.commitBase, data.commitAlterado))

            console.log("XXX")

            */

            var spawn = require('child_process').exec,
            run = spawn("python ../run.py "+data.appMainClass+" "+data.repoDir+" "+data.commitBase+" "+data.commitAlterado);

			run.stdout.on('data',
	    		function (data) {
	        		io.emit('data', {coverage:data});
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

    // listen (start app with node server.js) ======================================
    //app.listen(8080);
    //console.log("App listening on port 8080");