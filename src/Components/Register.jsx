
const Register = () => {
	return (
		<div className="overlay">
			<div className="register-container">
				<h2>Registrera dig</h2>
				<form>
					<label>Välj ditt användarnamn</label>
					<input type="text" placeholder="användarnamn"/>
					<label>Välj ditt lösenord</label>
					<input type="password" placeholder="lösenord" />
					<label>Fyll i lösenordet igen</label>
					<input type="password" placeholder="lösenord igen" />
					<button>Bli medlem</button>
				</form>
		
			</div>  
		</div> 

	)
}

export default Register