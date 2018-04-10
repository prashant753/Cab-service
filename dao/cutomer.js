const constantMessage = require("../constant").constantMessage.errorMessage.eng
module.exports = class CustomerDao {
  static async emailCheck(email) 
  {
      try{
     const a=  await con.query("SELECT * FROM customer WHERE email = ?",[email])
     //console.log(a[0].email)
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
    const a=  await con.query("SELECT firstname,customer_id,email,number,verified,state,city FROM customer WHERE firstname LIKE  ? ",["%"+name+"%"])

    return a
     } 
 catch(error){
   throw error
 }
}



static async join(customerid,offset,limit)
{
  try{
          const a =await con.query(`SELECT * FROM customer INNER JOIN booking  ON 
          customer.customer_id = booking.customer_id  INNER JOIN bookingaddress  ON
           booking.bookingaddress_id =bookingaddress.bookingaddress_id WHERE booking.customer_id =? GROUP BY 
           booking_id,customer.customer_id limit ? offset ?`,[customerid,limit,offset])
          if(a.length>0){
            return a;       
           }
                  else 
                throw  constantMessage.customerNotBooked                
  }
  catch(error){
    throw error
  }
}

 static async emailCheckSignIn(email) 
 {
     try{
    const a=  await con.query("SELECT * FROM customer WHERE email = ?",[email])

    if(a.length>0){
      if(a[0].verified=="1"){
        return a
      }
      else
     throw constantMessage.userisNotVerified
    }
    else{
      throw constantMessage.userNotFound
    }
 
     } 
 catch(error){
   throw error
 }

}
static async verified() 
{
    try{
   const a=  await con.query("SELECT * FROM customer WHERE verified = ?",["1"])
   if(a.length>0){
    return a
   }
   else{
     throw constantMessage.userisNotVerified
   }

    } 
catch(error){
  throw error
}

}
static async adminSignIn(email) 
{
    try{
   const a=  await con.query("SELECT * FROM admin WHERE email = ?",[email])
   if(a.length>0){
    return a
   }
   else{
     throw constantMessage.userNotFound
   }

    } 
catch(error){
  throw error
}

}
 static async updateCustomer(dataToUpdate,customer_id) 
 {
     try{
    const a=  await con.query("UPDATE customer SET name = ? AND email=? AND address=? AND gender=? AND age=? AND number=? WHERE Customer_id=?",[dataToUpdate.name,dataToUpdate.address,dataToUpdate.gender,dataToUpdate.age,dataToUpdate.number,dataToUpdate.customer_id])
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

static async cancelBooking(customer_id,booking_id) 
{
    try{
   const a=  await con.query("UPDATE booking SET booking_status = ?  WHERE customer_id=?  AND booking_id = ?",["CANCELED",customer_id,booking_id])
   if(a.length>0){
    return a
   }
   else
    throw constantMessage.alreadyCancelled
    } 
catch(error){
  throw error
}

}


 static async idCheck(email) 
 {
     try{

    const a=  await con.query("SELECT * FROM customer WHERE email = ?",[email])
    if(a.length>0){
           if(a[0].verified==0){
            const b= await con.query("UPDATE customer SET verified='1' WHERE verified='0'")
            return a
           }
           else
          throw constantMessage.userisVerified
    }
    else 
    throw constantMessage.userNotFound 
     } 
 catch(error){
   throw error
 }
 
}

static async idChecknumber(number) 
{
    try{
      
   const a=  await con.query("SELECT * FROM customer WHERE number = ?",[number])
   if(a.length>0){
          if(a[0].verified==0){
           const b= await con.query("UPDATE customer SET verified='1' WHERE verified='0'")
           return a
          }
          else
         throw constantMessage.userisVerified
   }
   else 
   throw constantMessage.userNotFound 
    } 
catch(error){
  throw error
}

}


static async getCustomerDeatils(id) 
{
    try{

   const a=  await con.query("SELECT * FROM customer WHERE customer_id = ?",[id])
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
 static async numberCheck(number) 
 {
     try{
    const a=  await con.query("SELECT * FROM customer WHERE number = ?",[number])
    if(a.length>0){
      throw constantMessage.phoneNoExists
    }
    else
     return a;
     } 
 catch(error){
   throw error
 }
 
}

static async checkCustomeridOnbooking(booking_id,customer_id) 
{
    try{
   const a=  await con.query("SELECT * FROM booking JOIN bookingaddress ON booking.bookingaddress_id = bookingaddress.bookingaddress_id WHERE booking.booking_id = ? AND booking.customer_id = ?",[booking_id,customer_id])
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



static async numberChecklogin(number) 
{
    try{
   const a=  await con.query("SELECT * FROM customer WHERE number = ?",[number])
   if(a.length>0){
     return a
   }
  else
  throw constantMessage.phoneNoExists
    } 
catch(error){
  throw error
}

}

 static async insertData(req) {
   try{
            const createdAt = new Date()
 const a = await con.query('INSERT INTO customer(firstname,lastname,email,number,password,state,city,gender,otp,age,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[req.firstname,req.lastname,req.email,req.number,req.password,req.state,req.city,req.gender,req.otp,req.age,createdAt])
 return a   
}
   catch(error){
     throw error    
  }

  }
  static async insertBooking(req) {
    try{
        const a = await con.query('INSERT INTO booking(`fair`,`cartype`,`journeydate`,`servicetype`,`customer_id`,`bookingaddress_id`) VALUES (?,?,?,?,?,?)',[req.fair,req.cartype,req.JourneyDate,req.ServiceType,req.customerid,req.addressid])
  
        return a   
 }
    catch(error){   
      console.log(error)
     throw error  
   }
 
   }
   static async insertBookingAddress(req) {
    try{
  const a = con.query('INSERT INTO bookingaddress(`to`,`from`,`pickuplocation`) VALUES (?,?,?)',[req.to,req.from,req.pickuplocation])
  return a   
 }
    catch(error){  
      console.log(error) 
      throw error 
   }
 
   }



 }