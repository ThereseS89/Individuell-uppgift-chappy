

export async function putMessage(messageId, message) {

	const changedMessage = {
		message: message
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
		if(statusObject === 'success') {
			return true
		} else {
			return false
		}
		} catch(error) {
			console.error('Find error: ', error)
		}
}