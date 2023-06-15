import { useState, useEffect } from "react"
import { postMessage } from "../utils/postmessages.js"
import { getMessages } from "../utils/getmessages.js"
import { setStoreToken } from "../atoms/storeToken.js";
import { useRecoilValue } from "recoil";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'

const Koda = () => {
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState('')
	const channelName = 'koda'
	const username = useRecoilValue(setStoreToken);
	console.log('användarnamnet från recoilstate:' ,username)

	useEffect(() => {
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
		fetchMessages()
	}, [])

	

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
		
		}

		const handleNewMessage = (event) => {
			setNewMessage(event.target.value)
		}

		console.log('messages: ', messages)

		function showSettings() {
			
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
				<p>{message.sender}</p><br /><p>{message.message}</p>
				<FontAwesomeIcon onClick={showSettings} icon={faEllipsisVertical} />
				</section>))}
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