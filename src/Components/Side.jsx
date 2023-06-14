import { setErrorState } from "../atoms/setError.js"
import { handleGetData } from "../utils/authchannels.js"
import { useNavigate } from 'react-router-dom' 
import { useState, useEffect } from "react"
import { getChannels } from "../utils/getChannels.js"
import { useRecoilState } from "recoil"



const Side = () => {
const navigate = useNavigate()
const [error, setError ] = useRecoilState(setErrorState)
const [channels, setChannels] = useState([])

	const handleAccessToChannel = async (channelId) => {
		const channel = channels.find((channel) => channel.id === channelId)
		if (channel) {
			if (channel.public) {
				navigate('/koda')
			} else  {
				const maybeJwt = await handleGetData(channelId)
				console.log('handleAcces körs')
				if(maybeJwt) {
					if(channelId === 'channel2'){
						navigate('/random')
						
					} else if(channelId === 'channel3'){
						navigate('/gruppEtt')
						
					}  else {
						setError('Du måste vara inloggad för att ha tillgång till denna sida')
					}
				} else {
					setError('Du måste vara inloggad för att ha tillgång till denna sida')
				} 
			}
		}

	}

	useEffect(() => {

		async function fetchData() {
			const channelsData = await getChannels();
			setChannels(channelsData)
		}
		fetchData()
	}, []);

	return (
	
		<nav>
		<ul>
			<li> [Kanaler] </li>
			{channels.map((channel) => (
				
				<div
				className="channels-container"
				key={channel.id}>
					
					<li className="channel-name"
					onClick={() => 
					{handleAccessToChannel(channel.id)}}> {channel.name} </li>
				</div> 

			))}
			<span>{error}</span>

			
			<hr/>
			<li title="Direktmeddelanden"> [DM] </li>
			
		</ul>
	</nav>
	)
}

export default Side