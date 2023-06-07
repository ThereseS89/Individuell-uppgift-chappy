import express from "express";
import { getDb } from "../data/database.js";
import { isValidId } from "../utilities/validate.js";

const router = express.Router()
const db = getDb()

// GET:id
router.get('/:id', async (req, res) => {
	let possibleId = Number(req.params.id)

	if(isNaN(possibleId) || possibleId < 0) {
		res.sendStatus(400)
		return
	}
	await db.read()

	let possibleUser = db.data.users.find(user => user.id === possibleId)

	if(!possibleUser){
		res.sendStatus(404)
		return
	}
	res.send(possibleUser)
})

// DELETE
router.delete('/:id', async (req, res) => {
	if(!isValidId(req.params.id)) {
		res.sendStatus(400)
		console.log('Delete one Product - Incorrect value has to be a number.')
		return
	}
	let id = Number(req.params.id)
	await db.read()
	let deleteUser = db.data.users.find(removedUser => removedUser.id === id)
	if (!deleteUser) {
		res.sendStatus(404)
		console.log('Delete One product, Could not found id in the product-list ')
		return
	}
	db.data.users = db.data.users.filter(newUser => newUser.id !== id)
	await db.write()
	res.sendStatus(200)
	console.log('The user is deleted.')
} )

// PUT
router.put('/:id', async (req, res) => {
	if(!isValidId(req.params.id)) {
		res.sendStatus(400)
		console.log('Incorrect value, had to be a number for id..')
		return
	}
	let id = Number(req.params.id)

	let editedUser = req.body
	await db.read()
	let oldUserIndex = db.data.users.findIndex(changeUser => changeUser.id === id)
	if( oldUserIndex === -1 ) {
		res.sendStatus(404)
		console.log('Could not found the id to change the user..')
		return
	}
	editedUser.id = id
	db.data.users[oldUserIndex] = editedUser
	await db.write()
	res.sendStatus(200)
	console.log('Now you have changed the user..')
})

export default router