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

try {
    await db.authenticate()
    console.log('Database connected')
} catch (error) {
    console.log(`Database conn error: ${error}`)
}

app.listen(3412, () => {
    console.log('Server Up, running in http://localhost:3412')
}) 