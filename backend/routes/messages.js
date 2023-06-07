import express from "express"
import { getDb } from "../data/database.js"
import { generateMessageId } from "../utilities/generateid.js"

const router = express.Router()

const db = getDb()
// Här ska alla metoder som behövs komma in

// GET
router.get('/', async (req, res) => {
	await db.read()
	let messages = db.data.messages

	res.send(messages)
})

//POST
router.post('/', async (req, res) => {
	let newMessage = req.body
		await db.read()
		newMessage.id = await generateMessageId()
		db.data.messages.push(newMessage)
		await db.write()
		res.send(newMessage)
		console.log('success, new message')

})
//DELETE


export default router