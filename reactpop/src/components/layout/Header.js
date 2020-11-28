import React from 'react';
import T from 'prop-types';
import { Button } from 'semantic-ui-react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { logout } from '../../api/auth';

const Header = ({ className, onLogout, isLogged }) => (
	<header className={classNames('header', className)}>
		<Link to="/">
			<div className="header--logo">Logo</div>
		</Link>
		<nav className="header--nav">
			<Link to="/advert/new">New advert</Link>
			{isLogged ? (
				<Button onClick={() => logout().then(onLogout)}>Logout</Button>
			) : (
				<Link to="/login">Login</Link>
			)}
		</nav>
	</header>
);

Header.propTypes = {
	className: T.string,
};

export default Header;
