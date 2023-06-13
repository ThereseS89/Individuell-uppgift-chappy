import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
const sessionStorageKey = 'chappy-jwt'
import { loggedInState } from "../atoms/loggedIn.js"

const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState)
	const navigate = useNavigate() 
	const handleLogout = async () => {
		sessionStorage.removeItem(sessionStorageKey)
		setIsLoggedIn(false)
		navigate('/')
	}

	return (

	<header>
		<h1>Chappy</h1>
		{isLoggedIn ? (
		<div className="user-status">
			<span>Inloggad som </span>
			<button onClick={handleLogout}> Logga ut </button>
		</div> ) : null}
	</header>
	)

}

export default Header

