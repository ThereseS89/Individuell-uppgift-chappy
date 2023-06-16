

export async function putMessage(messageId, message) {
	console.log('PutMessages körs')
	const changedMessage = {
		
		channel: message.channel,
    	sender: message.sender,
        message: message.message
	}

	const options ={
		method: 'put',
		headers: { 'content-Type': 'application/json'},
		body: JSON.stringify(changedMessage)

	}
	console.log('ändrat meddelande ', changedMessage )

	try {
		const response = await fetch(`/messages/${messageId}`, options)
		const statusObject = await response.json()
		console.log('Response from API: ', statusObject)
		console.log('response: ', response )
		if(statusObject.status === 'success') {
			return true
		} else {
			return false
		}
		} catch(error) {
			console.error('Find error: ', error)
			return false
		}
}