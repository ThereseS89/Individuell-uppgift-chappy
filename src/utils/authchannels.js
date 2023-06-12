

const sessionStorageKey = 'chappy-jwt'

export const handleGetData = async (channelId) => {
	
	let maybeJwt = sessionStorage.getItem(sessionStorageKey)
	
	let options = {
		headers: {}
	}
	if( maybeJwt ) {
		options.headers.Authorization = "Bearer: " + maybeJwt
	}
	
	let response = await fetch('channels/:id', options)
	let data = await response.json()

	if(response){
		console.log('getdata' , data.message, maybeJwt)
		return maybeJwt
	} else {
		return null
	}
	
}

