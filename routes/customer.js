const userController = require("../controller")
const Joi = require("joi")
const JoiValidator = require("../lib/joiValidation")

const user = [
    
    {

    // User  Login 

    method: "POST",
    path: "/customer/login",

    handler: async (request, reply) => {
        try {
            const userPayload = request.payload;
            const response = await userController.customers.customerLogin(userPayload)    
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
    path: '/booking/createbooking',

    handler: async (request, reply) => {
        try {
           const data=request.payload;
           const token=request.headers.token;
            const res = await userController.customers.createBooking(data,token);
           reply(res)
        }
        catch (e) {
            console.log(e)
            reply(e)
        }
    },
    config: {
        tags: ['api'],
        validate : {
                    payload : JoiValidator.insertBooking(),
                    headers: Joi.object().required().keys({
                        token: Joi.string().required()
                    }).unknown()
                    
        },
    plugins: {
        'hapi-swagger': {
            payloadType : 'form',
            responseMessages: 'Insert Booking'
        }
    }
    }
},
{
    method: "POST",
    path: '/booking/cancelbooking',

    handler: async (request, reply) => {
        try {
            const token=request.headers.token;
            const booking_id = request.payload
            const res = await userController.customers.cancelBooking(token,booking_id);
           reply(res)
        }
        catch (e) {
            console.log(e)
            reply(e)
        }
    },
    config: {
        tags: ['api'],
        validate : {
            payload : JoiValidator.booking_id(),
                    headers: Joi.object().required().keys({
                        token: Joi.string().required()
                    }).unknown()
                    
        },
    plugins: {
        'hapi-swagger': {
            payloadType : 'form',
            responseMessages: 'Insert Booking'
        }
    }
    }
},
   {
    method: "POST",
    path: "/customer/showbooking",

    handler: async (request, reply) => {
        try{
            const token=request.headers.token;
            const limit = request.payload.limit
            const response = await userController.customers.showBooking(token,limit)

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
            payload : JoiValidator.showBooking(),
        headers: Joi.object().required().keys({
            token: Joi.string().required()
        }).unknown()
    },
    plugins: {
        'hapi-swagger': {
            payloadType : 'form',
            responseMessages: 'Show booking'
        },
    }
    }

},


{

    // User  Login 

    method: "POST",
    path: "/customer/optverification",

    handler: async (request, reply) => {
        try {

            const userPayload = request.payload;
            const response = await userController.customers.otpverify(userPayload)    
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
    path: '/customer/signup',

    handler: async (request, reply) => {
        try {
          
            const userPayload = request.payload;
            const res = await userController.customers.customerSignup(userPayload);
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
                JoiValidator.signup()
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
        path: "/customer/editprofile",
    
        handler: async (request, reply) => {
            try {
                const token = request.headers.token
                const userPayload = request.payload;
                const response = await userController.customers.editprofile(userPayload,token)    
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
module.exports = user