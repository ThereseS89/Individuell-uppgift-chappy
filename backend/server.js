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
import { getDb } from './data/database.js'
import jwt from 'jsonwebtoken'



const port = process.env.PORT || 4767
const secret = process.env.SECRET 
const app = express()
const db = getDb()


app.use((req, res, next) => {
	console.log(`req.method, req.url`, req.body)
	next()
})

app.use( cors() )
const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '../dist')
app.use(express.static(dist))

app.use('/', express.json())

//routes
app.use('/login', loginRouter)
app.use('/myPage', myPageRouter)
app.use('/users', usersRouter)
app.use('/channels', channelsRouter)
app.use('/messages', messagesRouter)

app.get('*', (req, res) => {
	res.sendFile(join(dist, 'index.html'))
})

app.get('/secret', (req, res) => {
	let autHeader = req.headers.authorization
	if( !autHeader) {
		res.status(401).send({
			message: 'unauthorized'
		})
		return
	}
	let token = autHeader.replace('Bearer ', '')

	try {
		let decoded = jwt.verify(token, secret)
		let userId = decoded.userId
		let user = db.data.users.find(user => user.id === userId)
		console.log(`User "${user.username}" has access to secret data.`)

		res.send({
			message: 'Welcome'
		})
	} catch(error) {
		console.log('GET /secret error: ' + error.message)
		res.sendStatus(401)
	}
})

app.listen(port, () => {
	console.log(`server is listening on port ${port}`)
})