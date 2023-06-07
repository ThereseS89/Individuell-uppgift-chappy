

const Side = () => {
	return (
		<nav>
		<ul>
			<li> [Kanaler] </li>
			<li> #koda </li>
			<li><a href="#"> #random </a> <span className="unread">3</span> </li>
			<li className="locked"><a href="#"> #grupp1 🔒 </a></li>
			<li className="selected"><a href="#"> #grupp2 🔑 </a></li>
			<li className="locked"><a href="#"> #grupp3 🔒 </a></li>
			<li> <hr/> </li>
			<li title="Direktmeddelanden"> [DM] </li>
			<li><a href="#">PratgladPelle</a></li>
			<li><a href="#">SocialaSara</a></li>
			<li><a href="#">TrevligaTommy</a></li>
			<li><a href="#">VänligaVera</a></li>
			<li><a href="#">GladaGustav</a></li>
		</ul>
	</nav>
	)
}

export default Side