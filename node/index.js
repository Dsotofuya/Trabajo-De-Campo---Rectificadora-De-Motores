import express from "express";
import cors from 'cors';
import db from "./db/RectimotorDB.js";
import orderRoutes from './routes/Routes.js'

const app = express();

app.use(cors())
app.use(express.json())
app.use('/orders', orderRoutes)

try {
    await db.authenticate()
    console.log('Database connected')
} catch (error) {
    console.log(`Database conn error: ${error}`)
}

app.get('/', (req, res)=>{
    res.send('Prueba')
})

app.listen(3412, () => {
    console.log('Server Up, running in http://localhost:3412')
}) 