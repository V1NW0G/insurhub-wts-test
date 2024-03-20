const express = require('express');
const router = express.Router();
require('dotenv').config();
const accountSid = "AC65f84e5c59e17f5e832fe12b31f4012a";
const authToken = "27fb54b4a9d4b85c6324b996f0be5371";
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/send-whatsapp', (req, res) => {
  const { recipient, messageBody } = req.body;

  client.messages
    .create({
      body: messageBody,
      from: 'whatsapp:+14155238886', 
      to: `whatsapp:${recipient}`
    })
    .then(message => {
      console.log(`Message sent to ${recipient}: ${message.sid}`);
      res.send('Message sent successfully!');
    })
    .catch(error => {
      console.error('Error sending message:', error);
      res.status(500).send('Failed to send message');
    });
});

router.post('/message', function(req, res, next) {
  const twiml = new MessagingResponse();
  twiml.message('Thank you for your message! A member of our team will be in touch with you soon.');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

module.exports = router;
