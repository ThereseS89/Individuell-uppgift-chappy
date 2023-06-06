import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
import usersRouter from './routes/users.js'
import channelsRouter from './routes/channels.js'
import messagesRouter from './routes/messages.js'


const port = process.env.PORT || 4767
const app = express()


app.use((req, res, next) => {
	console.log(`req.method, req.url`, req.body)
	next()
})

app.use( cors() )
const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '../dist')
app.use(express.static(dist))

app.use('/', express.json())

app.use('/users', usersRouter)
app.use('/channels', channelsRouter)
app.use('/messages', messagesRouter)

app.get('*', (req, res) => {
	res.sendFile(join(dist, 'index.html'))
})

app.listen(port, () => {
	console.log(`server is listening on port ${port}`)
})