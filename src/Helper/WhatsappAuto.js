// Function to send WhatsApp message using Twilio API
function sendWhatsAppMessage(recipient, messageBody) {
    const accountSid = "AC65f84e5c59e17f5e832fe12b31f4012a";
    const authToken = "27fb54b4a9d4b85c6324b996f0be5371";
    const client = require('twilio')(accountSid, authToken);
  
    client.messages
      .create({
        body: messageBody,
        from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
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
