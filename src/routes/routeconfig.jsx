import { createBrowserRouter } from "react-router-dom";
import  Root  from "./Root.jsx";
import StartPage from "./startpage.jsx";
import Koda from "./koda.jsx";
import Random from "./random.jsx";
import GruppEtt from "./gruppEtt.jsx";
import MyPage from "./myPage.jsx";

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
						path: '/mypage',
						element: <MyPage />
					}

				]
	}
])

export default router