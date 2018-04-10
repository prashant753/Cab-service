const Boom = require('boom')

module.exports = {
    version: "/v1",

    errorMessage: {
        eng: {
            invalidToken : Boom.conflict("Invalid Token") ,
            emailExists: Boom.conflict("Email Already exist"),
            tokenExpired : Boom.conflict("Token Expired"),
            invalidCredentials: Boom.unauthorized("Invalid Credentials"),
            userNotFound: Boom.notFound("User Not found"),
            cannotReset: Boom.conflict("Sorry your password cannot be reset now, try later"),
             passwordNot : Boom.unauthorized("Sorry your password didn't matched"),
             phoneNoExists : Boom.conflict("Contact number already registered "),
        notInserted : Boom.conflict("Cannot Insert the Data"),
        userisVerified : Boom.conflict("User is already verified"),
        invalidOTP : Boom.conflict("You have entered invalid OTP"),
        numberNotRegistered : Boom.notFound("Number not registered"),
        bookingNotFound : Boom.notFound("Booking not found"),
        driverNotFound : Boom.notFound("driver not found"),
        driverNotAssigned : Boom.conflict("Driver Not Assigned to any booking"),
        driverAreadyAssigned : Boom.conflict("Driver Already Assigned to this booking"),
        driverNotBooked : Boom.conflict("No Booking Found for this driver"),
        customerNotBooked : Boom.conflict("Customer Didn't made any booking"),
        userisNotVerified : Boom.conflict("User is Not verified"),
        bookingalreadyCancelled : Boom.conflict("Booking is already Cancelled"),
        alreadyCancelled : Boom.conflict("ALREADY CANCELLED")
    }
    }
}
