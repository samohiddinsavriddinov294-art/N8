import express from 'express'
import { join } from 'path'
import { configDotenv } from 'dotenv'
import userRouter from './routers/users.js'
import fileRouter from './routers/files.js'

import fileUpload from 'express-fileupload'

configDotenv()

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(userRouter)
app.use(fileRouter)

app.listen(process.env.PORT, () => {
    console.log("server is running")
})