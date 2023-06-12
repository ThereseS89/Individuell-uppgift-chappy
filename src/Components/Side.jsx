import { NavLink} from "react-router-dom"
import { handleGetData } from "../utils/authchannels"
import { useNavigate } from 'react-router-dom' 
import { useState } from "react"



const Side = () => {
const navigate = useNavigate()
const [errorMessage, setErrorMessage ] = useState([])

	const handleAccessToChannel = async () => {
		const maybeJwt = await handleGetData()
		console.log('handleAcces körs')
		if(maybeJwt) {
			navigate('/random')
		} else {
			setErrorMessage('Du måste vara inloggad för att ha tillgång till denna sida')
		}

	}

	return (
		<nav>
		<ul>
			<li> [Kanaler] </li>
			<li><NavLink to="/koda"> #koda </NavLink></li>
			<li><p onClick={() => handleAccessToChannel()}> #random </p></li>
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