import { createBrowserRouter } from "react-router-dom";
import  Root  from "./Root.jsx";
import StartPage from "./startpage.jsx";

const router = createBrowserRouter ([
	{
		path: '/',
		element: <Root />,
				children: [
					{
						path: '/',
						element: <StartPage />
					}

				]
	}
])

export default router