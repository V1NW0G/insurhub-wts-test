const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { sendWhatsAppMessage } = require('./Helper/WhatsappAuto'); 
const whatsappRouter = require('./Helper/WhatsappSender');
const { MessagingResponse } = require('twilio').twiml;

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/api', whatsappRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  console.log(twiml)

  res.type('text/xml').send(twiml.toString());
});

const scheduledTime = "17:08";

const [scheduledHour, scheduledMinute] = scheduledTime.split(':').map(Number);

cron.schedule(`${scheduledMinute} ${scheduledHour} * * *`, () => {
    const recipient = '+85268758644'; 
    const messageBody = `This message is scheduled at ${scheduledTime}`;
    sendWhatsAppMessage(recipient, messageBody);
    console.log("Message sent at", scheduledTime);
});
