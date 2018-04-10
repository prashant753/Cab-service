module.exports=function(){
    db.createCollection("booking_history", {
        validator: {
           $jsonSchema: {
              bsonType: "object",
              required: ["booking_id","user_id","driver_id","address_id","booking_status","createdAt","modifiedAt"],
              properties: {
                booking_id: {
                    bsonType: "string",
                    description: "must be a string and is required"
                 },
                customer_id: {
                    bsonType: "string",
                    description: "must be an string and is required"
                 },
                 driver_id: {
                    bsonType: "string",
                    description: "must be an string and is required"
                 },
                 bookingaddress_id: {
                    bsonType: "string",
                    description: "must be an string and is required"
                 },
                 booking_status: {
                    bsonType: "string",
                 description: "must be an string and is required"
                 },
                 createdAt: {
                    bsonType: "string",
                    description: "must be an string and is required"
                 },
                 modifiedAt: {
                    bsonType: "string",
                    description: "must be an string and is required"
                 },
            }
           }
        },
        validationLevel:"off",
        validationAction:"warn"
     })
    }