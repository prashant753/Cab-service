const userController = require("../controller")
const Joi = require("joi")
const JoiValidator = require("../lib/joiValidation")

const driver = [
    
    {
// User  Login 

    method: "POST",
    path: "/driver/login",

    handler: async (request, reply) => {
        try {
        
            const userPayload = request.payload;
            const response = await userController.driver.driverLogin(userPayload)    
            reply(response)

        }
        catch (error) {   
            console.log(error)
            reply(error)
        }
    },
    config: {
        tags: ['api'],
        validate:
            {
                payload: JoiValidator.login(),
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'body',
                    responseMessages: 'login'
                }
            }
    }
},

{
    method: "POST",
    path: "/driver/getbooking",

    handler: async (request, reply) => {
        try{ 

            const token=request.headers.token;
            const limit =  request.payload.limit
        const response = await userController.driver.getBooking(token,limit)

        reply(response);

        }
        catch(error)
        {
            console.log(error)
          reply(error)
        }
    },
    config: {
        tags: ['api'],
        validate : {
            payload : JoiValidator.getDriverBooking(),
        headers: Joi.object().required().keys({
            token: Joi.string().required()
        }).unknown()
    },
    plugins: {
        'hapi-swagger': {
            payloadType : 'form',
            responseMessages: 'Get booking'
        },
    }
    }

},


{
    method: "POST",
    path: "/driver/optverification",

    handler: async (request, reply) => {
        try {

            const userPayload = request.payload;
            const response = await userController.driver.otpverify(userPayload)    
            reply(response)

        }
        catch (error) {
            reply(error)
        }
    },
    config: {
        tags: ['api'],
        validate:
            {
                payload: JoiValidator.otp(),
             

            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'body',
                    responseMessages: 'login'
                }
            }
    }
},
{
    method: "POST",
    path: '/driver/signup',

    handler: async (request, reply) => {
        try {
          
            const userPayload = request.payload;
            const res = await userController.driver.driverSignup(userPayload);
            reply(res)
        }
        catch (error) {
            console.log(error)
            reply(error)
        }
    },
    config: {
        tags: ['api'],
        validate: {
            payload:
                JoiValidator.driverSignup()
        },
        plugins: {
            'hapi-swagger': {
                payloadType : 'form',
                responseMessages: 'Sign Up'
            }
        }

    }
},

    {

        // User  Login 
    
        method: "POST",
        path: "/driver/editprofile",
    
        handler: async (request, reply) => {
            try {
                const token = request.headers.token
                const userPayload = request.payload;
                const response = await userController.driver.editprofile(userPayload,token)    
                reply(response)
            }
            catch (error) {
                console.log(error)
                reply(error)
            }
        },
        config: {
            tags: ['api'],
            validate:
                {
                    payload: JoiValidator.editprofile(),
                    headers:Joi.object().keys({
                        token : Joi.string().required(),
                      }).unknown()
    
                },
                plugins: {
                    'hapi-swagger': {
                        payloadType : 'body',
                        responseMessages: 'login'
                    }
                }
        }
    },
]
module.exports = driver