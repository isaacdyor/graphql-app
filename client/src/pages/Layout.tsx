import { Outlet, Link } from "react-router-dom";
import React from 'react'

const Layout: React.FC = () => {
	return (
		<div>
			<h1><Link to='posts'>Navbar</Link></h1>
			<Outlet />
		</div>
	);
}

export default Layout;