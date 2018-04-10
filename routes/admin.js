
const controller = require("../controller")
const Joi = require("joi")
const JoiValidator = require("../lib/joiValidation")


const admin = [
    {
            method: "POST",
            path: "/admin/login",
        
            handler: async (request, reply) => {
                try {
                    const userPayload = request.payload;
                    const response = await controller.admin.adminLogin(userPayload)    
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
            path: "/admin/assigndriver",
        
            handler: async (request, reply) => {
                try {
                    const token = request.headers.token
                    const userPayload = request.payload
                    const response = await controller.admin.assignDriver(token,userPayload)    
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
                        payload: JoiValidator.assigndriver(),
                        headers:Joi.object().keys({
                            token : Joi.string().required(),
                          }).unknown()
        
                    },
                    plugins: {
                        'hapi-swagger': {
                            payloadType : 'body',
                            responseMessages: 'assigndriver'
                        }
                    }
            }
        },


        {
            method: "POST",
            path: "/admin/getbooking",
        
            handler: async (request, reply) => {
                try {
                    const token = request.headers.token
                    const limit = request.payload.limit
                    const response = await controller.admin.getBooking(token,limit)    
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
                        payload : JoiValidator.getBookingAdmin(),
                        headers:Joi.object().keys({
                            token : Joi.string().required(),
                          }).unknown()
                     
        
                    },
                    plugins: {
                        'hapi-swagger': {
                            payloadType : 'body',
                            responseMessages: 'getbooking'
                        }
                    }
            }
        },

        {
            method: "POST",
            path: "/admin/getcustomers",
        
            handler: async (request, reply) => {
                try {
                    const token = request.headers.token
                    const limit = request.payload.limit
                    const response = await controller.admin.getCustomers(token,limit)    
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
                         payload : JoiValidator.limit(),
                        headers:Joi.object().keys({
                            token : Joi.string().required(),
                          }).unknown()
                     
        
                    },
                    plugins: {
                        'hapi-swagger': {
                            payloadType : 'body',
                            responseMessages: 'assigndriver'
                        }
                    }
            }
        },
        {
            method: "POST",
            path: "/admin/GlobalSearch",
        
            handler: async (request, reply) => {
                try {
                    const token = request.headers.token
                    const name = request.payload.name
                    const response = await controller.admin.globalSearch(token,name)    
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
                         payload : JoiValidator.abcd(),
                        headers:Joi.object().keys({
                            token : Joi.string().required(),
                          }).unknown()
                     
        
                    },
                    plugins: {
                        'hapi-swagger': {
                            payloadType : 'body',
                            responseMessages: 'assigndriver'
                        }
                    }
            }
        },

        {
            method: "POST",
            path: "/admin/getdrivers",
        
            handler: async (request, reply) => {
                try {
                    const limit = request.payload.limit
                    const token = request.headers.token
                    const response = await controller.admin.getDrivers(token,limit)    
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
                        payload : JoiValidator.limit(),
                        headers:Joi.object().keys({
                            token : Joi.string().required(),
                          }).unknown()
                     
        
                    },
                    plugins: {
                        'hapi-swagger': {
                            payloadType : 'body',
                            responseMessages: 'assigndriver'
                        }
                    }
            }
        },
        {
            method: "POST",
            path: "/admin/getbooking/drivers",
        
            handler: async (request, reply) => {
                try {
                    const token = request.headers.token
                    const userPayload = request.payload
                    const limit = request.payload.limit
                    const response = await controller.admin.getDriverBooking(token,userPayload.driver_id,limit)    
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
                        payload : 
                            JoiValidator.driver(),
                        headers:Joi.object().keys({
                            token : Joi.string().required(),
                          }).unknown()
                     
        
                    },
                    plugins: {
                        'hapi-swagger': {
                            payloadType : 'body',
                            responseMessages: 'assigndriver'
                        }
                    }
            }
        },
        {
            method: "POST",
            path: "/admin/getbooking/customers",
        
            handler: async (request, reply) => {
                try {
                    const token = request.headers.token
                    const userPayload = request.payload
                    const limit = request.payload.limit
                    const response = await controller.admin.getCustomerBooking(token,userPayload.customer_id,limit)    
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
                        payload: JoiValidator.customer(),
                        headers:Joi.object().keys({
                            token : Joi.string().required(),
                          }).unknown()
                     
        
                    },
                    plugins: {
                        'hapi-swagger': {
                            payloadType : 'body',
                            responseMessages: 'assigndriver'
                        }
                    }
            }
        }

]
module.exports = admin
