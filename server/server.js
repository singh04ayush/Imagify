import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()


app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/user', userRouter)
app.get('/', (req, res)=> res.send("API Working fine"))

app.listen(PORT, ()=> console.log('server running on port ' + PORT));