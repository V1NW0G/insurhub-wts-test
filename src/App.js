const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { sendWhatsAppMessage } = require('./Helper/whatsappSender'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.urlencoded({ extended: true }));

app.post('/sms', (req, res) => {
  const userMessage = req.body.Body;
  console.log("User's message:", userMessage);
  
  const recipient = process.env.PHONE; 
  const messageBody = `This message is autoreply, you have send ${userMessage}`;
  sendWhatsAppMessage(recipient, messageBody); 
});

//Time user decide and store in DB
const scheduledTime = "14:20";

const [scheduledHour, scheduledMinute] = scheduledTime.split(':').map(Number);

cron.schedule(`${scheduledMinute} ${scheduledHour} * * *`, () => {
    console.log("Phone",process.env.PHONE)
    const recipient = process.env.PHONE; 
    const messageBody = `This message is scheduled at ${scheduledTime}`;
    sendWhatsAppMessage(recipient, messageBody);
    console.log("Message sent at", scheduledTime);
});
