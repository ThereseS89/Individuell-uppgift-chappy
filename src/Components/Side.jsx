import { NavLink} from "react-router-dom"
import { handleGetData } from "../utils/authchannels"
import { useNavigate } from 'react-router-dom' 
import { useState, useEffect } from "react"
import { getChannels } from "../utils/getChannels.js"



const Side = () => {
const navigate = useNavigate()
const [errorMessage, setErrorMessage ] = useState([])
const [channels, setChannels] = useState([])

	const handleAccessToChannel = async (channelId) => {
		const maybeJwt = await handleGetData(channelId)
		console.log('handleAcces körs')
		if(maybeJwt) {
			navigate('/random')
		} else {
			setErrorMessage('Du måste vara inloggad för att ha tillgång till denna sida')
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
			{channels.map((channel) => (

				<div
				className="channels-container"
				key={channels.id}>
					 <li onClick={() => {handleAccessToChannel(channel.id)}}>{channel.name}</li>
				</div>

			)

			)}
			<li> [Kanaler] </li>
			<li><NavLink to="/koda"> #koda </NavLink></li>
			<li>}> #random </p></li>
			<p>{errorMessage}</p>
			<li className="locked"><NavLink to="/gruppEtt"> #grupp1 🔒 </NavLink></li>
			<li className="selected"><NavLink to="/gruppTvå"> #grupp2 🔑 </NavLink></li>
			<li className="locked"><NavLink to="/gruppTre"> #grupp3 🔒 </NavLink></li>
			<li> <hr/> </li>
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