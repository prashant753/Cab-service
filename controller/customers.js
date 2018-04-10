const services = require("../services")
const response = require("../lib/responseSend")
const async = require('async');
const twilio = require("../lib/twilio")
const tokenGen = require("../lib/token")
const bcrypt = require("../lib")
const constantMessage = require("../constant").constantMessage.errorMessage.eng
let offset = 0
 async function customerSignup(req){
    try {
    
       let userData = await services.customer.emailCheck(req.email); 
       req.number =req.countryCode + req.number
       const number = await services.customer.numberCheck(req.number)
       var randomotp = (Math.floor(Math.random()*1000000)+1000000).toString().substring(1);
       req.otp  =  twilio.sendSms(req.number,randomotp)
       const insertData = await services.customer.insertData(req)
       return response.sendSuccessSignup(req)
       
    }  catch (error) {
       throw error;
    }

}

async function showBooking(token,limit){
    try{
     
        const customerid=await tokenGen.verifyCustomerToken(token)
        const a= await services.customer.join(customerid,offset,limit)
        offset =offset+limit
        return response.getCustomerbooking(a,token)
     } 
     catch(error) {
          throw error
        }
    }

    async function cancelBooking(token,booking_id){
        try{
            const customerid=await tokenGen.verifyCustomerToken(token)
            const status = await services.customer.idCheck(booking_id.booking_id,customerid)
            if(status[0].booking_status!="CANCELLED"){
                const a= await services.customer.cancelBooking(customerid)
                return response.customerCancelled(a,token)
            }
              else
                          constantMessage.bookingalreadyCancelled
           
         } 
         catch(error) {
              throw error
            }
        }



async function createBooking (req,token)
{    
    try{
       const t = tokenGen.verifyCustomerToken(token)
       const obj = {
        ServiceType : req.servicetype,
          JourneyDate : req.journeydate,
         fair : req.fair,
         cartype : req.cartype
       }
       
       const add = {
           to: req.to,
           from : req.from,
           pickuplocation : req.pickupLocation
       }
       const addressDetail= await services.customer.addAddress(add)
       obj.customerid= t
       const daa=  await con.query("SELECT * FROM bookingaddress WHERE pickuplocation = ?",[req.pickupLocation])
       obj.addressid = daa[0].bookingaddress_id
       const bookingDetail= await services.customer.createBooking(obj)
       obj.booking_id=bookingDetail.insertId
       const mongo = await services.customer.insertToMongo(obj)    
       return  response.sendSuccessBooking(req,token)
    } catch(error) {
       throw error
     }
}


async function editprofile(userPayload,token){
    try {

        userPayload.number = userPayload.countryCode + userPayload.number
        let customer_id= tokenGen.verifyToken(token)
        
        const details = await services.customer.getCustomerDetails(customer_id)
        
        var dataToUpdate = {};
        dataToUpdate.id= customer_id
        if(userPayload.firstname==undefined && userPayload.lastname==undefined && userPayload.email==undefined && userPayload.password==undefined && userPayload.number==undefined && userPayload.countryCode==undefined)
            throw ERROR.errorMessage.eng.noRequest;
        if(req.first_name==undefined)
         {   
            req.first_name=userData[0].first_name;
         }
         if(req.last_name==undefined)
         {   
            req.last_name=userData[0].last_name;
         }
    
         if(req.email==undefined)
         { req.email=userData[0].email;}
         else{
            let emailData = await Services.userServices.emailCheck(req.email);
            if(emailData.length>0)
              throw ERROR.errorMessage.eng.emailExit;
         }
    
         if(req.password==undefined)
         {
             req.password=userData[0].password;
         }
         else{
                req.password=await Bcrypt.encryptPassword(req.password);
                }
        
        if(req.contact_number==undefined)
           {req.contact_number=userData[0].contact_number;}
        else{
            if(req.country_code==undefined)
               throw ERROR.errorMessage.eng.noCountry_code;
            else
            {
                req.contact_number=req.country_code+req.contact_number;
                const contactData=await Services.userServices.contactCheck(req.contact_number)
                if(contactData.length>0)
                throw ERROR.errorMessage.eng.contactExit;
            }
            }
    
            const data=await Services.userServices.editProfile(req);
            return ResponseSend.sendSuccessLogin(req,token);
        }
       catch(e)
       {  
           throw e;
       }
    //     if(userPayload.name && userPayload.name !='' && details[0].name!=userPayload.name){
    //         dataToUpdate.name = userPayload.name
    //     }
    //     if(userPayload.email && userPayload.email !='' && details[0].email!=userPayload.email){
    //         dataToUpdate.email = userPayload.email
    //     }
    //     if(userPayload.number && userPayload.number !='' && details[0].number!=userPayload.number){
    //         dataToUpdate.number = userPayload.number
    //     }
    //     if(userPayload.address && userPayload.address !='' && details[0].address!=userPayload.address){
    //         dataToUpdate.address = userPayload.address
    //     }
    //     if(userPayload.gender && userPayload.gender !='' && details[0].gender!=userPayload.gender){
    //         dataToUpdate.gender = userPayload.gender
    //     }
    //     if(userPayload.age && userPayload.age !='' && details[0].age!=userPayload.age){
    //         dataToUpdate.age = userPayload.age
    //     }
        
    //    const updatedData = await services.customer.updateData(dataToUpdate,customer_id)
    //    return response.sendSuccess(token)
    

}

async function otpverify(data){
    try{
        let userData = await services.customer.numbercheck(data.number); 
          console.log(userData)
          console.log(data)
        if(data.otp==userData[0].otp)
        {
             return response.sendOtpSuccess()
        }
        else
        return constantMessage.invalidOTP
    }
    catch(error){
         throw error;
    }
}

async function customerLogin(req){
  
    try {  
        let userData = await services.customer.emailChecksignIn(req.email); 
          const hash = userData[0].password
          const value =await bcrypt.bcrypt.decryptPassword(req.password,hash)
              if(value){    

                const token = tokenGen.customertokenGenerate(userData[0].customer_id)
                return response.sendSuccessCustomer(token)
       }
       
         else {
    
          throw constantMessage.passwordNot
         
        }
      }

    catch (error) {
        throw error;
    }
}


module.exports = {
    customerSignup : customerSignup,
    otpverify : otpverify,
    customerLogin : customerLogin,
    editprofile : editprofile,
    createBooking : createBooking,
    showBooking : showBooking,
    cancelBooking : cancelBooking
}