const accountSid = 'AC5fd9d511cc1f5bb99a5ff0fd99341dfe';
const authToken = 'a94ec0db3fdbd232dc7de2df1150fa7f';
const client = require('twilio')(accountSid, authToken);

let destination = 'whatsapp:+57' + 3203903653
let message = 'Hola ' + 'Sergio' + ' tu orden # ' + 123 + ' de ha pasado al estado ' + 'en espera por repuestos' 
 
client.messages
  .create({
     from: 'whatsapp:+14155238886',
     body: message,
     to: destination
   })
  .then(message => console.log(message.sid));