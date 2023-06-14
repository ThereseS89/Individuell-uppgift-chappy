async function deleteMessage (messageId) {

	const  data = {
		id: messageId
	}
console.log(data);
	const options = {
		method: 'delete',
	}
	console.log(data);

	const response = await fetch(`/messages/${messageId}`, options)
	const statusObject = await response.json()
		if (statusObject.status === 'success') {
			console.log('success');
			return true
		}
		console.log('Delete status failed: ', statusObject)
		return false
}


export default deleteMessage