import { Outlet } from "react-router-dom";
import React from 'react'

const Layout: React.FC = () => {
	return (
		<div>
			<h1>Navbar</h1>
			<Outlet />
		</div>
	);
}

export default Layout;