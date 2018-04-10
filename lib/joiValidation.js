
const Joi = require('joi')

class joiValidation {
    static otp() {
        const loginJoi = {
           number : Joi.string().required(),
            otp: Joi.number().required()
        }
        return loginJoi
    }

    static abcd() {
        const loginJoi = {
            name: Joi.string().required()
        }
        return loginJoi
    }

    static login() {
        const loginJoi = {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
        return loginJoi
    }
    static showBooking() {
        const loginJoi = {
            limit: Joi.number().required()
        }
        return loginJoi
    }
    static limit() {
        const limits = {
            limit: Joi.number().required()
        }
        return limits
    }

    static getDriverBooking() {
        const loginJoi = {
            limit: Joi.number().required()
        }
        return loginJoi
    }
    static getBookingAdmin() {
        const loginJoi = {
            limit: Joi.number().required()
        }
        return loginJoi
    }
    static booking_id() {
        const loginJoi = {
            booking_id: Joi.number().required(),
        }
        return loginJoi
    }
    static driver() {
        const loginJoi = {
            limit: Joi.number().required(),
          driver_id : Joi.number().required()
        }
        return loginJoi
    }
    static customer() {
        const loginJoi = {
            limit: Joi.number().required(),
          customer_id : Joi.number().required()
        }
        return loginJoi
    }
    static assigndriver() {
        const driver = {
           bookingid : Joi.string().required(),
            driverid: Joi.string().required()
        }
        return driver
    }

    static signup() {
        const signupjoi = {
            email: Joi.string().email().required(),
            firstname: Joi.string().min(3).required(),
            lastname: Joi.string().min(3).required(),
            password: Joi.string().required(),
            countryCode : Joi.string().trim().required(),
            number: Joi.string().regex(/^[0-9]+$/).min(5).required(),        
            state: Joi.string().required(),
            city: Joi.string().required(),
            gender: Joi.string().required(),
            age: Joi.number().required()

        }
        return signupjoi
    }

    static driverSignup() {
        const signupjoi = {
            email: Joi.string().email().required(),
            firstname: Joi.string().min(3).required(),
            lastname: Joi.string().min(3).required(),
            password: Joi.string().required(),
            countryCode : Joi.string().trim().required(),
            number: Joi.string().regex(/^[0-9]+$/).min(5).required(),        
            state: Joi.string().required(),
            city: Joi.string().required(),
            gender: Joi.string().required(),
            license: Joi.string().required(),
            age: Joi.number().required()

        }
        return signupjoi
    }


    static editprofile() {
        const signupjoi = {
            email: Joi.string().email().optional(),
            firstname: Joi.string().min(3).optional(),
            lastname: Joi.string().min(3).optional(),
            countryCode : Joi.string().trim().optional(),
            number: Joi.string().optional(),
            // password: Joi.string().optional(),
            address: Joi.string().optional(),  
            gender: Joi.string().optional(),
            age: Joi.number().optional()

        }
        return signupjoi
    }
    static updatePassword() {
        const updatePass = {
            newpassword: Joi.string().required(),

        }
        return updatePass
    }
    static insertBooking() {
        const signupjoi = {
            servicetype: Joi.string().required(),
            journeydate: Joi.string().required(),
            to: Joi.string().required(),
            from: Joi.string().required(),
            cartype: Joi.string().required(),
            pickupLocation : Joi.string().required(),
            fair: Joi.string().required()
         
        }
        return signupjoi
    }

}
module.exports = joiValidation