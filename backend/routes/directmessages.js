import express from "express"
import { getDb } from "../data/database.js"
import { generateMessageId } from "../utilities/generateid.js"

const router = express.Router()
const db = getDb()

// GET - Hämta alla direktmeddelanden
router.get('/', async (req, res) => {
	await db.read()
	let directmessages = db.data.directmessages

	res.send(directmessages)
})

// POST - Skicka meddelande till en specifik användare
router.post('/:username', async (req, res) => {

	try { 	
		const reciever = req.params.username
		const sender = req.body.username
		
		await db.read()

		const newDirectMessage = {
			id: await generateMessageId(),
			sender: sender,
			reciever: reciever,
			message: req.body.message
		}
		
		db.data.directMessages.push(newDirectMessage)
		await db.write()
		res.send(newDirectMessage)
		console.log('success, new message')
	
	} catch (error) {
		console.log('Failed to send message', error)
		res.status(400).send('Failed')
	}
})

export default router