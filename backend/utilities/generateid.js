import { getDb } from '../data/database.js'

// Genererar nytt id till användare
const db = getDb()

async function generateUserId() {
	await db.read()
	const highestId = Number(db.data.users.reduce((maxId, currentUser) => {
return Math.max(maxId, currentUser.id)}, 0))
return highestId + 1
}


async function generateMessageId() {
	return Math.round(Math.random() * 1000000000)
}


export { generateUserId, generateMessageId }