module.exports = {

        url : "mongodb://admin:admin@ds057934.mongolab.com:57934/changecoverage",

        options: {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
        }

};

//mongodb://<dbuser>:<dbpassword>@ds057934.mongolab.com:57934/changecoverage
//mongodb://user:pass@host:port/db

//url : 'mongodb://localhost:27017/changeCoverage'