import express from "express";
import cors from 'cors';
import db from "./db/RectimotorDB.js";
import OrderRoutes from './routes/RoutesOrders.js'
import PersonRoutes from './routes/RoutesPerson.js'
import WorkshopsRoutes from './routes/RoutesWorkshops.js'
import EnginesRoutes from './routes/RoutesEngines.js'
import WorksRoutes from './routes/RoutesWorks.js'
import NewReplacementRoutes from './routes/RoutesNewReplacement.js'
import PartsRoutes from './routes/RoutesPart.js'
import MeasureRoutes from './routes/RoutesMeasure.js'
import DetOrdRoutes from './routes/RoutesDetOrd.js'
import HistoricRoutes from './routes/RoutesHistoric.js'
import UserRoutes from './routes/RoutesUser.js'

import qrcode from 'qrcode-terminal'
import { Client } from 'whatsapp-web.js'
import { config } from 'dotenv';
config();

const port = process.env.PORT || 3412
const app = express();

app.use(cors())
app.use(express.json())
app.use('/orders', OrderRoutes)
app.use('/persons', PersonRoutes)
app.use('/workshops', WorkshopsRoutes)
app.use('/engines', EnginesRoutes)
app.use('/works', WorksRoutes)
app.use('/newreplacement', NewReplacementRoutes)
app.use('/parts', PartsRoutes)
app.use('/measures', MeasureRoutes)
app.use('/detord', DetOrdRoutes)
app.use('/historic', HistoricRoutes)
app.use('/users', UserRoutes)

try {
    await db.authenticate()
    console.log('Database connected')
} catch (error) {
    console.log(`Database conn error: ${error}`)
}

const client = new Client()

client.initialize()

client.on('qr', qr => {
    qrcode.generate(qr, {small: true})
})

client.on('ready', () => {
    console.log("La cuenta esta lista para enviar notificaciones")
})

app.post('/sendmessage', async (req, res, next) => {
    try {
        const { number, message } = req.body; // Get the body
        const msg = await client.sendMessage(`57${number}@c.us`, message); // Send the message
        res.send({ msg }); // Send the response
    } catch (error) {
      next(error)
    }
  })

app.listen(port, () => {
    console.log('Server Up, running in ' + port)
}) 