function isValidUser(u) {
	if ((typeof u) !== 'object' || u === null) {
		return false
	}
	let nameIsValid = (typeof u.name) === 'string'
	nameIsValid = nameIsValid && u.name !== ''

	let passwordIsValid = (typeof u.password) === 'string'
	passwordIsValid = passwordIsValid && u.password !== ''

		if(!nameIsValid || !passwordIsValid ) {
			return false
		}
		return true
}

export {isValidUser}