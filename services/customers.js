const DAO  = require("../dao")
const constantMessage = require("../constant").constantMessage.errorMessage.eng
const bcrypt = require("../lib/bcrypt")
async function emailCheck(email) {
    try {
    
        const emailDataCheck = await DAO.customer.emailCheck(email)
       return emailDataCheck
            
    } catch (error) {
        throw error
    }
}

async function numbercheck(number) {
    try {
       return await DAO.customer.idChecknumber(number)
    } catch (error) {
        throw error
    }
}


async function globalCustomer(name) {
    try {
       const a =  await DAO.customer.globalSearch(name)
       return a
    } catch (error) {
        throw error
    }
}



async function cancelBooking(customer_id) {
    try {
       return await DAO.customer.cancelBooking(customer_id)
    } catch (error) {
        throw error
    }
}
async function emailChecksignIn(email) {
    try {
       return await DAO.customer.emailCheckSignIn(email)
    } catch (error) {
        throw error
    }
}
async function insertToMongo(req){  
    try {  
        console.log(req)
        const model = db.collection("booking_history")     
      const data={
          
                        booking_id:req.booking_id.toString(),
                        customer_id:req.customerid.toString(),
                        bookingaddress_id:req.addressid.toString(),
                        driver_id:"NOT ASSIGNED",
                        booking_status:"PENDING",
                        createdAt:new Date().toString(),
                        modifiedAt:new Date().toString()};
      const insertedData = await DAO.mongo.insertData(model,data)
      return insertedData;
    } catch (error) {
        throw error;
    }
}

async function insertToMongoAfterAssinging(data){  
    try {  
        const model = db.collection("booking_history")     
          const createdAt = new Date().toString()
          const modifiedAt = new Date().toString()
          data.createdAt = createdAt
          data.modifiedAt = modifiedAt
      const insertedData = await DAO.mongo.insertData(model,data)
          return insertedData;
    } catch (error) {
        throw error;
    }
}


async function createBooking(req) {
    try {
       return await DAO.customer.insertBooking(req)
        
    } catch (error) {
        throw error;
    
    }
}




async function join(customerid,offset,limit) 
{
try{
              const join = await DAO.customer.join(customerid,offset,limit)
              return join
}
catch(error)
{
    throw error
}
}
async function addAddress(data) {
    try {
       return await DAO.customer.insertBookingAddress(data)
    } catch (error) {
        throw error;

    }
}

async function numberCheck(number) {
    try {
    
        const numberDataCheck = await DAO.customer.numberCheck(number)
            return numberDataCheck
            
    } catch (error) {
        throw error
    }
}

async function emailId(email) {
    try {
        const idDataCheck = await DAO.customer.idCheck(email)
           return idDataCheck
        }
            
     catch (error) {
        throw error
    }
}

async function idCheck(booking_id,customer_id) {
    try {

        const idDataCheck = await DAO.customer.checkCustomeridOnbooking(booking_id,customer_id)
           return idDataCheck
           
        }
            
     catch (error) {
        throw error
    }
}


async function getCustomerDetails(id) {
    try {
        const customerDetail = await DAO.customer.getCustomerDeatils(id)
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
        const userInsert = await DAO.customer.insertData(data)
        
        return userInsert;
    } catch (error) {
        throw error;

    }
}
async function updateData(dataToUpdate,customer_id){

        try{
                const update =await DAO.customer.updateCustomer(dataToUpdate,customer_id)
        }
        catch(error){
        }
}


module.exports = {
    emailCheck : emailCheck,
    insertData :insertData,
    numberCheck : numberCheck,
    getCustomerDetails :    getCustomerDetails ,
    emailChecksignIn :emailChecksignIn,
    updateData : updateData,
    createBooking :createBooking,
    emailId : emailId,
    addAddress : addAddress,
    join :join,
    numbercheck : numbercheck,
    insertToMongo : insertToMongo,
    cancelBooking :cancelBooking,
    idCheck :idCheck,
    insertToMongoAfterAssinging :insertToMongoAfterAssinging,
    globalCustomer :globalCustomer
}