const fs = require('fs')
const qrcode = require('qrcode-terminal')
const {Client} = require('whatsapp-web.js')
const SESSION_FILE_PATH = "./session,js"
const counryCode = "57"
const number = "3203903653"
const msg = "xd"

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)){
  sessionData = require(SESSION_FILE_PATH)
}

const client = new Client({
  session: sessionData
})

client.initialize()

client.on('qr', qr => {
  qrcode.generate(qr, {small: true})
})

client.on('ready', () => {
  console.log("La cuenta esta lista para enviar notificaciones")

  let chatId = counryCode + number + "@c.us"
  client.sendMessage(chatId, msg).then(resp => {
      if(resp.id.fromMe) {
        console.log("notificación enviada al cliente")
      }
  })
}) 

client.on('authenticated', session => {
  sessionData = session
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err => {
    if(err){
      console.error(err)
    }
  })
})

client.on('auth_failure', msg => {
  console.error('Error en la autenticación', msg)
}) 
