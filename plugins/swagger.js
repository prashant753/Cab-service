'use strict';

let nodeEnv = "Local"
if(process.env.NODE_ENV != undefined){

    nodeEnv = process.env.NODE_ENV

}

//Register Swagger
// const pack = require('../package'),
//     swaggerOptions = {
//         //  basePath : '/api/v1',
//         pathPrefixSize: 2,
//         info : {
//             title: 'Assignment ('+ nodeEnv +')',
//             version : pack.version
//         }

//     };
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

exports.register = function(server, options){

    server.register([
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            // 'options': swaggerOptions
        }], (err) => {
        if (err){
       console.log(err)
        }
    });
};

exports.register.attributes = {
    name: 'swagger-plugin'
};