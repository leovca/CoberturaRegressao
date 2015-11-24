var TesteCase = 	require("../model/TestCase.js");

module.exports = function(app){

	app.get("/api/testcase",function(req,res){
        TesteCase.find(function(err,testecases){
            res.json('data',testecases)
        })
    })
    app.get("/api/testcase/:id",function(req,res){
        TesteCase.findById(req.params.id,function(err,testecase){
            res.json('data',testecase)
        })
    })
    app.post("/api/testcase",function(req,res){        
        var testeCase = new TesteCase(req.body)
        testeCase.save(function (err, userObj) {
            if (err) {
                res.json(err)
                console.log(err)
            } else {
                res.json(userObj)
            }
        })
    })
    app.post("/api/testcase/:id",function(req,res){

        delete req.body._id
        TesteCase.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, testecase) {
            if (err) {
                res.json(err)
                console.log(err)
            } else {
                res.send(testecase)
            }
        });        
    })
    app.delete("/api/testcase/:id",function(req,res){
        TesteCase.findByIdAndRemove(req.params.id, function(err,result){
            res.json('data',result)
        })
    })

}