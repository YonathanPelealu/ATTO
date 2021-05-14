require ('dotenv').config()

import cors from 'cors'
import express from 'express'
import indexRoute from './routes/index'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/v1',indexRoute)
const PORT = process.env.APP_PORT

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})