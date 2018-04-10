const services = require("../services")
const response = require("../lib/responseSend")
const async = require('async');
const twilio = require("../lib/twilio")
const tokenGen = require("../lib/token")
const bcrypt = require("../lib")
const constantMessage = require("../constant").constantMessage.errorMessage.eng
var otp={}
let offset=0
 async function driverSignup(req){
    try {
    
       let userData = await services.driver.emailCheck(req.email); 
       req.number =req.countryCode + req.number
       const number = await services.driver.numberCheckSignup(req.number)
       var randomotp = (Math.floor(Math.random()*1000000)+1000000).toString().substring(1);
       req.otp =await  twilio.sendSms(req.number,randomotp)
       const insertData = await services.driver.insertData(req)
       
       return response.sendSuccessSignupDriver(req)
       
    }  catch (error) {
       throw error;
    }

}
async function editprofile(userPayload,token){
    try {

        userPayload.number = userPayload.countryCode + userPayload.number
        let customer_id= tokenGen.verifyToken(token)

        const details = await services.customer.getDriverDetails(customer_id)
        
        var dataToUpdate = {};
        
        if(userPayload.name && userPayload.name !='' && details[0].name!=userPayload.name){
            dataToUpdate.name = userPayload.name
        }
        if(userPayload.email && userPayload.email !='' && details[0].email!=userPayload.email){
            dataToUpdate.email = userPayload.email
        }
        if(userPayload.number && userPayload.number !='' && details[0].number!=userPayload.number){
            dataToUpdate.number = userPayload.number
        }
        if(userPayload.address && userPayload.address !='' && details[0].address!=userPayload.address){
            dataToUpdate.address = userPayload.address
        }
        if(userPayload.gender && userPayload.gender !='' && details[0].gender!=userPayload.gender){
            dataToUpdate.gender = userPayload.gender
        }
        if(userPayload.age && userPayload.age !='' && details[0].age!=userPayload.age){
            dataToUpdate.age = userPayload.age
        }
        
       const updatedData = await services.driver.updateData(dataToUpdate,customer_id)
       return response.sendSuccess(token)
       
    }  catch (error) {
       throw error;
    }
}

async function otpverify(data){
    try{
        let userData = await services.driver.numberCheck(data.number); 
        if(data.otp==userData[0].otp)
        {
             return response.sendOtpSuccess()
        }
        else
        return constantMessage.invalidOTP
    }
    catch(error){
        console.log(error)
         throw error;
    }
}

async function getBooking(token,limit){
    try{
        
        const driverid=await tokenGen.verifyDriverToken(token)
        const a= await services.driver.getDriverBookings(driverid,offset,limit)
        offset=offset+limit
        return response.getdriverbooking(a,token)
     } 
     catch(error) {
          throw error
        }
    }



async function driverLogin(req){
  
    try {  
    
        let userData = await services.driver.emailChecksignIn(req.email); 
          const hash = userData[0].password
          const value = bcrypt.bcrypt.decryptPassword(req.password,hash)
              if(value){

                const token = tokenGen.drivertokenGenerate(userData[0].driver_id)
                return response.sendSuccessDriver(token)
       }
       
         else {
    
          throw ConstantMsg.userNotFound
         
        }
      }

    catch (error) {
        console.log(error)
        throw error;
    }
}


module.exports = {
    driverSignup : driverSignup,
    otpverify : otpverify,
    driverLogin : driverLogin,
    editprofile : editprofile,
    getBooking : getBooking
}