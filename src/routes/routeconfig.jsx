import { createBrowserRouter } from "react-router-dom";
import  Root  from "./Root.jsx";
import StartPage from "./startpage.jsx";
import Koda from "./koda.jsx";
import Random from "./random.jsx";
import GruppEtt from "./gruppEtt.jsx";
import GruppTvå from "./gruppTvå.jsx";
import GruppTre from "./gruppTre.jsx";

const router = createBrowserRouter ([
	{
		path: '/',
		element: <Root />,
				children: [
					{
						path: '/',
						element: <StartPage />
					},
					{
						path:'/koda',
						element: <Koda />
					},
					{
						path:'/random',
						element: <Random />
					},
					{
						path:'/gruppEtt',
						element: <GruppEtt />
					},
					{
						path:'/gruppTvå',
						element: <GruppTvå />
					},
					{
						path:'/gruppTre',
						element: <GruppTre />
					}

				]
	}
])

export default router