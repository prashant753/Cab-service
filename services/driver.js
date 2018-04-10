const DAO  = require("../dao")
const constantMessage = require("../constant").constantMessage.errorMessage.eng
const bcrypt = require("../lib/bcrypt")
async function emailCheck(email) {
    try {

       return await DAO.driver.emailChecksignUp(email)
       
            
    } catch (error) {
        throw error
    }
}
async function globalDriver(name) {
    try {

       return await DAO.driver.globalSearch(name)    
    } catch (error) {
        throw error
    }
}

async function join(driverid,offset,limit) 
{
try{
              const join = await DAO.admin.join(driverid,offset,limit)
              return join
}
catch(error)
{
    throw error
}
}
async function getDriverBookings(driverid,offset,limit) 
{
try{
              const join = await DAO.driver.driverBookingJoin(driverid,offset,limit)
              return join
}
catch(error)
{
    throw error
}
}



async function emailChecksignIn(email) {
    try {

       return await DAO.driver.emailChecksignIn(email)
    } catch (error) {
        throw error
    }
}

async function numberCheckSignup(number) {
    try {
    
        const numberDataCheck = await DAO.driver.numberCheck(number)
            return numberDataCheck
            
    } catch (error) {
        throw error
    }
}
async function numberCheck(number) {
    try {
    
        const numberDataCheck = await DAO.driver.numberCheckOtp(number)
            return numberDataCheck
            
    } catch (error) {
        throw error
    }
}

async function idCheck(id) {
    try {
        const idDataCheck = await DAO.driver.idCheck(id)
           return idDataCheck
        }
            
     catch (error) {
        throw error
    }
}

async function checkBooking(id) {
    try {
        const idDataCheck = await DAO.driver.checkBookingid(id)
           return idDataCheck
        }
            
     catch (error) {
        throw error
    }
}

async function getDriverDetails(id) {
    try {
        const customerDetail = await DAO.driver.getDriverDeatils(id)
           return customerDetail
        }
            
     catch (error) {
        throw error
    }
}

async function insertData(data) {
    try {

        const hash = await bcrypt.encryptPassword(data.password)
        data.password = hash
        const userInsert = await DAO.driver.insertData(data)
        return userInsert;
    } catch (error) {
        throw error;

    }
}
async function updateData(dataToUpdate,driver_id){

        try{
                const update =await DAO.driver.updateDriver(dataToUpdate,customer_id)
        }
        catch(error){
            throw error
        }
}
async function updateDriver(driver_id,booking_id){

    try{
            const update =await DAO.driver.updateDriverStatus(driver_id,booking_id)
            return update
    }
    catch(error){
   throw error
    }

}

module.exports = {
    emailCheck : emailCheck,
    insertData :insertData,
    numberCheck : numberCheck,
    idCheck : idCheck,
    getDriverDetails :    getDriverDetails ,
    emailChecksignIn :emailChecksignIn,
    updateData : updateData,
    join : join,
    numberCheckSignup :numberCheckSignup,
    updateDriver : updateDriver,
    checkBooking :checkBooking,
    getDriverBookings : getDriverBookings,
    globalDriver :globalDriver
}