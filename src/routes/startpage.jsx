import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useRecoilState } from "recoil"
import { loggedInState } from "../atoms/loggedIn.js"

const sessionStorageKey = 'chappy-jwt'

const StartPage = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState) // Funderar på om det är bättre att använda recoil här.
	const [message, setMessage] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(()=> {
		if( sessionStorage.getItem(sessionStorageKey)) {
			setIsLoggedIn(true)
		}
	}, [])

	const handleLogin = async () => {
		let body = { username, password }
		let options = {
			method: 'post',
			headers: {
				"content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}

		const response = await fetch('/login', options)

		if( response.status !== 200 ) {
			setMessage('Det gick inte att logga in!')
			console.log('Login failed with status: ', response.status)
			return
		}

		const data = await response.json()
		let jwt = data.token
		sessionStorage.setItem(sessionStorageKey, jwt)

		setIsLoggedIn(true)
		console.log(sessionStorageKey, jwt)
	}

	

	return (
		<>
			<h1>Välkommen till Chappy</h1>
			{!isLoggedIn ? (
			<div className="login-form">
				<h2>Logga in</h2>
				<label>Användarnamn</label>
				<input type="text" placeholder="Användarnamn"
				onChange={e => setUsername(e.target.value)}
				value ={username}/>
				<label>Lösenord</label>
				<input type="text" placeholder="Lösenord" 
				onChange={e => setPassword(e.target.value)}
				value ={password}/>
				<p>Ny användare?</p><button> Registrera dig här!</button>
				<button type="button" onClick={handleLogin}>Logga in</button>
				{/* <dialog data-modal>
			
					<input type="text" placeholder="användarnamn"/>
					<input type="password" placeholder="lösenord" />
					<input type="password" placeholder="lösenord igen" />
					<button>Bli medlem</button>
				</dialog> */}
			</div> ) : null }
		</>
	)
}

export default StartPage