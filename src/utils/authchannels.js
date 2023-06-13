

const sessionStorageKey = 'chappy-jwt'

export const handleGetData = async (channelId) => {
	console.log('handleGetData körs')
	let maybeJwt = sessionStorage.getItem(sessionStorageKey)
	
	let options = {
		headers: {}
	}
	if( maybeJwt ) {
		options.headers.Authorization = "Bearer " + maybeJwt
	}
	
	let response = await fetch(`http://localhost:8080/channels/${channelId}`, options)

	if(!response.ok) {
		console.error('Error:', response.status, response.statusText);
		return null 
	}
	let data = await response.json()

	if(response){
		console.log('getdata' , data.message, maybeJwt)
		return maybeJwt
	} else {
		return null
	}
	
}

