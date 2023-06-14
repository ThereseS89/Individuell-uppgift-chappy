import deleteMessage from "../utils/deleteMessages"

const Settings = () => {

	const handleDelete = async (messageId) => {
		await deleteMessage(messageId)
	}
	
	return (
		<div>
			<p onClick={handleDelete}>radera meddelande</p>
			<p>ändra meddelande</p>
		</div>
	)
}

export default Settings