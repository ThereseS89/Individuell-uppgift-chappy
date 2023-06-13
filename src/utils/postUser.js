export async function registerUser(username, password) {
	console.log('adding the new user...')

	const newUserData = {
		username: username,
		password: password
	}

	const options = {
		method: 'post',
		headers: { 'content-Type': 'application/json'},
		body: JSON.stringify(newUserData)
	}

	console.log("Sending new user data:", newUserData);
	const response = await fetch('http://localhost:8080/users', options)
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