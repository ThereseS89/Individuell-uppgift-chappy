
export async function postMessage(newMessage, username, name) {
	
	console.log('adding the new message...')

	const newAddedMessage = {
		sender: username,
		message: newMessage,
		channel: name
	}

	const options = {
		method: 'post',
		headers: { 'content-Type': 'application/json'},
		body: JSON.stringify(newAddedMessage)
	}

	console.log("Sending new user data:", newAddedMessage);
	const response = await fetch('/messages', options)
	console.log("Response from server:", response)
	const statusObject = await response.json()
	console.log('Response from API post:', statusObject)
	console.log(statusObject)
	if(statusObject.status === 'success') {
		return true;
	} else {
		return false;
	}

}