import { setOpenRegisterState } from "../atoms/openRegister.js";
import { setUserStateData } from "../atoms/setUserState.js";
import { useRecoilState } from "recoil";
import { registerUser } from "../utils/postUser.js";
import { getUsers } from "../utils/getUsers.js";
import { useState } from "react";
//import { useEffect } from "react";


const Register = () => {
	const [openRegister, setOpenRegister] = useRecoilState(setOpenRegisterState);
	const [ users, setUsers ] = useRecoilState(setUserStateData)
	const [ username, setUserName ] = useState('')
	const [ password, setPassword ] = useState('')

	const handleCloseRegister = () => {
		setOpenRegister(false)
	}

	// useEffect(() => {
	// 	async function fetchData() {
	// 		const userData = await getUsers()
	// 		setUsers(userData)
	// 	}
	// 	fetchData()
	// }, [])

	async function checkUserExists(username) {
		const usersData = await getUsers();
		return usersData.some(user => user.username === username);
	}

	const addNewUser = async () => {
		
		if (username && password) {
			try {
				if (await checkUserExists(username)) {
					console.log('användarnamnet är upptaget')
				} else {
					const registerdUser = await registerUser(username, password)
					if (registerdUser) {
						const userData = await getUsers()
						setUsers(userData)
						console.log('Nu är användaren tillagd')
					}
				}
			} catch (error) {
				console.log('något gick fel, försök igen senare')
			}
		} else {
			console.log('Kontrollera att alla fält ät ifyllda')
		}

	}
	const handleUserName = (event) => {
		setUserName(event.target.value)
	};

	const handleUserPassword = (event) => {
		setPassword(event.target.value)
	}

	return (
		<div className="overlay">
			<div className="register-container">
				<h2>Registrera dig</h2>
				<form>
					<label>Välj ditt användarnamn</label>
					<input type="text" 
					value={username}
					onChange={handleUserName}placeholder="FunnyBunny"/>
					<label>Välj ditt lösenord</label>
					<input type="password" placeholder="morot345"
					onChange={handleUserPassword} />
					
					<button type="button" onClick={addNewUser}>Bli medlem</button>
				</form>
				<button onClick={()=> {handleCloseRegister()}}>Bakåt</button>
				
		
			</div>  
		</div> 

	)
}

export default Register