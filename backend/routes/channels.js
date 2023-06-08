import express from "express"
import { getDb } from "../data/database.js"
import jwt from 'jsonwebtoken'

let process;
const router = express.Router()
const db = getDb()
const secret = process.env.SECRET 

// Här ska alla metoder som behövs komma in

// GET
router.get('/', async (req, res) => {
	await db.read()
	let channels = db.data.channels

	res.send(channels)
})

router.get('/:channelId', (req, res) => {
	const channelId = req.params.channelId
	const channelName= req.params.name
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

		if(!user){return res.status(401).json({ message: 'user not found'})}

		console.log(`User "${user.username}" has access to channel ${channelId}.`)

		req.url = `/messages?channelId=${channelId}`
		req.method = 'POST'

		res.send({
			message: `Welcome to ${channelName}`}) 
		
	} catch(error) {
		console.log('GET /channel/:channelId error: ' + error.message)
		res.sendStatus(401)
	}

})

export default router
