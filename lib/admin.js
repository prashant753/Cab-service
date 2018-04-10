const bcrypt = require("../lib/bcrypt")
module.exports= async ()=>{
    try{

    
        const name ="prashant"
        const email = "prashantadhikari@gmail.com"
        const number = "+91 7895131381"
        let password = "abcdefg"
        const hash =await bcrypt.encryptPassword(password)
        password = hash
        
        const name1 ="prashant1"
        const email1 = "prashantadhikari1@gmail.com"
        const number1 = "+91 7017780843"
        let password1 = "abcdefg"
        const hash1 =await bcrypt.encryptPassword(password)
        password1 = hash
        
         const createdAt = new Date();
       con.query(`INSERT INTO admin (name,email,password,number,createdAt)
            SELECT * FROM (SELECT ?,?,?,?,?) AS tmp
            WHERE NOT EXISTS (SELECT name FROM admin WHERE name = ?);`,[name,email,password,number,createdAt,name])
      con.query(`INSERT INTO admin (name,email,password,number,createdAt)
            SELECT * FROM (SELECT ?,?,?,?,?) AS tmp
            WHERE NOT EXISTS (SELECT name FROM admin WHERE name = ?);`,[name1,email1,password1,number1,createdAt,name1])
                      }
                      catch(error){

                                    throw error

                      }
        
}

