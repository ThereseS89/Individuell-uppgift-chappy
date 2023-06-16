async function deleteMessage (id) {
	if (!id) {
		console.log('invalid message id')
		return false
	}
	

	const options = {
		method: 'delete',
		
}


	const response = await fetch(`/messages/${id}`, options)
	const statusObject = await response.json()
		if (response.ok) {
			console.log('success');
			return true
		}
		console.log('Delete status failed: ', statusObject)
		return false
}


export default deleteMessage