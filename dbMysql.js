const mysql = require('async-mysql');
const models = require("./lib")

 const func =async ()=>{
     try{
        global.con =await mysql.connect({
            host     : 'localhost',
            user     : 'root',
            password : 'luckkadon007',
            database : 'db_assignment'
     })
 console.log("Mysql Database Connected")
 models.admin()
     }
     catch(error){
         console.log("error occured while connecting to mysql database")
     }
}

try{
    func()
}
catch(error){
    console.log(error)
}
