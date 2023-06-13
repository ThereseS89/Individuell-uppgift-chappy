function isValidUser(u) {
	if ((typeof u) !== 'object' || u === null) {
		return false
	}
	let usernameIsValid = (typeof u.username) === 'string'
	usernameIsValid = usernameIsValid && u.username !== ''

	let passwordIsValid = (typeof u.password) === 'string'
	passwordIsValid = passwordIsValid && u.password !== ''

		if(!usernameIsValid || !passwordIsValid ) {
			return false
		}
		return true
}

function isValidId(message) {
	let maybeId = Number(message) 
	if(isNaN(maybeId) ) {
		return false 
	}
	return maybeId >= 0  
} 

export {isValidUser, isValidId}