var MongoClient = require('mongodb').MongoClient;
const url="mongodb://localhost:27017/";
const model = require('./models/mongo')



MongoClient.connect(url,(err, res)=>{
     if(err)
     console.log("database didn't started"+err);
     else
      console.log("MONGO database connected .... ");
     
     global.db=res.db("Booking");
     model()
    //  model.job.job()
    //  model.user.users()
    //  model.jobAddress.jobAddress()
})

