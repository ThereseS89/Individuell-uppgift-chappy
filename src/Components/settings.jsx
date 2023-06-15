import { useEffect } from "react"
import { useState } from "react"
import deleteMessage from "../utils/deleteMessages.js"
import { getMessages } from "../utils/getmessages.js"

const Settings = () => {
	const [editMessageId, setEditMessageId] = useState(null)
	const [editedMessage, setEditedMessage] = useState('')
	const [messages, setMessages] = useState([])

	useEffect(() => {
		async function fetchMessages() {
			const messagesData = await getMessages()
			setMessages(await messagesData)
		}
	})

	const handleDelete = async (messageId) => {
		await deleteMessage(messageId)
	}

	const editMessage = async (messageId) => {
		setEditMessageId(messageId)
		const chosenMessage = messages.find((message) => message.id === messageId)
		setEditedMessage(chosenMessage.message)
	}

	const handleSave = async (messageId, event) => {
		event.preventDefault()
		await editMessage(editedMessage)

		const messagesData = await getMessages()
		setMessages(await messagesData)

		setEditMessageId(null)
	}
	
	return (
		<div>
			<p onClick={handleDelete}>radera meddelande</p>
			<p onClick={editMessage}> ändra meddelande</p>
			<button type="button" onClick={(event) => handleSave( event)}>Avbryt</button><button>Spara</button>
		</div>
	)
}

export default Settings