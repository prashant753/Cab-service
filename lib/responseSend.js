const Boom = require('boom')
const fetch = require("./fetchCustomer")
const services = require("../services")
const verify = require("../lib/token")
const DAO = require("../dao")
const ObjectId= require('mongodb').ObjectID; 
// const tokenGen = require("../lib/token")
class responseSend {
static async sendSuccessSignup(userData,otp) {
    // console.log(userData)
    try{
        const statusCode =  200;

    //const message = (response && response.message) || configs.MessageConfiguration.get('/lang', { locale: headers['content-language'], message: 'SUCCESS' });
    const message = 'SUCCESS'
    const daa=  await con.query("SELECT * FROM customer WHERE email = ?",[userData.email])
          var show ={
            email  : userData.email,
            firstname   : userData.firstname,
            lastname : userData.lastname,
            number : userData.number,
         addresses : userData.address,
         gender : userData.gender,
         age : userData.age,
         state : userData.state,
            city : userData.city,
            otp : userData.otp

       }
          const  otp = userData.otp
            const verifyNumber = "Thank you for signing up,please verify your contact number"
            show.Id = daa[0].customer_id
            const data = show
    return { statusCode, message, data,verifyNumber,otp };
        }catch(e)
        {
              console.log(e)
               throw e
    }
}
static async sendSuccessSignupDriver(userData) {
    // console.log(userData)
    try{
        const statusCode =  200;

    //const message = (response && response.message) || configs.MessageConfiguration.get('/lang', { locale: headers['content-language'], message: 'SUCCESS' });
    const message = 'SUCCESS'
    const daa=  await con.query("SELECT * FROM driver WHERE email = ?",[userData.email])
          var show ={
            email  : userData.email,
            firstname   : userData.firstname,
            lastname : userData.lastname,
            number : userData.number,
            addresses : userData.address,
            gender : userData.gender,
           age : userData.age,
           state : userData.state,
            city : userData.city,
            licence : userData.licencenumber
    
            }
          const  otp = userData.otp
            const verifyNumber = "Thank you for signing up,please verify your contact number"
            show.Id = daa[0].driver_id
            const data = show
    return { statusCode, message, data,verifyNumber,otp };
        }catch(e)
        {
              console.log(e)
               throw e
    }
}


static async sendOtpSuccess() {
    const statusCode = 200;

    const message = 'OTP Verified'
    
    return { statusCode, message};
}

static async getDrivers(DriverDetails,token) {
    const statusCode = 200;
    const message = 'SUCCESS'
      let data = []
       for(let i = 0;i<DriverDetails.length;i++){
        let arr = {}
        arr.driverid = DriverDetails[i].driver_id,
        arr.email = DriverDetails[i].email,
        arr.number = DriverDetails[i].number,
        arr.age = DriverDetails[i].age,
        arr.licencenumber = DriverDetails[i].licencenumber,
        arr.gender = DriverDetails[i].gender,
        arr.createdat = DriverDetails[i].createdat,
        arr.state = DriverDetails[i].state,
        arr.city = DriverDetails[i].city,
        arr.verified =DriverDetails[i].verified
           data.push(arr)
       }
       


    return { statusCode, message,data,token};
}



static async globalSeaching(customerDetails,driverDetails,bookingDetails,token) {
    const statusCode = 200;
    const message = 'SUCCESS'
    return { statusCode, message,customerDetails,driverDetails,bookingDetails,token};
}


static async getCustomers(customerDetails,token) {
    const statusCode = 200;
    const message = 'SUCCESS'
      let data = []
       for(let i = 0;i<customerDetails.length;i++){
        let arr = {}
        arr.customerid = customerDetails[0].customer_id,
        arr.name = customerDetails[0].name,
        arr.email = customerDetails[0].email,
        arr.number = customerDetails[0].number,
        arr.state = customerDetails[0].state,
        arr.gender = customerDetails[0].gender,
        arr.age = customerDetails[0].age,
        arr.createdAt = customerDetails[0].createdAt,
        arr.modifiedAt = customerDetails[0].modifiedAt,
        arr.verified = customerDetails[0].verified,
           data.push(arr)
       }
       


    return { statusCode, message,data,token};
}



static async sendSuccessCustomer(tokenDetail) {
    const statusCode = 200;
   const customer_id= verify.verifyCustomerToken(tokenDetail)
    const details = await services.customer.getCustomerDetails(customer_id)
   const userDetail = fetch.customerDetails(details)
    const message = 'SUCCESS'
    
    return { statusCode, message,userDetail,tokenDetail};
}
static async sendDriverSuccessBooking(details,tokenDetail) {
    const statusCode = 200;

    const message = 'SUCCESS'
    return { statusCode, message,details,tokenDetail};
}
static async sendCustomerSuccessBooking(details,tokenDetail) {
    const statusCode = 200;

    const message = 'SUCCESS'
    
    return { statusCode, message,details,tokenDetail};
}


static async sendSuccessAdmin(admin,tokenDetail) {

    const statusCode = 200;
         const data = {
             adminid : admin[0].idadmin,
             name : admin[0].name,
             email : admin[0].email,
             createdAt : admin[0].createdAt,
            
         }
    const message = 'SUCCESS'
    
    return { statusCode, message,data,tokenDetail};
}

static async sendSuccessBooking(data,tokenDetail) {
    const statusCode = 200;
    const message = 'SUCCESS'
    
    return { statusCode, message,data,tokenDetail};
}

static async assignDriver(data,tokenDetail) {
    const statusCode = 200;
    const message = 'SUCCESS'
    
    return { statusCode, message,data,tokenDetail};
}

static async sendSuccessDriver(tokenDetail) {
    const statusCode = 200;
   const driver_id= verify.verifyDriverToken(tokenDetail)
    const details = await services.driver.getDriverDetails(driver_id)
    const driverdata = {
        driverid : details[0].driver_id,
        firstname : details[0].firstname,
        lastname : details[0].lastname,
        email : details[0].email,
        number : details[0].number,
        age : details[0].age,
        licencenumber : details[0].licencenumber,
        gender : details[0].gender,
        createdat : details[0].createdat,
        state : details[0].state,
        city : details[0].city,
        verified : details[0].verified

    }
    const message = 'SUCCESS'
    
    return { statusCode, message,driverdata,tokenDetail};
}
static async sendDelete(tokenDetail) {
    const statusCode = 200;
    const message = 'User Removed Successfully';
    return { statusCode, message, tokenDetail };
}


static async bookingCancelled(tokenDetail) {
    const statusCode = 200;
    const message = 'Booking Cancelled Successfully';
    return { statusCode, message, tokenDetail };
}



static async  bookingSuccess(bookingDetail,token) {
    const t = tokenGen.verifyToken(token)
    const tokenDetail = ObjectId(t)
    const statusCode = 200;
    const msg = await DAO.findOne("signup",tokenDetail)
    const userDetail = fetch.userDetails(msg)
    const booking = fetch.bookingDetail(bookingDetail)
    
  
    const message = 'SUCCESSFULL'
    return { statusCode, message, userDetail,booking, token };
}

// static async  showBooking(bookingDetail,tokenDetail) {
//     const statusCode = 200;
//     const message = 'SUCCESSFULL'

//     const customerDetail = {
//         customerid : bookingDetail[0].customer_id,
//         name : bookingDetail[0].name,
//         email : bookingDetail[0].email,
//         number : bookingDetail[0].number,
//         state : bookingDetail[0].state,
//         gender : bookingDetail[0].gender,
//         age : bookingDetail[0].age,
//         createdAt : bookingDetail[0].createdAt,
//         modifiedAt : bookingDetail[0].modifiedAt,
//         verified : bookingDetail[0].verified,
//     }
// let booking ={}
//   let bookings=[]
//   for(let i=0;i<bookingDetail.length;i++)
//   {
//     booking.driverid = bookingDetail[i].driver_id
//     booking.booking_id = bookingDetail[i].booking_id
//     booking.bookingaddressid = bookingDetail[i].bookingaddress_id
//          booking.fair = bookingDetail[i].fair
//          booking.cartype = bookingDetail[i].cartype
//          booking.journeydate = bookingDetail[i].journeydate
//          booking.servicetype = bookingDetail[i].servicetype
//          booking.to = bookingDetail[i].to
//          booking.from = bookingDetail[i].from
//          booking.pickuplocation = bookingDetail[i].pickuplocation
//          bookings.push(booking)
//   }

//     return { statusCode,message, customerDetail,bookings,tokenDetail };
// }

static async  getCustomerbooking(bookingDetail,tokenDetail) {
    const statusCode = 200;
    const message = 'SUCCESSFULL'
    const customerDetail = {
        customer_id : bookingDetail[0].customer_id,
        name : bookingDetail[0].firstname,
        last : bookingDetail[0].lastname,
        email : bookingDetail[0].email,
        number : bookingDetail[0].number,
        state : bookingDetail[0].state,
        city : bookingDetail[0].city,
        gender : bookingDetail[0].gender,
        age : bookingDetail[0].age,
        createdAt : bookingDetail[0].createdAt,
        modifiedAt : bookingDetail[0].modifiedAt,
        verified : bookingDetail[0].verified,
    }

  let bookings=[]
  for(let i=0;i<bookingDetail.length;i++)
  {
    let booking ={}
    booking.booking_id = bookingDetail[i].booking_id
    booking.customerid = bookingDetail[i].customer_id
    booking.driverid = bookingDetail[i].driver_id
    booking.bookingaddressid = bookingDetail[i].bookingaddress_id
    booking.bookingstatus = bookingDetail[i].booking_status
    booking.city = bookingDetail[i].city
         booking.city = bookingDetail[i].city
         booking.fair = bookingDetail[i].fair
         booking.cartype = bookingDetail[i].cartype
         booking.journeydate = bookingDetail[i].journeydate
         booking.servicetype = bookingDetail[i].servicetype
         booking.to = bookingDetail[i].to
         booking.from = bookingDetail[i].from
         booking.pickuplocation = bookingDetail[i].pickuplocation
         bookings.push(booking)
  }

    return { statusCode,message,customerDetail,bookings,tokenDetail };
}
static async  getdriverbooking(bookingDetail,tokenDetail) {
    const statusCode = 200;
    const message = 'SUCCESSFULL'
    // const DriverDetails = {
    //     driver_id : bookingDetail[0].driver_id,
    //     name : bookingDetail[0].firstname,
    //     last : bookingDetail[0].lastname,
    //     email : bookingDetail[0].email,
    //     number : bookingDetail[0].number,
    //     state : bookingDetail[0].state,
    //     city : bookingDetail[0].city,
    //     gender : bookingDetail[0].gender,
    //     age : bookingDetail[0].age,
    //     createdAt : bookingDetail[0].createdAt,
    //     modifiedAt : bookingDetail[0].modifiedAt,
    //     verified : bookingDetail[0].verified,
    // }

//   let bookings=[]
//   for(let i=0;i<bookingDetail.length;i++)
//   {
//     let booking ={}
//     booking.booking_id = bookingDetail[i].booking_id
//     booking.customerid = bookingDetail[i].customer_id
//     booking.driverid = bookingDetail[i].driver_id
//     booking.bookingaddressid = bookingDetail[i].bookingaddress_id
//     booking.bookingstatus = bookingDetail[i].booking_status
//     booking.city = bookingDetail[i].city
//          booking.city = bookingDetail[i].city
//          booking.fair = bookingDetail[i].fair
//          booking.cartype = bookingDetail[i].cartype
//          booking.journeydate = bookingDetail[i].journeydate
//          booking.servicetype = bookingDetail[i].servicetype
//          booking.to = bookingDetail[i].to
//          booking.from = bookingDetail[i].from
//          booking.pickuplocation = bookingDetail[i].pickuplocation
//          bookings.push(booking)
//   }

    return { statusCode,message,bookingDetail,tokenDetail };
}


static async  getbooking(details,tokenDetail) {
    const statusCode = 200;
    const message = 'SUCCESSFULL'

  let data = []
  for(let i=0;i<details.length;i++)
  {
    let booking ={}
    booking.customerid = details[i].customer_id
    booking.customername = details[i].customername 
    booking.customer_email = details[i].email
    booking.customer_number = details[i].number
    if(details[i].driver_id==null){
        booking.driver_id = "Not Assigned"
        booking.driver_name = "Not Assigned"
        booking.driver_email = "Not Assigned"
        booking.driver_number = "Not Assigned"
    }
    else{
          booking.driver_id =  details[i].driver_id
          booking.driver_name = details[i].drivername
          booking.driver_email= details[i].driveremail
          booking.driver_number = details[i].drivernumber
    }
        booking.booking_id = details[i].booking_id
        booking.cartype = details[i].cartype
        booking.journeydate = details[i].journeydate
        booking.servicetype = details[i].servicetype
             booking.booking_status = details[i].booking_status
             booking.to = details[i].to
            
             booking.from = details[i].from
             
             booking.pickuplocation = details[i].pickuplocation
         data.push(booking)
  }

    return { statusCode,message,data,tokenDetail };
}


}
module.exports = responseSend