import React from 'react';

import Header from './Header';

import './Layout.css';

const Layout = ({ title, children, ...props }) => (
	<React.Fragment>
		<Header {...props} />
		<div className="layout">
			<main>
				<h2>{title}</h2>
				<div>{children}</div>
			</main>
			<footer>© KeepCoding</footer>
		</div>
	</React.Fragment>
);

export default Layout;
