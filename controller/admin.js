const services = require("../services")
const bcrypt = require("../lib")
const response = require("../lib/responseSend")
const tokenGen = require("../lib/token")
let offsetdriver = 0
let offsetbooking = -10
let offsetDriverbooking = 0
offsetcustomerbooking =0
offsetCustomer = 0
// offsetCustomerGlobal = 0
// offsetDriverGlobal = 0
// offsetBookingGlobal = 0
async function adminLogin(req){
  
    try {  
        let adminData = await services.admin.checkadminemail(req.email); 
          const hash = adminData[0].password
          const value = bcrypt.bcrypt.decryptPassword(req.password,hash)
              if(value){
          const token = tokenGen.admintokenGenerate(adminData[0].idadmin)
                return response.sendSuccessAdmin(adminData,token)
       }
    else {

          throw ConstantMsg.userNotFound
         
        }
      }

    catch (error) {
        throw error;
    }
}
async function globalSearch(token,name,limit){
  
    try {  
        
        const adminid=await tokenGen.verifyAdminToken(token)
          const customer =  await services.customer.globalCustomer(name)
          const driver =  await services.driver.globalDriver(name)
          const booking =  await services.admin.globalBooking(name)
          return response.globalSeaching(customer,driver,booking,token) 
       }
 
    catch (error) {
        throw error;
    }
}

async function getDrivers(token,limit){
    try{
        offsetdriver = offsetdriver + limit
        const adminid=await tokenGen.verifyAdminToken(token)
        const a= await services.admin.getDriverDetails(offsetdriver,limit)
        return response.getDrivers(a,token)
     } 
     catch(error) {
          throw error
        }
    }
    async function getCustomers(token,limit){
        try{
            offsetCustomer = offsetCustomer + limit
            const adminid=await tokenGen.verifyAdminToken(token)
            const a= await services.admin.getCustomerDetails(offsetCustomer,limit)
            return response.getDrivers(a,token)
         } 
         catch(error) {
              throw error
            }
        }
    

    async function getDriverBooking(token,driverid,limit){
        try{
            
            const adminid=await tokenGen.verifyAdminToken(token)
            const a= await services.admin.getDriverBooking(driverid,offsetDriverbooking,limit)
            offsetDriverbooking = offsetDriverbooking + limit
            return response.sendDriverSuccessBooking(a,token)
         } 
         catch(error) {
             console.log(error)
              throw error
            }
        }
        async function getCustomerBooking(token,customerid,limit){
            try{
                offsetcustomerbooking = offsetcustomerbooking + limit
                const adminid=await tokenGen.verifyAdminToken(token)
                const a= await services.admin.getCustomerBooking(customerid,offsetcustomerbooking,limit)
                return response.sendCustomerSuccessBooking(a,token)
             } 
             catch(error) {
                 console.log(error)
                  throw error
                }
            }

    async function getBooking(token,limit){
        try{
            offsetbooking = offsetbooking + 10
            const adminid=await tokenGen.verifyAdminToken(token)
            const a= await services.admin.join(limit,offsetbooking)
            return response.getbooking(a,token)
         } 
         catch(error) {
             console.log(error)
              throw error
            }
        }

async function assignDriver(token,req){
  
    try {  
        const adminid=await tokenGen.verifyAdminToken(token)
        const driver_id = req.driverid
        const booking_id = req.bookingid
        const driver = await services.driver.idCheck(driver_id)
       
        const driverupdate = await services.driver.updateDriver(driver_id,booking_id)
        const booking = await services.driver.checkBooking(booking_id)

        const detail = await services.admin.driverBookingJoin(booking[0].booking_id)
        let obj ={
                 booking_id : booking[0].booking_id.toString(),
                 customer_id :booking[0].customer_id.toString(),
                 bookingaddress_id : booking[0].bookingaddress_id.toString(),
                 driver_id : "ASSIGNED",
                 booking_status : "CONFIRMED"
        }
        const mongo = await services.customer.insertToMongoAfterAssinging(obj)  
        return response.assignDriver(detail,token)
    
      }

    catch (error) {
        throw error;
    }
}


module.exports ={
    adminLogin : adminLogin,
    assignDriver : assignDriver,
    getBooking : getBooking,
    getDrivers :getDrivers,
    getDriverBooking : getDriverBooking,
    getCustomerBooking : getCustomerBooking,
    getCustomers :getCustomers,
    globalSearch : globalSearch
} 