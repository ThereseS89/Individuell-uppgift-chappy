import { useState, useEffect } from "react"

const sessionStorageKey = 'chappy-jwt'

const StartPage = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false) // Funderar på om det är bättre att använda recoil här.
	const [message, setMessage] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(()=> {
		if( sessionStorage.getItem(sessionStorageKey)) {
			setIsLoggedIn(true)
		}
	})

	return (
		<>
			<h1>Välkommen till Chappy</h1>
			{!isLoggedIn ? (
			<div className="login-form">
				<h2>Logga in</h2>
				<label>Användarnamn</label>
				<input type="text" placeholder="Användarnamn"
				onChange={e => setUsername(e.target.value)}
				value ={value}/>
				<label>Lösenord</label>
				<input type="text" placeholder="Lösenord" 
				onChange={e => setPassword(e.target.value)}
				value ={value}/>
				<p>Ny användare? Registrera dig här.</p>
				<button type="button" onClick={handleLogin}>Logga in</button>
			</div> ) : null }
		</>
	)
}

export default StartPage