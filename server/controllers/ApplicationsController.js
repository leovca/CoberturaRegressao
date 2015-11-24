var Application = 	require("../model/Application.js");

module.exports = function(app){

	app.get("/api/application",function(req,res){
        Application.find(function(err,applications){
            res.json('data',applications)
        })
    })
    app.get("/api/application/:id",function(req,res){
        Application.findById(req.params.id,function(err,applications){
            res.json('data',applications)
        })
    })
    app.post("/api/application",function(req,res){        
        var newApp = new Application(req.body)
        newApp.save(function (err, userObj) {
            if (err) {
                res.json(err)
                console.log(err)
            } else {
                res.json(userObj)
            }
        })
    })
    app.post("/api/application/:id",function(req,res){

        delete req.body._id
        Application.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, app) {
            if (err) {
                res.json(err)
                console.log(err)
            } else {
                res.send(app)
            }
        });        
    })
    app.delete("/api/application/:id",function(req,res){
        Application.findByIdAndRemove(req.params.id, function(err,result){
            res.json('data',result)
        })
    })


   

    //var Application = mongoose.model('Application', {name: String, appMainClass: String, repoDir: String});

   /*var x = new Application({name:"Aplicação Teste",appMainClass:"android.cin.ufpe.br.aplicacaoteste/android.cin.ufpe.br.aplicacaoteste.AtivityTeste",repoDir:"~/Desktop/Monografia/AplicacaoTeste"})
   x.save(function (err, userObj) {
     if (err) {
       console.log(err);
     } else {
       console.log('saved successfully:', userObj);
     }
   });*/

}