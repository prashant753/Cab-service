
//External Dependencies


const Hapi = require('hapi');
const Plugins = require("./plugins")


//Internal Dependencies
const router=require('./routes');
const dbMongo=require('./dbMongo');
const dbMysql=require('./dbMysql');

const server = new Hapi.Server();

//server created


server.connection({
     port: 5304,
     host: 'localhost' 
    })


//Register All Plugins


    server.register(Plugins, function (err) {
        if (err){
            console.log(err)
            server.error('Error in loading plugins : ' + err)
        }else {
            server.log('Plugins Loaded')
        }
    })
const ser = async () => {
    await server.start();
    console.log(`Server started at: ${server.info.uri}`);
};

ser();



server.route(router)