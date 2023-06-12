
import { handleGetData } from "../utils/authchannels"
import { useNavigate } from 'react-router-dom' 
import { useState, useEffect } from "react"
import { getChannels } from "../utils/getChannels.js"



const Side = () => {
const navigate = useNavigate()
const [error, setError ] = useState("")
const [channels, setChannels] = useState([])

	const handleAccessToChannel = async (channelId) => {
		const maybeJwt = await handleGetData()
		console.log('handleAcces körs')
		if(maybeJwt) {
			if(channelId === 'channel1'){
				navigate('/koda')
			} else if(channelId === 'channel2'){
				navigate('/random')
			} else if(channelId === 'channel3'){
				navigate('/gruppEtt')
			} else if(channelId === 'channel4'){
				navigate('/gruppTvå')
			} else if(channelId === 'channel5'){
				navigate('/gruppTre')
			}
		} else {
			setError('Du måste vara inloggad för att ha tillgång till denna sida')
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
				key={channels.id}>
					
					<li onClick={() => {handleAccessToChannel(channel.id)}}> {channel.name} </li>
					<span>{error}</span>
				</div> 

			))}

			
			<hr/>
			<li title="Direktmeddelanden"> [DM] </li>
			<li><a href="#">PratgladPelle</a></li>
			<li><a href="#">SocialaSara</a></li>
			<li><a href="#">TrevligaTommy</a></li>
			<li><a href="#">VänligaVera</a></li>
			<li><a href="#">GladaGustav</a></li>
		</ul>
	</nav>
	)
}

export default Side