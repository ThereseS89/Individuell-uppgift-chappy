import { useEffect } from "react"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { setIdToDeleteState } from "../atoms/setIdToDeleteState.js"
import deleteMessage from "../utils/deleteMessages.js"
import { getMessages } from "../utils/getmessages.js"
import { editMessageIdState } from "../atoms/editmessageIdState.js"
import { putMessage } from "../utils/putMessages.js"
import { setEditedMessageState } from "../atoms/setEditedMessageState.js"
import { setShowInputEditState } from "../atoms/setShowInputEditState.js"

const Settings = () => {
	const [editMessageId, setEditMessageId] = useRecoilState(editMessageIdState)
	const [editedMessage, setEditedMessage] = useRecoilState(setEditedMessageState)
	const [idToDelete, setIdToDelete] = useRecoilState(setIdToDeleteState)
	const [messages, setMessages] = useState([])
	const [showInputEdit, setShowInputEdit] = useRecoilState(setShowInputEditState)

	
		async function fetchMessages() {
			const messagesData = await getMessages()
			setMessages(await messagesData)
		}
		
	useEffect(() => {
		fetchMessages()
	}, [])
	
	
	const handleDelete = async (id ) => {
		
		if(idToDelete) {
			await deleteMessage(idToDelete)

		}
			const updatedMessages = messages.filter((message) => message.id !== id)
			setMessages(updatedMessages)
		
	}
	

	const editMessage = async (messageId) => {
		console.log('du klickade på editmessage')
		const chosenMessage = messages.find((message) => message.id === messageId)
		if (chosenMessage) {
			setEditMessageId(messageId)
			setEditedMessage(chosenMessage.message)
		}
		console.log('du klickade på editmessage2')
		setShowInputEdit(true)
		console.log('editedMessage:', editedMessage)
		console.log(editedMessage.id)
	}
	
	return (
		<div>
			
			<p onClick={handleDelete}>radera meddelande</p>
			<p onClick={editMessage}> ändra meddelande</p>
			
		</div>
	)
}

export default Settings