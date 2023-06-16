import { useState, useEffect } from "react"
import { postMessage } from "../utils/postmessages.js"
import { getMessages } from "../utils/getmessages.js"
import { setStoreToken } from "../atoms/storeToken.js";
import { useRecoilState, useRecoilValue } from "recoil";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import Settings from "../Components/settings.jsx";
import { setIdToDeleteState } from "../atoms/setIdToDeleteState.js";
import { editMessageIdState } from "../atoms/editmessageIdState.js";
import { putMessage } from "../utils/putMessages.js";
import { setEditedMessageState } from "../atoms/setEditedMessageState.js";
import {setShowInputEditState} from '../atoms/setShowInputEditState.js'

const Koda = () => {
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState('')
	const channelName = 'koda'
	const username = useRecoilValue(setStoreToken);
	const [ messageIdSave, setMessageIdSave ] = useState(null)
	const [idToDelete, setIdToDelete ] = useRecoilState(setIdToDeleteState)
	const [editMessageId, setEditMessageId] = useRecoilState(editMessageIdState)
	const [editedMessage, setEditedMessage] = useRecoilState(setEditedMessageState)
	const [showInputEdit, setShowInputEdit] = useRecoilState(setShowInputEditState)

	console.log('användarnamnet från recoilstate:' ,username)

	
		const fetchMessages = async () => {
			console.log('fetchmessages körs')
			try {
				const messageData = await getMessages()
				const channelNames = messageData.map((message) => message.channel);
				console.log('channelNames:', channelNames);
				const filteredMessages = messageData.filter((message) => message.channel === channelName)
				
				console.log('filtered: ', filteredMessages)
				setMessages(filteredMessages)
				console.log('messages i fetchmessages', messages)
			} catch (error) {
				console.log(error)
			}
			
		}
		
	

		useEffect(() => {
			fetchMessages();
		}, []);

	

	const addNewMessage = async () => {
		
		try {
					const addedMessage = await postMessage(newMessage, username, 'koda')
					if (addedMessage) {
						setMessages((prevMessages) => [...prevMessages, addedMessage])
						console.log('Nu är meddelandet tillagt')
						console.log('Nya meddelandet: ', addedMessage.message)
						
					}
			} catch (error) {
				console.log(error)
			}
			fetchMessages()
		}

		const handleNewMessage = (event) => {
			setNewMessage(event.target.value)
		}

		const handleEditMessage = (e) => {
			setEditedMessage({ ...editedMessage, message: e.target.value});
		};

		console.log('messages: ', messages)

		function handleShowSettings(messageId) {
			console.log(messageIdSave)
			setIdToDelete(messageId)
			
			if(messageIdSave === messageId) {
				setMessageIdSave(null)
			} else {
				setMessageIdSave(messageId)
			}
			setEditMessageId(messageId)
			console.log('Du klickade på knappen')
		}

		const handleSave = async (messageId) => {
			

			const updatedMessage = {
				
				channel: 'koda',
				sender: username,
				...editedMessage,
			};

			const updatedMessages = messages.map((message) => {
				if (message.id === messageId) {
					return {
						...message,
						...updatedMessage
					}
				}
				return message
			})

			setMessages(updatedMessages)
		
			console.log('Du klickade på kanppen save')
			await putMessage(messageId, updatedMessage)
	
			setEditMessageId(null)
			setEditedMessage('')
			setShowInputEdit(false)

			fetchMessages()

			
		}

		

	return (
		<section>
		<h1>Välkommen till Koda</h1>
		<div className="chat-area">
			<section className="heading">
				Chattar i <span className="chat-name"> Koda </span>
			</section>

			<section className="history">
				{messages.map((message) => (
					
				<section key={message.id} className="align-right">
					{editedMessage && editedMessage.id === message.id || showInputEdit ? ( 
						<div>
							<input
							type="text"
							value={editedMessage.message}
							onChange={handleEditMessage} />
							<button type="submit" onClick={() => handleSave(message.id)}>Spara</button>
						</div>
					) : (
						<div>
				<p>{message.sender}</p><br /><p>{message.message}</p>
				<FontAwesomeIcon onClick={(event) => handleShowSettings(message.id, event)} icon={faEllipsisVertical} />{messageIdSave === message.id ? ( <Settings /> )  : null} 
				</div>
					)}
				</section>
				))}
			</section> 
		
		<section>
			<input value={newMessage} onChange={handleNewMessage}type="text" placeholder="Ditt meddelande..." />
			<button type="submit" onClick={addNewMessage}> Skicka </button>
		</section>
	</div>
	</section>
	
	)
}

export default Koda