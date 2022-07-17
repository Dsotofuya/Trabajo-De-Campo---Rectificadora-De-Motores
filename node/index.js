import express from "express";
import cors from 'cors';
import db from "./db/RectimotorDB.js";
import OrderRoutes from './routes/RoutesOrders.js'
import PersonRoutes from './routes/RoutesPerson.js'

const app = express();

app.use(cors())
app.use(express.json())
app.use('/orders', OrderRoutes)
app.use('/persons', PersonRoutes)

try {
    await db.authenticate()
    console.log('Database connected')
} catch (error) {
    console.log(`Database conn error: ${error}`)
}

app.listen(3412, () => {
    console.log('Server Up, running in http://localhost:3412')
}) 