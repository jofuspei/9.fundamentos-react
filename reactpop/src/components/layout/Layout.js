import React from 'react';

import Header from './Header';

const Layout = ({ title, children }) => (
	<div className="layout">
		<Header />
		<main>
			<h2>{title}</h2>
			<div>{children}</div>
		</main>
		<footer>© KeepCoding</footer>
	</div>
);

export default Layout;
