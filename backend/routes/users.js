import express from "express"
import { getDb } from "../data/database.js"
import { generateUserId } from "../utilities/generateid.js"
import { isValidUser } from "../utilities/validate.js"

const router = express.Router()
const db = getDb()
// Här ska alla metoder som behövs komma in

// GET
router.get('/api', async (req, res) => {
	await db.read()
	let users = db.data.users

	res.send(users)
})


// POST
router.post('/', async (req, res) => {
	let possibleNewUser = req.body

	if(isValidUser(possibleNewUser)) {
		await db.read()
		if( await isUser(possibleNewUser)){
			res.sendStatus(409)
			console.log('User does already exist')
		} else {
			possibleNewUser.id = await generateUserId()
			db.data.users.push(possibleNewUser)
			await db.write()
			res.send(possibleNewUser)
			console.log('success, new user added')
		}
	} else {
		res.sendStatus(400)
		console.log('invalid')
	}

})

	async function isUser(u) {
		let existingUser = db.data.users.some(user => user.name === u.name )

		if(existingUser) {
			return true
		}
		return false
	}

export default router