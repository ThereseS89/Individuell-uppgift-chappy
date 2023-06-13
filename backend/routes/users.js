import express from "express"
import { getDb } from "../data/database.js"
import { generateUserId } from "../utilities/generateid.js"
import { isValidUser } from "../utilities/validate.js"
import { reorderKeys } from "../utilities/reorderKeys.js"

const router = express.Router()
const db = getDb()
// Här ska alla metoder som behövs komma in

// GET
router.get('/', async (req, res) => {
	await db.read()
	let users = db.data.users

	res.send(users)
})


// POST
router.post('/', async (req, res) => {
	let possibleNewUser = req.body

	if(isValidUser(possibleNewUser)) {
		await db.read()
		console.log("Received new user data:", possibleNewUser);
		if( await isUser(possibleNewUser)){
			res.sendStatus(409)
			console.log('User does already exist')
		} else {
			possibleNewUser.id = await generateUserId()
			const reorderedUser = reorderKeys(possibleNewUser)
			db.data.users.push(reorderedUser)
			await db.write()
			res.status(201).send({status: 'success'})
			console.log('success, new user added')
		}
	} else {
		res.sendStatus(400)
		console.log('invalid')
	}

})

	async function isUser(u) {
		let existingUser = db.data.users.some(user => {
			console.log("Comparing:", user.username, "and", u.username);
			return user.username === u.username} )

		if(existingUser) {
			return true
		}
		return false
	}

export default router