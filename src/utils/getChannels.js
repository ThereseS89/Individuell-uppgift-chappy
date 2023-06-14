export async function getChannels() {
	console.log('getting channels...')
	try {
		const response = await fetch('/channels')
		const channelsData = await response.json()
		
console.log ('Response from API:' , channelsData)
return channelsData
} catch (error){
console.error("error fetching data: ", error )
return []

}
}