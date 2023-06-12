



const sessionStorageKey = 'chappy-jwt'

export const handleGetData = async () => {
	
	let maybeJwt = sessionStorage.getItem(sessionStorageKey)
	
	let options = {
		headers: {}
	}
	if( maybeJwt ) {
		options.headers.Authorization = "Bearer: " + maybeJwt
	}
	
	let response = await fetch('/:channelId', options)
	let data = await response.json()

	if(response){
	setMessage( data.message )
		return maybeJwt
	} else {
		return null
	}
	
}

