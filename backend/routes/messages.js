import express from "express"
import { getDb } from "../data/database.js"

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
//DELETE


export default router