import express from "express"
import { getDb } from "../data/database.js"

const router = express.Router()
const db = getDb()

// Här ska alla metoder som behövs komma in

// GET
router.get('/', async (req, res) => {
	await db.read()
	let channels = db.data.channels

	res.send(channels)
})

export default router
