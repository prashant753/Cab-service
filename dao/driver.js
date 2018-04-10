const constantMessage = require("../constant").constantMessage.errorMessage.eng
module.exports = class DriverDao {
  static async emailChecksignUp(email) 
  {
      try{
     const a=  await con.query("SELECT * FROM driver WHERE email = ?",[email])

     if(a.length>0){
      throw constantMessage.emailExists
     }
     else
     return a
      } 
  catch(error){

    throw error

  }

 }
 static async globalSearch(name) 
 {
     try{
    const a =  await con.query("SELECT driver_id,firstname,gender,state,verified FROM driver WHERE firstname LIKE  ? ",["%"+name+"%"])
    return a  
  } 
 catch(error){

   throw error

 }

}
 static async emailChecksignIn(email) 
 {
     try{
    const a=  await con.query("SELECT * FROM driver WHERE email = ?",[email])
    if(a.length>0){
     return a
    }
    else
    throw constantMessage.userNotFound
     } 
 catch(error){

   throw error

 }

}
 static async updateDriver(dataToUpdate,driver_id) 
 {
     try{
    const a=  await con.query("UPDATE driver SET name = ? AND email=? AND address=? AND gender=? AND age=? AND number=? WHERE Customer_id=?",[dataToUpdate.name,dataToUpdate.address,dataToUpdate.gender,dataToUpdate.age,dataToUpdate.number,dataToUpdate.customer_id])
    console.log(a)
    if(a.length>0){
     return a
    }
    else
     throw constantMessage.userNotFound
     } 
 catch(error){
   throw error
 }

}


static async updateDriverStatus(driver_id,booking_id) 
{
    try{
   const a=  await con.query("UPDATE booking SET driver_id = ? WHERE booking_id=?",[driver_id,booking_id])
   if(a.changedRows==1){
     const b =  await con.query("UPDATE booking SET booking_status = ? WHERE booking_id=?",["CONFIRMED",booking_id])
     return b
   }
   else{
    throw constantMessage.driverAreadyAssigned
   }
  
    } 
catch(error){
  throw error
}

}
static async join(customerid,offset)
{
  try{
          const a =await con.query(" SELECT *  FROM customer INNER JOIN booking  ON customer.customer_id = booking.customer_id  INNER JOIN bookingaddress  ON booking.bookingaddress_id =bookingaddress.bookingaddress_id WHERE booking.customer_id =? GROUP BY booking_id,customer.customer_id limit 10 offset ?",[customerid,offset])
          return a;                                  
  }
  catch(error){
    throw error
  }
}
static async driverBookingJoin(driverid,offset,limit)
{
  try{
          const a =await con.query(`SELECT customer.firstname as customername,customer.customer_id,
          customer.email,customer.number,driver.firstname as drivername,driver.driver_id,driver.email
           as driveremail,driver.number as driverNumber,booking.booking_id,booking.cartype,booking.journeydate,
           booking.servicetype,booking.booking_status,bookingaddress.to,bookingaddress.from,
           bookingaddress.pickuplocation 
           FROM driver RIGHT JOIN booking  ON booking.driver_id = driver.driver_id 
           JOIN customer ON booking.customer_id = customer.customer_id JOIN bookingaddress ON
            booking.bookingaddress_id=bookingaddress.bookingaddress_id WHERE booking.driver_id = ? `,[driverid,offset,limit])
            return a;                           
  }
  catch(error){
    throw error
  }
}


 static async numberCheckOtp(number) 
 {
     try{
    const a=  await con.query("SELECT * FROM driver WHERE number = ?",[number])
    if(a.length>0){
           if(a[0].verified==0){
            const b= await con.query("UPDATE driver SET verified='1' WHERE verified='0'")
            return a
           }
           else
          throw constantMessage.userisVerified
    }
    else 
    throw constantMessage.numberNotRegistered
     } 
 catch(error){
   throw error
 }
 
}

static async getDriverDeatils(id) 
{
    try{

   const a=  await con.query("SELECT * FROM driver WHERE driver_id = ?",[id])
   if(a.length>0){
           return a
          }
          else
         throw constantMessage.userNotFound
   }
catch(error){
  throw error
}

}
static async checkBookingid(id) 
{
    try{

   const a=  await con.query("SELECT * FROM booking WHERE booking_id = ?",[id])
   if(a.length>0){
           return a
          }
          else
         throw constantMessage.bookingNotFound
   }
catch(error){
  throw error
}

}


 static async numberCheck(number) 
 {
     try{
    const a=  await con.query("SELECT * FROM driver WHERE number = ?",[number])
    if(a.length>0){
      throw constantMessage.phoneNoExists
    }
     return a;
     } 
 catch(error){
   throw error
 }
 
}

static async idCheck(id) 
{
    try{
   const a=  await con.query("SELECT * FROM driver WHERE driver_id = ?",[id])
   if(a.length>0){
     return a
   }
    else
    throw constantMessage.driverNotFound
  }
catch(error){
  throw error
}

}



 static async insertData(req) {
   try{
            const createdAt = new Date()
            const a = await con.query('INSERT INTO driver(firstname,lastname,email,number,password,state,city,licencenumber,gender,age,otp,createdat) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',[req.firstname,req.lastname,req.email,req.number,req.password,req.state,req.city,req.license,req.gender,req.age,req.otp,createdAt])

        return a   
}
   catch(error){    
     console.log(error)
  }

  }
 }