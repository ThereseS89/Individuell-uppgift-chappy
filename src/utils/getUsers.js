export async function getUsers() {
	console.log('getting users...')
	try {
			const response = await fetch('/users')
			const usersData = await response.json()
			
	console.log ('Response from API:' , usersData )
	return usersData
} catch (error){
	console.error("error fetching data: ", error )
	return []
}

}