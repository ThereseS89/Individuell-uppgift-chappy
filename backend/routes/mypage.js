import express from "express";
import { getDb } from "../data/database.js";


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
// PUT

export default router