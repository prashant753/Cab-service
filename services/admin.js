const DAO  = require("../dao")
const constantMessage = require("../constant").constantMessage.errorMessage.eng
async function checkadminemail(id) {
    try {
        const admin = await DAO.admin.emailCheck(id)
           return admin
        }
            
     catch (error) {
        throw error
    }
}
async function globalBooking(name) {
    try {
        const admin = await DAO.admin.globalSearch(name)
           return admin
        }
            
     catch (error) {
        throw error
    }
}


async function getDriverDetails(offset,limit) {
    try {
        const drivers = await DAO.admin.getDriver(offset,limit)
           return drivers
        }
            
     catch (error) {
        throw error
    }
}
async function getCustomerDetails(offset,limit) {
    try {
        const drivers = await DAO.admin.getCustomer(offset,limit)
           return drivers
        }
            
     catch (error) {
        throw error
    }
}
async function join(limit,offset) 
{
try{
              const join = await DAO.admin.join(limit,offset)
              return join
}

catch(error)
{
    throw error
}
}



async function driverBookingJoin(booking_id) 
{
try{
              const join = await DAO.admin.driverbookingJoin(booking_id)
              return join
}

catch(error)
{
    throw error
}
}
async function getDriverBooking(driverid,offset,limit) 
{
try{
              const join = await DAO.admin.joinBooking(driverid,offset,limit)
              if(join.length>0){
                return join
              }
              else 
           throw   constantMessage.driverNotAssigned
              
              
              
}

catch(error)
{
    throw error
}
}
async function getCustomerBooking(customerid,offset,limit) 
{
try{
              const join = await DAO.admin.joinCustomerBooking(customerid,offset,limit)
              if(join.length>0){
                return join
              }
              else 
           throw   constantMessage.driverNotAssigned
            
}
catch(error)
{
    throw error
}
}
module.exports = {
    checkadminemail : checkadminemail,
    join :join,
    getDriverDetails :getDriverDetails,
    getDriverBooking: getDriverBooking,
    driverBookingJoin :driverBookingJoin,
    getCustomerBooking :getCustomerBooking,
    getCustomerDetails :getCustomerDetails,
    globalBooking : globalBooking
}