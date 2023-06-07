import { getDb } from "../data/database.js";
import jwt from 'jsonwebtoken'
import express from "express"
import dotenv from 'dotenv';
dotenv.config();


// spara lösenord och autensiering med JWT

const db = getDb()

const secret = process.env.SECRET 
const router = express.Router()



router.post('/', async (req, res) => {
	await db.read()
	console.log('Database:', db.data.users);
	const { username, password } = req.body
	if( !req.body || !req.body.username || !req.body.password ) {
		res.sendStatus(400)
		return
	}
	
	let found = db.data.users.find(user => user.username === username)
	console.log('Found user:', found);
	if ( !found ){
		res.sendStatus(401)
		console.log('Felaktigt användarnamn')
		return
	}
	if( found.password !== password){
		res.sendStatus(401)
		console.log('Felaktigt lösenord')
		return
	}

// Skapar och skickar en jwt
const hour = 60 * 60
const payload = { userId: found.id }
const options = { expiresIn: 2 * hour }
let token = jwt.sign(payload, secret, options)
let tokenPackage = { token: token }
await db.write()
res.send(tokenPackage)
})

export default router