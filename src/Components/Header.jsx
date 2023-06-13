import { NavLink, useNavigate} from "react-router-dom"
import { useRecoilState } from "recoil"
const sessionStorageKey = 'chappy-jwt'
import { loggedInState } from "../atoms/loggedIn.js"
import { setStoreToken } from "../atoms/storeToken.js"


const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState)

	const loggedInUsername = useRecoilState(setStoreToken);
	

	const navigate = useNavigate() 
	const handleLogout = async () => {
		sessionStorage.removeItem(sessionStorageKey)
		sessionStorage.removeItem('chappy-userId')
		setIsLoggedIn(false)
		navigate('/')
	}

	return (

	<header>
		<h1>Chappy</h1>
		{isLoggedIn ? (
		<div className="user-status">
			<span>Inloggad som {loggedInUsername}</span> 
			<NavLink to={'/myPage'}>Mina sidor</NavLink>
			<button onClick={handleLogout}> Logga ut </button>
		</div> ) : null}
	</header>
	)

}

export default Header

