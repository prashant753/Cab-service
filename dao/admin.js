const constantMessage = require("../constant").constantMessage.errorMessage.eng
module.exports = class AdminDao {
    static async emailCheck(email) 
    {
        try{
       const a=  await con.query("SELECT * FROM admin WHERE email = ?",[email])
  
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
   static async getDriver(limit,offset) 
   {
       try{   
      const driverDetails=  await con.query("SELECT * FROM driver limit ? offset ?",[limit,offset])
      if(driverDetails.length>0){
       return driverDetails
      }
      else
       throw constantMessage.userNotFound
       } 
   catch(error){
     throw error
   }
  }


  static async getCustomer(offset,limit) 
  {
      try{   
     const customerDetails=  await con.query("SELECT * FROM customer limit ? offset ?",[limit,offset])
     if(customerDetails.length>0){
      return customerDetails
     }
     else
      throw constantMessage.userNotFound
      } 
  catch(error){
    throw error
  }
 }

   static async join(limit,offset)
{
  try{
          const a =await con.query(`SELECT customer.firstname as customername,customer.customer_id,
          customer.email,customer.number,driver.firstname as drivername,driver.driver_id,driver.email
           as driveremail,driver.number as driverNumber,booking.booking_id,booking.cartype,booking.journeydate,
           booking.servicetype,booking.booking_status,bookingaddress.to,bookingaddress.from,
           bookingaddress.pickuplocation 
           FROM driver RIGHT JOIN booking  ON booking.driver_id = driver.driver_id 
           JOIN customer ON booking.customer_id = customer.customer_id JOIN bookingaddress ON
            booking.bookingaddress_id=bookingaddress.bookingaddress_id  limit ? offset ?`,[limit,offset])
          return a;                                  
  }
  catch(error){
  
    throw error
  }
}
static async globalSearch(name)
{
  try{
          const a =await con.query(`SELECT customer.firstname as customername,customer.customer_id,
          customer.email,customer.number,driver.firstname as drivername,driver.driver_id,driver.email
           as driveremail,driver.number as driverNumber,booking.booking_id,booking.cartype,booking.journeydate,
           booking.servicetype,booking.booking_status,bookingaddress.to,bookingaddress.from,
           bookingaddress.pickuplocation 
           FROM driver RIGHT JOIN booking  ON booking.driver_id = driver.driver_id 
           JOIN customer ON booking.customer_id = customer.customer_id JOIN bookingaddress ON
            booking.bookingaddress_id=bookingaddress.bookingaddress_id WHERE customer.firstname LIKE ? OR driver.firstname LIKE ? `,["%"+name+"%","%"+name+"%"])
          return a;                                  
  }
  catch(error){
  
    throw error
  }
}


static async driverbookingJoin(booking_id)
{
  try{
          const a =await con.query(`SELECT customer.firstname as customername,customer.customer_id,
          customer.email,customer.number,driver.firstname as drivername,driver.driver_id,driver.email
           as driveremail,driver.number as driverNumber,booking.booking_id,booking.cartype,booking.journeydate,
           booking.servicetype,booking.booking_status,bookingaddress.to,bookingaddress.from,
           bookingaddress.pickuplocation 
           FROM driver RIGHT JOIN booking  ON booking.driver_id = driver.driver_id 
           JOIN customer ON booking.customer_id = customer.customer_id JOIN bookingaddress ON
            booking.bookingaddress_id=bookingaddress.bookingaddress_id WHERE booking.booking_id = ? `,[booking_id])
          
          return a;                                  
  }
  catch(error){
  
    throw error
  }
}


static async joinBooking(driverid,offset,limit)
{
  try{
          const a =await con.query(`SELECT customer.firstname as customername,customer.customer_id,
          customer.email as customeremail,customer.number as customernumber,driver.firstname as drivername,driver.driver_id,driver.email
           as driveremail,driver.number as driverNumber,booking.booking_id,
          bookingaddress.bookingaddress_id,booking.cartype,booking.journeydate,
          booking.servicetype,booking.booking_status,bookingaddress.to,bookingaddress.from,
          bookingaddress.pickuplocation  
           FROM driver RIGHT JOIN booking  ON booking.driver_id = driver.driver_id 
           JOIN customer ON booking.customer_id = customer.customer_id JOIN bookingaddress ON
            booking.bookingaddress_id=bookingaddress.bookingaddress_id  WHERE booking.driver_id = ? limit ? offset ?;`,[driverid,limit,offset])
            return a;                                  
  }
  catch(error){
  
    throw error
  }
}
static async joinCustomerBooking(customerid,offset,limit)
{
  try{
          const a =await con.query("SELECT * FROM booking INNER JOIN bookingaddress  ON booking.bookingaddress_id = bookingaddress.bookingaddress_id WHERE customer_id = ? limit ? offset ?",[customerid,limit,offset])
          return a;                                  
  }
  catch(error){
  
    throw error
  }
}




}