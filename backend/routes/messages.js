import express from "express"
import { getDb } from "../data/database.js"
import { generateMessageId } from "../utilities/generateid.js"
import {isValidId} from "../utilities/validate.js"

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
router.post('/api', async (req, res) => {
	let newMessage = req.body
		await db.read()
		newMessage.id = await generateMessageId()
		db.data.messages.push(newMessage)
		await db.write()
		res.send(newMessage)
		console.log('success, new message')

})

//PUT
router.put('/:id', async (req, res) => {
	if(!isValidId(req.params.id)) {
		res.sendStatus(400)
		console.log('Incorrect value, had to be a number for id..')
		return
	}
	let id = Number(req.params.id)

	let editedMessage = req.body
	await db.read()
	let oldMessageIndex = db.data.messages.findIndex(message => message.id === id)
	if( oldMessageIndex === -1 ) {
		res.sendStatus(404)
		console.log('Could not found the id to change the product..')
		return
	}
	editedMessage.id = id
	db.data.messages[oldMessageIndex] = editedMessage
	await db.write()
	res.sendStatus(200)
	console.log('Now you have changed the message..')
})


//DELETE
router.delete('/:id', async (req, res) => {
	if(!isValidId(req.params.id)) {
		res.sendStatus(400)
		console.log('Delete one Product - Incorrect value has to be a number.')
		return
	}
	let id = Number(req.params.id)
	await db.read()
	let deleteMessage = db.data.messages.find(message => message.id === id)
	if (!deleteMessage) {
		res.sendStatus(404)
		console.log('Delete One product, Could not found id in the product-list ')
		return
	}
	db.data.messages = db.data.messages.filter(message => message.id !== id)
	await db.write()
	res.sendStatus(200)
	console.log('The message is deleted.')
} )



export default router