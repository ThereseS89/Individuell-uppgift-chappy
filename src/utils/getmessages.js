export async function getMessages() {
	console.log('getting messages...')
	try {
			const response = await fetch('/messages')
			const messagesData = await response.json()
			
	console.log ('Response from API:' , messagesData )
	return messagesData
} catch (error){
	console.error("error fetching data: ", error )
	return []
}

}