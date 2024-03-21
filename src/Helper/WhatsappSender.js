//Twilio API
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendWhatsAppMessage(recipient, messageBody) {
    client.messages
      .create({
        body: messageBody,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${recipient}`
      })
      .then(message => {
        console.log(`Message sent to ${recipient}: ${message.sid}`);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
}

module.exports = { sendWhatsAppMessage };
