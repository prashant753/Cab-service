const twilio = require('twilio');
class Twilio{

  

static sendSms(receiver,body)
{
let TWILIO_PHONE_NUMBER="+14159653471";
let CELL_PHONE_NUMBER=receiver;

const client = new twilio("AC7bb348c8a0449585fc144308d1ba5f8d","4090a9abb39c573bc84bced6085cf2ad");
  client.messages.create({
  from: TWILIO_PHONE_NUMBER,
  to: CELL_PHONE_NUMBER,
  body: body
}).then((message) => console.log(message.body))
return body
}

}

module.exports=Twilio;