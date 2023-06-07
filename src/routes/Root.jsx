import { Outlet } from 'react-router-dom'
import Header from '../Components/Header.jsx'
import Side from '../Components/Side.jsx'

const Root = () => {
	return (
		<>
			<Header />
			<main>
				<Side />
				<Outlet/>
			</main>
		</>
	)
}

export default Root