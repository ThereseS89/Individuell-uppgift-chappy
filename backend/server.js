import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
import usersRouter from './routes/users.js'
import channelsRouter from './routes/channels.js'
import messagesRouter from './routes/messages.js'
import myPageRouter from './routes/mypage.js'
import loginRouter from './routes/login.js'


// viktiga variabler

const port = process.env.PORT 
const app = express()


app.use((req, res, next) => {
	console.log(`${req.method}, ${req.url}`, req.body)
	console.log(req.headers.authorization)
	next()
})

app.use( cors() )
const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '../dist')
app.use(express.static(dist))

app.use('/api', express.json())

//routes
app.use('/api/login', loginRouter)
app.use('/api/myPage', myPageRouter)
app.use('/api/users', usersRouter)
app.use('/api/channels', channelsRouter)
app.use('/api/messages', messagesRouter)

app.get('*', (req, res) => {
	res.sendFile(join(dist, 'index.html'))
})


app.listen(port, () => {
	console.log(`server is listening on port ${port}`)
})